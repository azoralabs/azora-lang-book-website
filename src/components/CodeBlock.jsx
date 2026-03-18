import { useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'

// Custom Azora language definition for Prism/refractor
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
      pattern: /\b(?:Int|Real|Bool|String|Unit|Type|ReturnType)\b/,
      alias: 'class-name',
    },
    'builtin-fn': {
      pattern: /\b(?:print|println|delay|hasDeco|getDeco|platform|toString|toInt|toReal|promote!)\b/,
      alias: 'builtin',
    },
    boolean: /\b(?:true|false)\b/,
    'null-literal': {
      pattern: /\bnull\b/,
      alias: 'boolean',
    },
    keyword: /\b(?:var|fin|func|hook|test|if|else|for|loop|while|in|as|is|when|return|break|continue|expose|confine|inline|enum|slot|pack|impl|infx|deco|scope|package|use|flip|flop|by|typealias|spec|where|each|type|let|task|suspend|flow|yield|launch|async|await|assert|trace|with|self|prop|it|fail|try|catch|defer|alloc|drop)\b/,
    'type-name': {
      pattern: /\b[A-Z][a-zA-Z0-9_]*\b/,
      alias: 'class-name',
    },
    function: {
      pattern: /\b[a-z_]\w*(?=\s*[\(<])/,
    },
    operator: /\.\.\.?|->|::|[+\-*/%]=?|&&|\|\||[<>!=]=?|!|\?\?|\?=|\?[+\-*/%]=|\?\+\+|\?--/,
    punctuation: /[{}[\]();:.,<>?]/,
  }
}
azora.displayName = 'azora'
azora.aliases = []

SyntaxHighlighter.registerLanguage('azora', azora)

const theme = {
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
  keyword: { color: '#D16B8E', fontWeight: 'bold' },
  boolean: { color: '#D16B8E', fontWeight: 'bold' },
  'class-name': { color: '#5FA89F' },
  builtin: { color: '#D4A574' },
  function: { color: '#D4A574' },
  string: { color: '#7DBF8A' },
  number: { color: '#ECECEC' },
  'doc-comment': { color: '#6B9F77', fontStyle: 'italic' },
  'doc-tag': { color: '#5BA3D0', fontWeight: 'bold' },
  'doc-param-name': { color: '#D9D9D9' },
  comment: { color: '#676767', fontStyle: 'italic' },
  annotation: { color: '#E6C96B' },
  variable: { color: '#B06FA8', fontStyle: 'italic' },
  interpolation: { color: '#E6C96B' },
  'interpolation-punctuation': { color: '#E6C96B' },
  operator: { color: '#B2B3B3' },
  punctuation: { color: '#B2B3B3' },
}

export default function CodeBlock({ children, title }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-block-wrapper relative my-4 rounded-lg border border-az-75 overflow-hidden">
      {title && (
        <div className="px-4 py-1.5 text-xs font-medium bg-az-85 text-az-50 border-b border-az-75">
          {title}
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
          language="azora"
          style={theme}
          wrapLongLines
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
