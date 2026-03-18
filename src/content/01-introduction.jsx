import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Introduction() {
  return (
    <Section id="introduction" title="Introduction">
      <p>
        <strong>Azora</strong> is a statically typed, compiled programming language built for
        writing interactive software. It compiles to Kotlin, JavaScript, C#, and LLVM IR.
      </p>

      <p className="mt-4 text-az-35">
        Azora exists because I wanted a language that does three things well: catches errors
        before the program runs, generates fast code without runtime abstraction costs, and
        stays out of the way when writing interactive logic. Most languages optimize for one
        of these at the expense of the others. Azora tries to get all three right through
        compile-time metaprogramming, monomorphized generics, and a syntax designed for
        readability.
      </p>

      <CodeBlock title="hello.az">{`func main() {
    println("Hello, Azora!")
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Language Features</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>15 numeric types with literal suffixes and overflow semantics</li>
        <li>Null safety with <code className="text-az-primary">?</code> types and null-aware operators</li>
        <li>Monomorphized generics, including variadic generics and type functions</li>
        <li>Coroutines with <code className="text-az-primary">task</code>, <code className="text-az-primary">async</code>/<code className="text-az-primary">await</code>, and <code className="text-az-primary">launch</code></li>
        <li>Lazy generators with <code className="text-az-primary">flow</code> and <code className="text-az-primary">yield</code></li>
        <li>Compile-time code execution (CTCE) and inline metaprogramming</li>
        <li>D-style contracts with <code className="text-az-primary">in</code>/<code className="text-az-primary">out</code> blocks</li>
        <li>Reactivity system with <code className="text-az-primary">solo</code>, <code className="text-az-primary">wrap</code>, <code className="text-az-primary">view</code>, and <code className="text-az-primary">effect</code></li>
        <li>Operator overloading, infix functions, and custom DSLs</li>
        <li>Collection literals for arrays, sets, and maps</li>
        <li>Built-in test framework, tracing, and decorators</li>
        <li>Cross-platform: compiles to Kotlin/JVM, JavaScript, C#, and LLVM IR</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Compilation</h3>
      <p className="mt-2 text-az-35">
        Azora files use the <code className="text-az-primary">.az</code> extension. The compiler
        preprocesses generics via monomorphization, evaluates compile-time code, expands inline
        decorators, then emits code for the target backend. Programs can also run directly in
        the interpreter for rapid prototyping.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">What This Book Covers</h3>
      <p className="mt-2 text-az-35">
        Every language feature from variables to the reactivity system. Each chapter builds on the
        previous one. By the end you will know how to write, structure, and ship Azora programs
        across all supported platforms.
      </p>
    </Section>
  )
}
