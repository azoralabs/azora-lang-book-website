import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Introduction() {
  return (
    <Section id="introduction" title="1. Introduction">
      <p className="mt-2 text-az-35">
        <strong className="text-az-25">Azora</strong> is a small, statically-typed, multi-target
        programming language. It compiles through a modern four-phase pipeline - frontend,
        multi-pass semantic analysis with compile-time execution, a target-agnostic typed IR, and
        thin backends - and can lower a single program to JavaScript, WebAssembly, LLVM IR,
        or run it directly through a built-in interpreter.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">A first program</h3>
      <CodeBlock title="hello.az">{`func main() {
    println("Hello, Azora!")
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Every program has a <code className="text-az-primary">main</code> function. That is the
        entry point. <code className="text-az-primary">println</code> prints a line to the console.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">What this book covers</h3>
      <p className="mt-2 text-az-35">
        Azora is still early. This book documents the features the compiler actually implements
        today - every example here compiles and runs. The current surface includes:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li><strong className="text-az-25">Bindings</strong> - <code className="text-az-primary">var</code>, <code className="text-az-primary">let</code>, and deeply-immutable <code className="text-az-primary">fin</code></li>
        <li><strong className="text-az-25">Functions</strong> with parameters, return types, and recursion</li>
        <li><strong className="text-az-25">Compile-time execution</strong> via <code className="text-az-primary">inline</code> / <code className="text-az-primary">deepinline</code> / <code className="text-az-primary">noinline</code></li>
        <li><strong className="text-az-25">Scopes</strong> - <code className="text-az-primary">zone</code>, <code className="text-az-primary">friend zone</code>, and <code className="text-az-primary">::</code> scope resolution</li>
        <li><strong className="text-az-25">Control flow</strong> - <code className="text-az-primary">if</code>, <code className="text-az-primary">while</code>, <code className="text-az-primary">for</code> ranges, <code className="text-az-primary">loop</code>, <code className="text-az-primary">break</code>, <code className="text-az-primary">continue</code></li>
        <li><strong className="text-az-25">Arrays</strong> with indexing, mutation, and built-in members</li>
        <li><strong className="text-az-25">Structs</strong> (<code className="text-az-primary">pack</code>) with construction, fields, and <code className="text-az-primary">impl</code> methods</li>
        <li><strong className="text-az-25">Lambdas</strong> &amp; function types with closures</li>
        <li><strong className="text-az-25">String interpolation</strong> - <code className="text-az-primary">{`"hello $name"`}</code> and <code className="text-az-primary">{'"${expr}"'}</code></li>
        <li><strong className="text-az-25">Enums &amp; when</strong> - tagged variants and pattern matching</li>
        <li><strong className="text-az-25">Tuples</strong> - lightweight grouped values</li>
        <li><strong className="text-az-25">Error handling</strong> - <code className="text-az-primary">throw</code>, <code className="text-az-primary">try</code>/<code className="text-az-primary">catch</code></li>
        <li><strong className="text-az-25">Bitwise operators</strong> - <code className="text-az-primary">&</code> <code className="text-az-primary">|</code> <code className="text-az-primary">^</code> <code className="text-az-primary">~</code> <code className="text-az-primary">&lt;&lt;</code> <code className="text-az-primary">&gt;&gt;</code></li>
        <li><strong className="text-az-25">Nullable types</strong> - <code className="text-az-primary">T?</code>, <code className="text-az-primary">null</code>, <code className="text-az-primary">?.</code>, and <code className="text-az-primary">??</code></li>
        <li><strong className="text-az-25">Infix functions</strong> - <code className="text-az-primary">a plus b</code> call syntax</li>
        <li><strong className="text-az-25">Casts &amp; checks</strong> - <code className="text-az-primary">as</code> and <code className="text-az-primary">is</code></li>
        <li><strong className="text-az-25">guard &amp; defer</strong> - early exits and scoped cleanup</li>
        <li><strong className="text-az-25">Testing</strong> with <code className="text-az-primary">test</code>, <code className="text-az-primary">assert</code>, and <code className="text-az-primary">trace</code></li>
      </ul>
      <p className="mt-4 text-az-35">
        Features that are designed but not yet implemented - pointers, concurrency, decorators,
        foreign function interface, and more - are listed in the <a href="#roadmap" className="text-az-primary underline">Roadmap</a> chapter.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">1.1 Exported modules</h3>
      <p className="mt-2 text-az-35">
        A file declares which module it belongs to with <code className="text-az-primary">module</code>.
        Prefixing it with <code className="text-az-primary">export</code> publishes that module: its
        declarations are <strong className="text-az-25">automatically available in every other unit</strong>,
        with no <code className="text-az-primary">import</code> — in the current library and in any library
        that depends on it. This is how the standard library makes <code className="text-az-primary">Root</code>
        and the compile-time configuration flags visible everywhere.
      </p>
      <CodeBlock title="config.az">{`export module std.config

deepinline zone {
    fin DEBUG: Bool = true
    fin RELEASE: Bool = !DEBUG
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Because the module is exported, any file can read <code className="text-az-primary">DEBUG</code> or
        branch on it at compile time — <code className="text-az-primary">{`deepinline if RELEASE { ... }`}</code> —
        without importing <code className="text-az-primary">std.config</code>. Use
        <code className="text-az-primary"> export</code> sparingly: it is meant for a handful of
        foundational declarations that genuinely belong in every scope, not as a way to avoid ordinary
        <code className="text-az-primary"> import</code> statements.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Design principles</h3>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li><strong className="text-az-25">IR is the portability asset.</strong> All backends lower from one target-agnostic typed IR. Adding a target means one new file.</li>
        <li><strong className="text-az-25">Metaprogramming is resolved early.</strong> Compile-time constructs run before type checking, so the type checker always sees clean code.</li>
        <li><strong className="text-az-25">No hidden state.</strong> Newlines are significant statement separators; scopes are explicit.</li>
      </ul>
    </Section>
  )
}
