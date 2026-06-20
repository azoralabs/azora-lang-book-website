import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function GettingStarted() {
  return (
    <Section id="getting-started" title="2. Getting Started">
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Program structure</h3>
      <p className="mt-2 text-az-35">
        An Azora source file is a list of top-level items: functions, deeply-immutable global
        constants (<code className="text-az-primary">fin</code>), compile-time constructs, and
        <code className="text-az-primary"> test</code> declarations. Execution begins at
        <code className="text-az-primary"> main</code>.
      </p>
      <CodeBlock title="program.az">{`fin VERSION = "1.0.0"

func greet(name: String): String {
    return "Hello, " + name + "!"
}

func main() {
    println(greet("Azora"))
    println("version " + VERSION)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Newlines are significant</h3>
      <p className="mt-2 text-az-35">
        Azora uses newlines as statement separators (there are no semicolons). Inside parentheses,
        braces, and brackets, newlines are ignored, so you can wrap long expressions freely.
      </p>
      <CodeBlock>{`func main() {
    var total = 1 + 2 + 3
    println(total)

    var long = (10
        + 20
        + 30)
    println(long)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Comments</h3>
      <p className="mt-2 text-az-35">
        Line comments start with <code className="text-az-primary">//</code>. Block comments use{' '}
        <code className="text-az-primary">/* ... */</code> and nest, so you can comment out code
        that already contains block comments.
      </p>
      <CodeBlock>{`// This is a line comment.

/* This is a
   block comment. */

/* Block comments /* nest */ freely */

func main() {
    println("comments are ignored") // inline comment
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Running a program</h3>
      <p className="mt-2 text-az-35">
        Every program can be executed directly through the IR interpreter, or lowered to a target
        backend. See the <a href="#compilation-targets" className="text-az-primary underline">Compilation Targets</a> chapter for the generated
        Kotlin, TypeScript, and LLVM IR for a sample program.
      </p>
    </Section>
  )
}
