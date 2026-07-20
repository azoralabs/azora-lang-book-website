import { useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'

// ── Custom Azora language definition ────────────────────────────
function azora(Prism) {
  Prism.languages.azora = {
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
    preprocessor: {
      pattern: /\$\w+/,
      alias: 'variable',
    },
    string: {
      pattern: /"(?:[^"\\]|\\[\s\S])*"/,
      greedy: true,
      inside: {
        interpolation: {
          pattern: /\$\{[^}]*\}|\$[a-zA-Z_]\w*/,
          inside: {
            'interpolation-punctuation': {
              pattern: /^\$\{?|\}$/,
              alias: 'punctuation',
            },
          },
        },
      },
    },
    number: /\b\d[\d_]*(?:\.[\d_]+)?\b/,
    'type-keyword': {
      pattern: /\b(?:Int|UInt|Long|ULong|Byte|UByte|Short|UShort|Cent|UCent|Float|Real|Decimal|Bool|Char|String|Unit)\b/,
      alias: 'class-name',
    },
    'builtin-fn': {
      pattern: /\b(?:println|print)\b/,
      alias: 'builtin',
    },
    boolean: /\b(?:true|false)\b/,
    'null-literal': {
      pattern: /\bnull\b/,
      alias: 'boolean',
    },
    keyword: /\b(?:var|fin|let|func|return|module|export|import|use|if|else|inline|deepinline|noinline|zone|friend|test|assert|trace|mixin|panic|for|while|loop|in|by|reverse|break|continue|when|guard|defer|rescue|as|is|it|null|pack|enum|slot|impl|spec|typealias|node|leaf|repl|virt|base|fail|flow|yield|task|await|launch|async|cancel|alloc|drop|deref|unsafe|isolated|bridge|solo|inject|wrap|mem|rem|ret|effect|view|hook|prop|ctor|dtor|flip|flop|deco|bind|oper|infx|expose|intern|confine|protect|shield|ref|out|mut|shared|weak|threadlocal|throw|try|catch)\b/,
    'type-name': {
      pattern: /\b[A-Z][a-zA-Z0-9_]*\b/,
      alias: 'class-name',
    },
    function: {
      pattern: /\b[a-z_]\w*(?=\s*[(<])/,
    },
    operator: /\.\.\.?|->|::|[+\-*/%]=?|&&|\|\||[<>!=]=?|!|\?\?|\?=|\?[+\-*/%]=|\?\+\+|\?--/,
    punctuation: /[{}[\]();:.,<>?]/,
  }
}
azora.displayName = 'azora'
azora.aliases = []

// ── Python language definition ──────────────────────────────────
function python(Prism) {
  Prism.languages.python = {
    comment: { pattern: /#.*/, greedy: true },
    'triple-string': {
      pattern: /"""[\s\S]*?"""|'''[\s\S]*?'''/,
      greedy: true,
      alias: 'string',
    },
    string: {
      pattern: /f?"(?:[^"\\]|\\[\s\S])*"|f?'(?:[^'\\]|\\[\s\S])*'/,
      greedy: true,
    },
    decorator: {
      pattern: /@\w+/,
      alias: 'annotation',
    },
    keyword: /\b(?:False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/,
    builtin: /\b(?:print|len|range|int|str|float|bool|list|dict|set|tuple|type|isinstance|enumerate|zip|map|filter|sorted|reversed|super|property|staticmethod|classmethod|__init__|__name__|__main__)\b/,
    boolean: /\b(?:True|False|None)\b/,
    'class-name': {
      pattern: /\b[A-Z]\w*\b/,
    },
    function: {
      pattern: /\b[a-z_]\w*(?=\s*\()/,
    },
    number: /\b\d[\d_]*(?:\.[\d_]+)?\b/,
    operator: /[-+*/%]=?|==|!=|<=?|>=?|&&|\|\||[~^&|]|<<=?|>>=?|\*\*=?|\/\/=?/,
    punctuation: /[{}[\]();:.,]/,
  }
}
python.displayName = 'python'
python.aliases = []

// ── JavaScript language definition ──────────────────────────────
function javascript(Prism) {
  Prism.languages.javascript = {
    comment: [
      { pattern: /\/\/.*/, greedy: true },
      { pattern: /\/\*[\s\S]*?\*\//, greedy: true },
    ],
    string: {
      pattern: /"(?:[^"\\]|\\[\s\S])*"|'(?:[^'\\]|\\[\s\S])*'|`(?:[^`\\]|\\[\s\S])*`/,
      greedy: true,
    },
    keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|finally|for|from|function|get|if|import|in|instanceof|let|new|of|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
    boolean: /\b(?:true|false|null|undefined|NaN|Infinity)\b/,
    'class-name': {
      pattern: /\b[A-Z]\w*\b/,
    },
    function: {
      pattern: /\b[a-z_$]\w*(?=\s*\()/,
    },
    number: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?\d+)?\b/,
    operator: /[-+*/%]=?|===?|!==?|<=?|>=?|&&|\|\||\?\?|=>|\.\.\./,
    punctuation: /[{}[\]();:.,<>]/,
  }
}
javascript.displayName = 'javascript'
javascript.aliases = ['js']

