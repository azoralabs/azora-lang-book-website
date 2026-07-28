/** Source-aware Azora language definition for Prism and refractor. */

const BUILTIN_TYPES = new Set([
  'Any', 'Bool', 'Byte', 'Cent', 'Char', 'Decimal', 'Float', 'Int', 'Long',
  'Nothing', 'Real', 'ReturnType', 'Short', 'Size', 'String', 'Type', 'UByte',
  'UCent', 'UInt', 'ULong', 'UShort', 'USize', 'Unit',
])

const KEYWORD_PATTERN = /\b(?:alloc|as|assert|await|bind|break|bridge|by|catch|confine|continue|ctor|deco|deepinline|defer|deref|drop|dtor|effect|else|enum|expose|export|fail|false|fin|flip|flop|flow|for|friend|func|guard|if|impl|import|in|infx|inject|inline|is|isolated|launch|let|loop|mem|meta|module|noinline|null|opaque|oper|out|pack|panic|prop|protect|protected|rem|rescue|ret|return|reverse|shield|slot|solo|spec|task|test|threadlocal|throw|trace|true|try|type|typealias|unsafe|use|var|when|while|with|wrap|yield|zone)\b/

function codeOnly(source) {
  const chars = [...source]
  let index = 0
  const mask = (start, end) => {
    for (let offset = start; offset < end; offset += 1) {
      if (chars[offset] !== '\n' && chars[offset] !== '\r') chars[offset] = ' '
    }
  }

  while (index < source.length) {
    if (source.startsWith('//', index)) {
      const start = index
      while (index < source.length && source[index] !== '\n') index += 1
      mask(start, index)
    } else if (source.startsWith('/*', index)) {
      const start = index
      index += 2
      while (index < source.length && !source.startsWith('*/', index)) index += 1
      index = Math.min(source.length, index + 2)
      mask(start, index)
    } else if (source[index] === '"' || source[index] === "'") {
      const start = index
      const quote = source[index++]
      while (index < source.length) {
        if (source[index] === '\\') index += 2
        else if (source[index++] === quote) break
      }
      mask(start, Math.min(index, source.length))
    } else {
      index += 1
    }
  }
  return chars.join('')
}

function escapedNamesPattern(names) {
  if (names.size === 0) return /(?!x)x/
  const alternatives = [...names]
    .sort((left, right) => right.length - left.length)
    .map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  return new RegExp(`\\b(?:${alternatives.join('|')})\\b`)
}

function namesAlternation(names) {
  if (names.size === 0) return '(?!x)x'
  return [...names]
    .sort((left, right) => right.length - left.length)
    .map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')
}

function identifierCount(source, name, start = 0, end = source.length) {
  const pattern = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g')
  return [...source.slice(start, end).matchAll(pattern)].length
}

function genericParameters(source) {
  const names = new Set()
  const headerStart =
    /\b(?:(?:func|task|flow|infx|pack|spec|deco|node|solo)\s*(?:[A-Za-z_]\w*\s*)?|(?:impl|prop)\s*)</g
  for (const match of source.matchAll(headerStart)) {
    const open = match.index + match[0].lastIndexOf('<')
    let index = open + 1
    let depth = 1
    let segmentStart = index
    while (index < source.length && depth > 0) {
      const c = source[index]
      if (c === '<') depth += 1
      else if (c === '>') depth -= 1
      if ((c === ',' && depth === 1) || depth === 0) {
        const parameter = source
          .slice(segmentStart, index)
          .trim()
          .match(/^(?:\.\.\.)?([A-Za-z_]\w*)/)
        if (parameter) names.add(parameter[1])
        segmentStart = index + 1
      }
      index += 1
    }
  }
  return names
}

function bodyRanges(source, headerPattern) {
  const ranges = []
  for (const match of source.matchAll(headerPattern)) {
    const open = match.index + match[0].lastIndexOf('{')
    let depth = 1
    let index = open + 1
    while (index < source.length && depth > 0) {
      if (source[index] === '{') depth += 1
      else if (source[index] === '}') depth -= 1
      index += 1
    }
    ranges.push({ start: open + 1, end: Math.max(open + 1, index - 1) })
  }
  return ranges
}

function isInside(ranges, offset) {
  return ranges.some((range) => offset >= range.start && offset < range.end)
}

