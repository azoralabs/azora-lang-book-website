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

function analyze(source) {
  const declarations = codeOnly(source)
  const functions = new Set()
  const parameters = new Set()
  const variables = new Set()
  const types = new Set(BUILTIN_TYPES)

  const callable = /\b(?:func|task|flow|hook|infx)\s*(?:<[^>{}\n]*>\s*)?(?:[A-Za-z_]\w*\.)?([A-Za-z_]\w*)\s*\(([^)]*)\)/g
  for (const match of declarations.matchAll(callable)) {
    functions.add(match[1])
    for (const parameter of match[2].matchAll(/(?:\.\.\.)?([A-Za-z_]\w*)\s*:/g)) {
      parameters.add(parameter[1])
    }
  }
  for (const match of declarations.matchAll(/\b(?:var|fin|let)\s+([A-Za-z_]\w*)/g)) {
    variables.add(match[1])
  }
  for (const receiver of ['self', 'it']) {
    if (new RegExp(`\\b${receiver}\\b`).test(declarations)) parameters.add(receiver)
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

  return { functions, parameters, types, variables }
}

function semanticTokens(semantics) {
  return {
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
    keyword: KEYWORD_PATTERN,
    ...semantic,
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
