import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function GettingStarted() {
  return (
    <Section id="getting-started" title="Getting Started">
      <p className="mt-2 text-az-35">
        This chapter covers how Azora source files are structured, how to write and run your first program,
        and how comments and packages work.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">The <code className="text-az-primary">.az</code> File Extension</h3>
      <p className="mt-4 text-az-35">
        Every Azora source file uses the <code className="text-az-primary">.az</code> extension. Files without
        this extension will not be recognized by the compiler. Azora source files are plain UTF-8 text, editable
        with any text editor or IDE.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">File Structure</h3>
      <p>Every Azora file can contain:</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li>An optional <code className="text-az-primary">package</code> declaration (must be first)</li>
        <li><code className="text-az-primary">use</code> imports</li>
        <li>Top-level declarations: variables, functions, types, hooks, tests, and more</li>
      </ol>

      <p className="mt-4 text-az-35">
        A single file can contain as many declarations as you like. There is no one-class-per-file rule.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Packages</h3>
      <p className="mt-4 text-az-35">
        The <code className="text-az-primary">package</code> declaration assigns a file to a named namespace,
        preventing naming collisions. Package names use dot-separated segments. If omitted, the file belongs
        to the default (unnamed) package.
      </p>

      <CodeBlock title="math_utils.az">{`package math.utils

func clamp(value: Int, lo: Int, hi: Int): Int {
    if value < lo { return lo }
    if value > hi { return hi }
    return value
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Your First Program</h3>
      <p className="mt-4 text-az-35">
        The entry point for an Azora program is <code className="text-az-primary">hook onStart()</code>,
        equivalent to <code className="text-az-primary">main()</code> in other languages. It is tied to the
        engine's lifecycle system.
      </p>

      <CodeBlock title="main.az">{`package demo

hook onStart() {
    println("Hello, Azora!")
}`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Hooks run in a suspendable context, so you can use <code className="text-az-primary">async</code> and
        <code className="text-az-primary"> await</code> directly inside them.
      </p>

      <p className="mt-4 text-az-50">
        <strong>Note:</strong> A program can have only one <code className="text-az-primary">onStart</code> hook
        across all source files. For multi-file initialization, define regular functions and call them
        from <code className="text-az-primary">onStart</code>.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Running Your Program</h3>
      <p className="mt-4 text-az-35">
        Inside the Azora engine, code is compiled and executed automatically with hot-reload on file changes.
        For standalone use, programs compile to a target backend (e.g., Kotlin/JVM). During development, interpreter
        mode can run <code className="text-az-primary">.az</code> files directly without full compilation.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Comments</h3>
      <CodeBlock>{`// Single-line comment

/* Block comment */

/* Nested /* block */ comments are supported */`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Single-line comments start with <code className="text-az-primary">//</code>. Block comments
        use <code className="text-az-primary">/* */</code> and can span multiple lines. Azora
        supports <strong>nested block comments</strong>, so you can comment out code that already contains
        block comments without syntax errors.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Putting It All Together</h3>
      <CodeBlock title="greet.az">{`package demo

// A greeting function that builds a welcome message
func greet(name: String): String {
    return "Welcome to Azora, " + name + "!"
}

hook onStart() {
    fin message = greet("Developer")
    println(message)
}`}</CodeBlock>
    </Section>
  )
}