// ── Kotlin language definition ──────────────────────────────────
function kotlin(Prism) {
  Prism.languages.kotlin = {
    comment: [
      { pattern: /\/\/.*/, greedy: true },
      { pattern: /\/\*[\s\S]*?\*\//, greedy: true },
    ],
    string: {
      pattern: /"""[\s\S]*?"""|"(?:[^"\\]|\\[\s\S])*"/,
      greedy: true,
    },
    annotation: {
      pattern: /@\w+/,
    },
    keyword: /\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|it|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|try|typealias|val|var|vararg|when|where|while)\b/,
    boolean: /\b(?:true|false|null)\b/,
    'class-name': {
      pattern: /\b[A-Z]\w*\b/,
    },
    function: {
      pattern: /\b[a-z_]\w*(?=\s*[(<])/,
    },
    number: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?\d+)?[fFLl]?\b/,
    operator: /[-+*/%]=?|===?|!==?|<=?|>=?|&&|\|\||\?[.:!]?|->|\.\./,
    punctuation: /[{}[\]();:.,<>]/,
  }
}
kotlin.displayName = 'kotlin'
kotlin.aliases = ['kt']

// ── C# language definition ──────────────────────────────────────
function csharp(Prism) {
  Prism.languages.csharp = {
    comment: [
      { pattern: /\/\/.*/, greedy: true },
      { pattern: /\/\*[\s\S]*?\*\//, greedy: true },
    ],
    string: {
      pattern: /\$?"(?:[^"\\]|\\[\s\S])*"|@"[^"]*(?:""[^"]*)*"/,
      greedy: true,
    },
    keyword: /\b(?:abstract|as|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|is|lock|long|namespace|new|null|object|operator|out|override|params|private|protected|public|readonly|record|ref|return|sbyte|sealed|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|var|virtual|void|volatile|while|yield)\b/,
    boolean: /\b(?:true|false|null)\b/,
    'class-name': {
      pattern: /\b[A-Z]\w*\b/,
    },
    function: {
      pattern: /\b[a-z_]\w*(?=\s*[(<])/,
    },
    number: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?\d+)?[fFdDmMlLuU]*\b/,
    operator: /[-+*/%]=?|===?|!==?|<=?|>=?|&&|\|\||\?\??|=>|\.\./,
    punctuation: /[{}[\]();:.,<>]/,
  }
}
csharp.displayName = 'csharp'
csharp.aliases = ['cs']

// ── Swift language definition ───────────────────────────────────
function swift(Prism) {
  Prism.languages.swift = {
    comment: [
      { pattern: /\/\/.*/, greedy: true },
      { pattern: /\/\*[\s\S]*?\*\//, greedy: true },
    ],
    string: {
      pattern: /"""[\s\S]*?"""|"(?:[^"\\]|\\[\s\S])*"/,
      greedy: true,
    },
    keyword: /\b(?:Any|Protocol|Self|Type|actor|as|associatedtype|async|await|break|case|catch|class|continue|convenience|default|defer|deinit|do|dynamic|else|enum|extension|fallthrough|false|fileprivate|final|for|func|get|guard|if|import|in|indirect|infix|init|inout|internal|is|lazy|let|mutating|nil|nonisolated|nonmutating|open|operator|optional|override|postfix|precedencegroup|prefix|private|protocol|public|repeat|required|rethrows|return|self|set|some|static|struct|subscript|super|switch|throw|throws|true|try|typealias|unowned|var|weak|where|while|willSet|didSet)\b/,
    boolean: /\b(?:true|false|nil)\b/,
    'class-name': {
      pattern: /\b[A-Z]\w*\b/,
    },
    function: {
      pattern: /\b[a-z_]\w*(?=\s*[(<])/,
    },
    number: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?\d+)?\b/,
    operator: /[-+*/%]=?|===?|!==?|<=?|>=?|&&|\|\||\?\??|->|\.\.\.|\.\.<?/,
    punctuation: /[{}[\]();:.,<>]/,
  }
}
swift.displayName = 'swift'
swift.aliases = []