function intersection(left, right) {
  return new Set([...left].filter((name) => right.has(name)))
}

function callableDeclarationPattern(names) {
  return new RegExp(
    `(\\b(?:func|task|flow|hook|infx)\\s*(?:<[^>{}\\n]*>\\s*)?(?:[A-Za-z_]\\w*\\.)?)(?:${namesAlternation(names)})\\b`,
  )
}

function propertyDeclarationPattern(names) {
  return new RegExp(
    `(\\bprop\\s*(?:<[^>{}\\n]*>\\s*)?)(?:${namesAlternation(names)})\\b`,
  )
}

function analyze(source) {
  const declarations = codeOnly(source)
  const functions = new Set()
  const parameters = new Set()
  const variables = new Set()
  const properties = new Set()
  const unusedFunctions = new Set()
  const unusedParameters = new Set()
  const unusedVariables = new Set()
  const unusedProperties = new Set()
  const overrideFunctions = new Set()
  const overrideProperties = new Set()
  const specFunctions = new Set()
  const specProperties = new Set()
  const specTypes = new Set()
  const types = new Set(BUILTIN_TYPES)

  const generics = genericParameters(declarations)
  const specBodies = bodyRanges(
    declarations,
    /\bspec\s*(?:<[^>{}\n]*>\s*)?[A-Za-z_]\w*(?:\s*<[^>{}\n]*>)?[^{}\n]*\{/g,
  )
  const overrideBodies = bodyRanges(
    declarations,
    /\bimpl\s*(?:<[^>{}\n]*>\s*)?[^{}\n]*\bfor\b[^{}\n]*\{/g,
  )
  for (const match of declarations.matchAll(
    /\bspec\s*(?:<[^>{}\n]*>\s*)?([A-Za-z_]\w*)(?:\s*<[^>{}\n]*>)?/g,
  )) {
    specTypes.add(match[1])
  }
  const callable = /\b(?:func|task|flow|hook|infx)\s*(?:<[^>{}\n]*>\s*)?(?:[A-Za-z_]\w*\.)?([A-Za-z_]\w*)\s*(?:<[^>{}\n]*>\s*)?\(([^)]*)\)/g
  const callables = [...declarations.matchAll(callable)]
  for (let index = 0; index < callables.length; index += 1) {
    const match = callables[index]
    const scopeEnd = callables[index + 1]?.index ?? declarations.length
    functions.add(match[1])
    if (isInside(overrideBodies, match.index)) overrideFunctions.add(match[1])
    else if (isInside(specBodies, match.index)) specFunctions.add(match[1])
    if (match[1] !== 'main' && identifierCount(declarations, match[1]) === 1) {
      unusedFunctions.add(match[1])
    }
    for (const parameter of match[2].matchAll(/(?:\.\.\.)?([A-Za-z_]\w*)\s*:/g)) {
      parameters.add(parameter[1])
      if (identifierCount(declarations, parameter[1], match.index, scopeEnd) === 1) {
        unusedParameters.add(parameter[1])
      }
    }
    for (const receiver of ['self', 'it']) {
      const scope = declarations.slice(match.index, scopeEnd)
      if (new RegExp(`\\b${receiver}\\s*&?\\s*->`).test(scope)) {
        parameters.add(receiver)
        if (identifierCount(declarations, receiver, match.index, scopeEnd) === 1) {
          unusedParameters.add(receiver)
        }
      }
    }
  }
  for (const match of declarations.matchAll(/\b(?:var|fin|let)\s+([A-Za-z_]\w*)/g)) {
    variables.add(match[1])
    const ownerIndex = callables.findIndex((candidate, index) =>
      match.index >= candidate.index &&
      match.index < (callables[index + 1]?.index ?? declarations.length))
    const scopeStart = ownerIndex >= 0 ? callables[ownerIndex].index : 0
    const scopeEnd = ownerIndex >= 0
      ? (callables[ownerIndex + 1]?.index ?? declarations.length)
      : declarations.length
    if (identifierCount(declarations, match[1], scopeStart, scopeEnd) === 1) {
      unusedVariables.add(match[1])
    }
  }
  for (const match of declarations.matchAll(/\bprop\s*(?:<[^>{}\n]*>\s*)?([A-Za-z_]\w*)/g)) {
    properties.add(match[1])
    if (isInside(overrideBodies, match.index)) overrideProperties.add(match[1])
    else if (isInside(specBodies, match.index)) specProperties.add(match[1])
    if (identifierCount(declarations, match[1]) === 1) unusedProperties.add(match[1])
  }
  for (const match of declarations.matchAll(/\b(?:pack|enum|spec|solo|node|slot)\s*(?:<[^>{}\n]*>\s*)?([A-Za-z_]\w*)/g)) {
    types.add(match[1])
  }
  for (const match of declarations.matchAll(/::\s*([a-z_]\w*)\s*(?=\()/g)) {
    functions.add(match[1])
  }
  for (const match of declarations.matchAll(/::\s*([A-Z]\w*)/g)) {
    types.add(match[1])
  }

  return {
    functions,
    generics,
    overrideFunctions,
    overrideProperties,
    parameters,
    properties,
    specFunctions,
    specProperties,
    specTypes,
    types,
    unusedFunctions,
    unusedParameters,
    unusedProperties,
    unusedVariables,
    variables,
  }
}

function semanticTokens(semantics) {
  const unusedFunctionNames = namesAlternation(semantics.unusedFunctions)
  const unusedParameterNames = namesAlternation(semantics.unusedParameters)
  const unusedVariableNames = namesAlternation(semantics.unusedVariables)
  const unusedPropertyNames = namesAlternation(semantics.unusedProperties)
  const propertyNames = namesAlternation(semantics.properties)
  return {
    unused: [
      {
        pattern: callableDeclarationPattern(
          intersection(semantics.unusedFunctions, semantics.overrideFunctions),
        ),
        lookbehind: true,
        alias: 'unused-override-function',
      },
      {
        pattern: callableDeclarationPattern(
          intersection(semantics.unusedFunctions, semantics.specFunctions),
        ),
        lookbehind: true,
        alias: 'unused-spec-function',
      },
      {
        pattern: propertyDeclarationPattern(
          intersection(semantics.unusedProperties, semantics.overrideProperties),
        ),
        lookbehind: true,
        alias: 'unused-override-property',
      },
      {
        pattern: propertyDeclarationPattern(
          intersection(semantics.unusedProperties, semantics.specProperties),
        ),
        lookbehind: true,
        alias: 'unused-spec-property',
      },
      {
        pattern: new RegExp(`(\\b(?:func|task|flow|hook|infx)\\s*(?:<[^>{}\\n]*>\\s*)?(?:[A-Za-z_]\\w*\\.)?)(?:${unusedFunctionNames})\\b`),
        lookbehind: true,
      },
      {
        pattern: new RegExp(`(\\b(?:var|fin|let)\\s+)(?:${unusedVariableNames})\\b`),
        lookbehind: true,
      },
      {
        pattern: new RegExp(`([,(]\\s*(?:\\.\\.\\.)?)(?:${unusedParameterNames})(?=\\s*:)`),
        lookbehind: true,
        alias: 'unused-parameter',
      },
      {
        pattern: new RegExp(`(\\{\\s*)(?:${unusedParameterNames})(?=\\s*&?\\s*->)`),
        lookbehind: true,
        alias: 'unused-parameter',
      },
      {
        pattern: new RegExp(`(\\bprop\\s*(?:<[^>{}\\n]*>\\s*)?)(?:${unusedPropertyNames})\\b`),
        lookbehind: true,
        alias: 'unused-property',
      },
    ],
    property: {
      pattern: new RegExp(`(\\bprop\\s*(?:<[^>{}\\n]*>\\s*)?)(?:${propertyNames})\\b`),
      lookbehind: true,
    },
    'override-function': {
      pattern: callableDeclarationPattern(semantics.overrideFunctions),
      lookbehind: true,
    },
    'override-property': {
      pattern: propertyDeclarationPattern(semantics.overrideProperties),
      lookbehind: true,
    },
    'spec-function': {
      pattern: callableDeclarationPattern(semantics.specFunctions),
      lookbehind: true,
    },
    'spec-property': {
      pattern: propertyDeclarationPattern(semantics.specProperties),
      lookbehind: true,
    },
    generic: {
      pattern: escapedNamesPattern(semantics.generics),
    },
    'spec-type': {
      pattern: escapedNamesPattern(semantics.specTypes),
    },
    zone: [
      {
        pattern: /\b[a-z_]\w*(?=\s*::)/,
      },
    ],
    parameter: { pattern: escapedNamesPattern(semantics.parameters) },
    'type-name': {
      pattern: escapedNamesPattern(semantics.types),
      alias: 'class-name',
    },
    function: { pattern: escapedNamesPattern(semantics.functions) },
    variable: { pattern: /\b[A-Za-z_]\w*\b/ },
  }
}

export function createAzoraGrammar(source = '') {
  const semantic = semanticTokens(analyze(source))
  const {
    unused,
    property,
    'override-function': overrideFunction,
    'override-property': overrideProperty,
    'spec-function': specFunction,
    'spec-property': specProperty,
    zone,
    ...references
  } = semantic
  return {
    'doc-comment': {
      pattern: /\/\*\*(?!\/)[\s\S]*?\*\//,
      greedy: true,
      inside: {
        'doc-tag': /\B@(?:param|return|since|throws|file)\b/,
        'doc-param-name': {
          pattern: /(@param\s+)\w+/,
          lookbehind: true,
        },
      },
    },
    comment: [
      { pattern: /\/\/.*/, greedy: true },
      { pattern: /\/\*[\s\S]*?\*\//, greedy: true },
    ],
    decorator: {
      pattern: /@\w+(?::[\w.]+)?(?:\([^)]*\))?/,
      alias: 'annotation',
    },
    macro: { pattern: /\b[a-z_]\w*@/ },
    preprocessor: { pattern: /\$\w+/ },
    string: {
      pattern: /"(?:[^"\\]|\\[\s\S])*"/,
      greedy: true,
      inside: {
        interpolation: {
          pattern: /\$\{[^}]*\}|\$[A-Za-z_]\w*/,
          inside: {
            'interpolation-punctuation': {
              pattern: /^\$\{?|\}$/,
              alias: 'punctuation',
            },
            keyword: KEYWORD_PATTERN,
            ...semantic,
            operator: /\.\.<?|\.\.\.?|->|::|[+\-*/%]=?|&&|\|\||[<>!=]=?|!|\?\?|\?\.|[&|^~]|<<=?|>>=?/,
            punctuation: /[{}[\]();:.,<>?]/,
          },
        },
      },
    },
    number: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?\d+)?[fFLlduUsSbB]?\b/,
    boolean: /\b(?:true|false)\b/,
    'null-literal': {
      pattern: /\bnull\b/,
      alias: 'boolean',
    },
    'contextual-keyword': {
      pattern: /(\b(?:(?:func|task|flow|infx)\s*(?:<[^>{}\n]*>\s*)?(?:[A-Za-z_]\w*\.)?[A-Za-z_]\w*\s*\([^)]*\)[^{};]*|(?:pack|node|solo|spec|deco|impl|prop|typealias)\b[^{};]*?))\bwhere\b/,
      lookbehind: true,
      alias: 'keyword',
    },
    unused,
    'override-function': overrideFunction,
    'override-property': overrideProperty,
    'spec-function': specFunction,
    'spec-property': specProperty,
    property,
    'zone-declaration': {
      pattern: /(\b(?:friend\s+)?zone\s+)[A-Za-z_]\w*(?:::[A-Za-z_]\w*)*/,
      lookbehind: true,
    },
    zone,
    'module-path': {
      pattern: /(^\s*(?:export\s+)?import\s+)[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*(?:\.\*)?/m,
      lookbehind: true,
    },
    keyword: KEYWORD_PATTERN,
    ...references,
    operator: /\.\.<?|\.\.\.?|->|::|[+\-*/%]=?|&&|\|\||[<>!=]=?|!|\?\?|\?\.|\?=|\?[+\-*/%]=|\?\+\+|\?--|[&|^~]|<<=?|>>=?/,
    punctuation: /[{}[\]();:.,<>?]/,
  }
}

export function createAzoraLanguage(source = '', name = 'azora') {
  function azoraLanguage(Prism) {
    Prism.languages[name] = createAzoraGrammar(source)
  }
  azoraLanguage.displayName = name
  azoraLanguage.aliases = []
  return azoraLanguage
}

export default createAzoraLanguage()
