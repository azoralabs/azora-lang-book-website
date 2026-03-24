import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Introduction() {
  return (
    <Section id="introduction" title="Introduction">
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">1.1 What is Azora</h3>
      <p className="mt-2 text-az-35">
        <strong>Azora</strong> is a statically typed, compiled programming language designed for
        building interactive software. It combines strong compile-time guarantees with a clean,
        readable syntax that stays out of the way when writing application logic.
        This book covers <strong>Azora version 0.0.1</strong>.
      </p>

      <p className="mt-2 text-az-35">
        Azora compiles to multiple backend targets, including Kotlin/JVM, JavaScript, C#, Python,
        Swift, Dart, Rust, LLVM IR, and WebAssembly. Programs can also run directly in the built-in
        tree-walking interpreter for rapid prototyping. The compiler uses a pipeline of lexing, parsing, preprocessing
        (monomorphization, CTCE, inline expansion), semantic analysis, and code generation.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">1.2 Language Philosophy</h3>
      <p className="mt-2 text-az-35">
        Azora is built around three goals:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li><strong>Catch errors before the program runs.</strong> The type system, null safety, and contracts work together to surface bugs at compile time rather than at runtime.</li>
        <li><strong>Generate fast code without runtime abstraction costs.</strong> Generics are monomorphized, compile-time code execution eliminates runtime overhead, and inline metaprogramming removes abstraction layers before code generation.</li>
        <li><strong>Stay out of the way.</strong> The syntax is minimal and consistent. Type inference keeps declarations short. The language avoids ceremony and boilerplate.</li>
      </ul>

      <p className="mt-4 text-az-35">
        Most languages optimize for one of these at the expense of the others. Azora tries to get
        all three right.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">1.3 Key Features</h3>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>15 numeric types with literal suffixes and overflow semantics</li>
        <li>Null safety with <code className="text-az-primary">?</code> types and null-aware operators (<code className="text-az-primary">??</code>, <code className="text-az-primary">?.</code>, <code className="text-az-primary">?=</code>)</li>
        <li>First-class <code className="text-az-primary">Char</code> type with arithmetic, comparison, and Unicode support</li>
        <li>Monomorphized generics, including variadic generics and type functions</li>
        <li>Coroutines with <code className="text-az-primary">task</code>, <code className="text-az-primary">async</code>/<code className="text-az-primary">await</code>, and <code className="text-az-primary">launch</code></li>
        <li>Lazy generators with <code className="text-az-primary">flow</code> and <code className="text-az-primary">yield</code></li>
        <li>Compile-time code execution (CTCE) and inline metaprogramming (<code className="text-az-primary">inline if</code>, <code className="text-az-primary">inline for</code>, <code className="text-az-primary">inline trace</code>)</li>
        <li>D-style contracts with <code className="text-az-primary">in</code>/<code className="text-az-primary">out</code> blocks for preconditions and postconditions</li>
        <li>Fail sets for type-safe error handling (<code className="text-az-primary">fail</code>, <code className="text-az-primary">try</code>, <code className="text-az-primary">catch</code>)</li>
        <li>Reactivity system with <code className="text-az-primary">solo</code>, <code className="text-az-primary">wrap</code>, <code className="text-az-primary">view</code>, and <code className="text-az-primary">effect</code></li>
        <li>Operator overloading, infix functions, and custom DSLs</li>
        <li>Collection literals for arrays, sets, and maps</li>
        <li>Built-in test framework, tracing, and decorators</li>
        <li>FFI via the <code className="text-az-primary">bridge</code> keyword</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">1.4 Compilation Targets</h3>
      <p className="mt-2 text-az-35">
        Azora source files use the <code className="text-az-primary">.az</code> extension. The compiler
        preprocesses generics via monomorphization, evaluates compile-time code, expands inline
        decorators, then emits code for the chosen backend:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li><strong>JavaScript</strong> - for web and Node.js targets</li>
        <li><strong>Kotlin/JVM</strong> - for JVM-based applications and Android</li>
        <li><strong>C#</strong> - for .NET and Unity</li>
        <li><strong>Python</strong> - for scripting and data science integration</li>
        <li><strong>Swift</strong> - for Apple platforms</li>
        <li><strong>Dart</strong> - for Flutter and cross-platform mobile applications</li>
        <li><strong>Rust</strong> - for systems programming with memory safety guarantees</li>
        <li><strong>LLVM IR</strong> - for native compilation with full control over memory and performance</li>
        <li><strong>WebAssembly</strong> - for high-performance browser and edge runtime targets</li>
        <li><strong>Interpreter</strong> - a built-in tree-walking interpreter for rapid prototyping and development</li>
      </ul>

      <p className="mt-4 text-az-35">
        The same Azora source code compiles to all targets. Platform-specific behavior is handled
        through the <code className="text-az-primary">platform</code> keyword and
        the <code className="text-az-primary">bridge</code> FFI system.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">1.5 Hello World</h3>
      <p className="mt-2 text-az-35">
        Here is the simplest Azora program:
      </p>

      <CodeBlock title="hello.az">{`func main() {
    println("Hello, Azora!")
}`}</CodeBlock>

      <p className="mt-2 text-az-35">
        In the Azora engine, the entry point is a lifecycle
        hook, <code className="text-az-primary">hook onStart()</code>, rather than a
        plain <code className="text-az-primary">main</code> function:
      </p>

      <CodeBlock title="hello_engine.az">{`hook onStart() {
    println("Hello, Azora!")
}`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Both forms print a message to the console. The rest of this book will use standalone
        functions and top-level code in examples. Engine-specific features like hooks are
        covered in later chapters.
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