// ── LLVM IR language definition ─────────────────────────────────
function llvm(Prism) {
  Prism.languages.llvm = {
    comment: { pattern: /;.*/, greedy: true },
    string: {
      pattern: /"(?:[^"\\]|\\[\s\S])*"/,
      greedy: true,
    },
    keyword: /\b(?:define|declare|global|constant|internal|external|private|linkonce|linkonce_odr|weak|weak_odr|appending|common|extern_weak|available_externally|thread_local|unnamed_addr|local_unnamed_addr|dso_local|to|nounwind|readonly|readnone|signext|zeroext|inreg|sret|noalias|nocapture|nest|byval|align|addrspace|section|alias|module|asm|target|datalayout|triple|attributes|ret|br|switch|indirectbr|invoke|resume|unreachable|add|fadd|sub|fsub|mul|fmul|udiv|sdiv|fdiv|urem|srem|frem|shl|lshr|ashr|and|or|xor|alloca|load|store|getelementptr|trunc|zext|sext|fptrunc|fpext|fptoui|fptosi|uitofp|sitofp|ptrtoint|inttoptr|bitcast|icmp|fcmp|phi|select|call|va_arg|landingpad|extractelement|insertelement|shufflevector|extractvalue|insertvalue|fence|cmpxchg|atomicrmw|eq|ne|ugt|uge|ult|ule|sgt|sge|slt|sle|oeq|ogt|oge|olt|ole|one|ord|ueq|une|uno|label|entry)\b/,
    type: {
      pattern: /\b(?:void|i1|i8|i16|i32|i64|i128|half|bfloat|float|double|fp128|x86_fp80|ppc_fp128|x86_mmx|ptr|label|token|metadata|opaque)\b/,
      alias: 'class-name',
    },
    variable: {
      pattern: /[%@][\w$.]+/,
    },
    number: /\b-?\d[\d]*(?:\.\d+)?(?:[eE][+-]?\d+)?\b|0x[0-9a-fA-F]+/,
    operator: /=/,
    punctuation: /[{}[\](),*!]/,
  }
}
llvm.displayName = 'llvm'
llvm.aliases = ['ll']

// ── Dart language definition ────────────────────────────────────
function dart(Prism) {
  Prism.languages.dartlang = {
    comment: [
      { pattern: /\/\/.*/, greedy: true },
      { pattern: /\/\*[\s\S]*?\*\//, greedy: true },
    ],
    string: {
      pattern: /r?"""[\s\S]*?"""|r?'''[\s\S]*?'''|r?"(?:[^"\\]|\\[\s\S])*"|r?'(?:[^'\\]|\\[\s\S])*'/,
      greedy: true,
    },
    annotation: {
      pattern: /@\w+/,
    },
    keyword: /\b(?:abstract|as|assert|async|await|base|bool|break|case|catch|class|const|continue|covariant|default|deferred|do|double|dynamic|else|enum|export|extends|extension|external|factory|false|final|finally|for|Function|get|hide|if|implements|import|in|int|interface|is|late|library|mixin|new|null|on|operator|part|required|rethrow|return|sealed|set|show|static|super|switch|sync|this|throw|true|try|typedef|var|void|when|while|with|yield)\b/,
    builtin: /\b(?:String|num|List|Map|Set|Future|Stream|Iterable|Object|Never|print|stdout)\b/,
    boolean: /\b(?:true|false|null)\b/,
    'class-name': {
      pattern: /\b[A-Z]\w*\b/,
    },
    function: {
      pattern: /\b[a-z_]\w*(?=\s*[(<])/,
    },
    number: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?\d+)?\b/,
    operator: /[-+*/%]=?|===?|!==?|<=?|>=?|&&|\|\||\?\?|=>|\.\.\.?|\?\.|\?!/,
    punctuation: /[{}[\]();:.,<>@]/,
  }
}
dart.displayName = 'dartlang'
dart.aliases = []

// ── Rust language definition ───────────────────────────────────
function rust(Prism) {
  Prism.languages.rust = {
    comment: [
      { pattern: /\/\/.*/, greedy: true },
      { pattern: /\/\*[\s\S]*?\*\//, greedy: true },
    ],
    string: {
      pattern: /r#*"[\s\S]*?"#*|"(?:[^"\\]|\\[\s\S])*"/,
      greedy: true,
    },
    attribute: {
      pattern: /#!?\[[\s\S]*?\]/,
      greedy: true,
      alias: 'annotation',
    },
    keyword: /\b(?:as|async|await|break|const|continue|crate|dyn|else|enum|extern|false|fn|for|if|impl|in|let|loop|match|mod|move|mut|pub|ref|return|self|Self|static|struct|super|trait|true|type|unsafe|use|where|while|yield)\b/,
    builtin: /\b(?:bool|char|f32|f64|i8|i16|i32|i64|i128|isize|str|u8|u16|u32|u64|u128|usize|String|Vec|HashMap|HashSet|Box|Option|Result|Some|None|Ok|Err|println|format|vec|panic|assert|assert_eq|assert_ne|todo|unimplemented|unreachable)\b/,
    'macro': {
      pattern: /\b\w+!/,
      alias: 'function',
    },
    boolean: /\b(?:true|false)\b/,
    'class-name': {
      pattern: /\b[A-Z]\w*\b/,
    },
    function: {
      pattern: /\b[a-z_]\w*(?=\s*[(<])/,
    },
    number: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?\d+)?(?:_?(?:f32|f64|i8|i16|i32|i64|i128|isize|u8|u16|u32|u64|u128|usize))?\b/,
    operator: /[-+*/%]=?|===?|!==?|<=?|>=?|&&|\|\||\?|=>|->|\.\.=?|&|::/,
    punctuation: /[{}[\]();:.,<>|#]/,
  }
}
rust.displayName = 'rust'
rust.aliases = ['rs']

// ── WebAssembly Text (WAT) language definition ─────────────────
function wasm(Prism) {
  Prism.languages.wasm = {
    comment: [
      { pattern: /;;.*/, greedy: true },
      { pattern: /\(;[\s\S]*?;\)/, greedy: true },
    ],
    string: {
      pattern: /"(?:[^"\\]|\\[\s\S])*"/,
      greedy: true,
    },
    keyword: /\b(?:module|func|param|result|local|global|memory|data|table|elem|type|import|export|start|call|call_indirect|block|loop|if|then|else|end|br|br_if|br_table|return|drop|select|nop|unreachable|memory\.size|memory\.grow|mut|offset|align)\b/,
    builtin: /\b(?:i32|i64|f32|f64|v128|funcref|externref)(?:\.[a-z_]+)?\b/,
    variable: {
      pattern: /\$[\w.]+/,
    },
    number: /\b-?(?:0x[0-9a-fA-F]+|\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/,
    operator: /=/,
    punctuation: /[()]/,
  }
}
wasm.displayName = 'wasm'
wasm.aliases = ['wat']

// ── Bash language definition ───────────────────────────────────
function bash(Prism) {
  Prism.languages.bash = {
    comment: { pattern: /#.*/, greedy: true },
    string: {
      pattern: /"(?:[^"\\]|\\[\s\S])*"|'[^']*'/,
      greedy: true,
    },
    keyword: /\b(?:if|then|else|elif|fi|for|while|do|done|case|esac|in|function|select|until|return|exit)\b/,
    function: {
      pattern: /\b[a-z_]\w*(?=\s)/,
    },
    variable: /\$[\w?!#@*]+|\$\{[^}]+\}/,
    operator: /&&|\|\||[|<>]=?|>>|<<|;/,
    punctuation: /[{}[\]()]/,
  }
}
bash.displayName = 'bash'
bash.aliases = ['sh']

// ── Register all languages ──────────────────────────────────────
SyntaxHighlighter.registerLanguage('azora', azora)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('js', javascript)
SyntaxHighlighter.registerLanguage('typescript', javascript)
SyntaxHighlighter.registerLanguage('ts', javascript)
SyntaxHighlighter.registerLanguage('kotlin', kotlin)
SyntaxHighlighter.registerLanguage('kt', kotlin)
SyntaxHighlighter.registerLanguage('csharp', csharp)
SyntaxHighlighter.registerLanguage('cs', csharp)
SyntaxHighlighter.registerLanguage('swift', swift)
SyntaxHighlighter.registerLanguage('llvm', llvm)
SyntaxHighlighter.registerLanguage('ll', llvm)
SyntaxHighlighter.registerLanguage('dart', dart)
SyntaxHighlighter.registerLanguage('dartlang', dart)
SyntaxHighlighter.registerLanguage('rust', rust)
SyntaxHighlighter.registerLanguage('rs', rust)
SyntaxHighlighter.registerLanguage('wasm', wasm)
SyntaxHighlighter.registerLanguage('wat', wasm)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('sh', bash)

// ── Shared dark theme (Azora palette) ───────────────────────────
const baseTheme = {
  'code[class*="language-"]': {
    color: '#D9D9D9',
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
    fontSize: '0.875rem',
    lineHeight: '1.6',
  },
  'pre[class*="language-"]': {
    color: '#D9D9D9',
    background: '#141414',
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
    fontSize: '0.875rem',
    lineHeight: '1.6',
    padding: '1.25rem',
    margin: '0',
    overflow: 'auto',
    borderRadius: '0.5rem',
  },
  comment: { color: '#676767', fontStyle: 'italic' },
  string: { color: '#7DBF8A' },
  number: { color: '#ECECEC' },
  operator: { color: '#B2B3B3' },
  punctuation: { color: '#B2B3B3' },
}

// ── Per-language themes ─────────────────────────────────────────

const azoraTheme = {
  ...baseTheme,
  keyword: { color: '#D16B8E', fontWeight: 'bold' },
  boolean: { color: '#D16B8E', fontWeight: 'bold' },
  'class-name': { color: '#5FA89F' },
  builtin: { color: '#D4A574' },
  function: { color: '#D4A574' },
  'doc-comment': { color: '#6B9F77', fontStyle: 'italic' },
  'doc-tag': { color: '#5BA3D0', fontWeight: 'bold' },
  'doc-param-name': { color: '#D9D9D9' },
  annotation: { color: '#E6C96B' },
  variable: { color: '#B06FA8', fontStyle: 'italic' },
  interpolation: { color: '#E6C96B' },
  'interpolation-punctuation': { color: '#E6C96B' },
}

const pythonTheme = {
  ...baseTheme,
  keyword: { color: '#CF8E6D', fontWeight: 'bold' },
  boolean: { color: '#CF8E6D', fontWeight: 'bold' },
  builtin: { color: '#C77DBB' },
  function: { color: '#56A8F5' },
  'class-name': { color: '#5FA89F' },
  annotation: { color: '#BBB529' },
  'triple-string': { color: '#6B9F77', fontStyle: 'italic' },
}

const javascriptTheme = {
  ...baseTheme,
  keyword: { color: '#C77DBB', fontWeight: 'bold' },
  boolean: { color: '#CF8E6D', fontWeight: 'bold' },
  function: { color: '#56A8F5' },
  'class-name': { color: '#5FA89F' },
  number: { color: '#2AACB8' },
}

const kotlinTheme = {
  ...baseTheme,
  keyword: { color: '#CF8E6D', fontWeight: 'bold' },
  boolean: { color: '#CF8E6D', fontWeight: 'bold' },
  function: { color: '#56A8F5' },
  'class-name': { color: '#5FA89F' },
  annotation: { color: '#BBB529' },
}

const csharpTheme = {
  ...baseTheme,
  keyword: { color: '#569CD6', fontWeight: 'bold' },
  boolean: { color: '#569CD6', fontWeight: 'bold' },
  function: { color: '#DCDCAA' },
  'class-name': { color: '#4EC9B0' },
  number: { color: '#B5CEA8' },
}

const swiftTheme = {
  ...baseTheme,
  keyword: { color: '#FC5FA3', fontWeight: 'bold' },
  boolean: { color: '#FC5FA3', fontWeight: 'bold' },
  function: { color: '#67B7A4' },
  'class-name': { color: '#5DD8B7' },
  number: { color: '#D0BF69' },
}

const llvmTheme = {
  ...baseTheme,
  keyword: { color: '#569CD6', fontWeight: 'bold' },
  'class-name': { color: '#4EC9B0' },
  variable: { color: '#9CDCFE' },
  type: { color: '#4EC9B0' },
  number: { color: '#B5CEA8' },
}

const dartTheme = {
  ...baseTheme,
  keyword: { color: '#569CD6', fontWeight: 'bold' },
  boolean: { color: '#569CD6', fontWeight: 'bold' },
  builtin: { color: '#4EC9B0' },
  function: { color: '#DCDCAA' },
  'class-name': { color: '#4EC9B0' },
  annotation: { color: '#BBB529' },
  number: { color: '#B5CEA8' },
}

const rustTheme = {
  ...baseTheme,
  keyword: { color: '#CF8E6D', fontWeight: 'bold' },
  boolean: { color: '#CF8E6D', fontWeight: 'bold' },
  builtin: { color: '#4EC9B0' },
  function: { color: '#56A8F5' },
  'class-name': { color: '#5FA89F' },
  annotation: { color: '#E6C96B' },
  attribute: { color: '#E6C96B' },
  'macro': { color: '#56A8F5' },
  number: { color: '#2AACB8' },
}

const wasmTheme = {
  ...baseTheme,
  keyword: { color: '#569CD6', fontWeight: 'bold' },
  builtin: { color: '#4EC9B0' },
  variable: { color: '#9CDCFE' },
  number: { color: '#B5CEA8' },
}

const bashTheme = {
  ...baseTheme,
  keyword: { color: '#CF8E6D', fontWeight: 'bold' },
  function: { color: '#56A8F5' },
  variable: { color: '#9CDCFE' },
}

const themes = {
  azora: azoraTheme,
  python: pythonTheme,
  javascript: javascriptTheme,
  js: javascriptTheme,
  typescript: javascriptTheme,
  ts: javascriptTheme,
  kotlin: kotlinTheme,
  kt: kotlinTheme,
  csharp: csharpTheme,
  cs: csharpTheme,
  swift: swiftTheme,
  llvm: llvmTheme,
  ll: llvmTheme,
  dart: dartTheme,
  dartlang: dartTheme,
  rust: rustTheme,
  rs: rustTheme,
  wasm: wasmTheme,
  wat: wasmTheme,
  bash: bashTheme,
  sh: bashTheme,
}

// ── Language display labels ─────────────────────────────────────
const langLabels = {
  python: 'Python',
  javascript: 'JavaScript',
  js: 'JavaScript',
  typescript: 'TypeScript',
  ts: 'TypeScript',
  kotlin: 'Kotlin',
  kt: 'Kotlin',
  csharp: 'C#',
  cs: 'C#',
  swift: 'Swift',
  llvm: 'LLVM IR',
  ll: 'LLVM IR',
  dart: 'Dart',
  dartlang: 'Dart',
  rust: 'Rust',
  rs: 'Rust',
  wasm: 'WebAssembly',
  wat: 'WebAssembly',
  bash: 'Bash',
  sh: 'Bash',
}

export default function CodeBlock({ children, title, language }) {
  const [copied, setCopied] = useState(false)
  const lang = language || 'azora'
  const selectedTheme = themes[lang] || azoraTheme
  const langLabel = langLabels[lang]

  const copy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-block-wrapper relative my-4 rounded-lg border border-az-75 overflow-hidden">
      {(title || langLabel) && (
        <div className="px-4 py-1.5 text-xs font-medium bg-az-85 text-az-50 border-b border-az-75 flex justify-between">
          <span>{title || ''}</span>
          {langLabel && <span className="text-az-60">{langLabel}</span>}
        </div>
      )}
      <div className="relative">
        <button
          onClick={copy}
          className="copy-btn absolute top-2 right-2 opacity-0 transition-opacity px-2 py-1 rounded text-xs bg-az-75 text-az-40 hover:bg-az-65 cursor-pointer"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <SyntaxHighlighter
          language={lang}
          style={selectedTheme}
          wrapLongLines
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
