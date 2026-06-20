import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function CompilationTargets() {
  return (
    <Section id="compilation-targets" title="14. Compilation Targets">
      <p className="mt-2 text-az-35">
        One Azora program lowers to several targets from the same typed IR. The currently supported
        backends are Kotlin (JVM), TypeScript, LLVM IR, and a built-in interpreter that runs the IR
        directly.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">14.1 A sample program</h3>
      <CodeBlock title="add.az">{`func add(a: Int, b: Int): Int {
    return a + b
}

func main() {
    println(add(2, 3))
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">14.2 Kotlin (JVM)</h3>
      <CodeBlock language="kotlin">{`fun add(a: Int, b: Int): Int {
    return (a + b)
}

fun main(): Unit {
    println(add(2, 3))
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">14.3 TypeScript</h3>
      <CodeBlock language="typescript">{`function add(a: number, b: number): number {
    return (a + b);
}

function main(): void {
    console.log(add(2, 3));
}

main()`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">14.4 LLVM IR</h3>
      <p className="mt-2 text-az-35">
        The LLVM backend lowers to textual LLVM IR (`.ll`), suitable for assembling or interpreting
        with <code className="text-az-primary">lli</code>. Strings become global constants and{' '}
        <code className="text-az-primary">println</code> lowers to <code className="text-az-primary">puts</code>{' '}
        / <code className="text-az-primary">printf</code>.
      </p>
      <CodeBlock language="llvm">{`; (excerpt) the generated LLVM IR uses printf for integers
@.str.0 = private unnamed_addr constant [4 x i8] c"%d\\00"
declare i32 (i8*, ...) @printf(...)

define i32 @add(i32 %a, i32 %b) {
    %1 = add i32 %a, %b
    ret i32 %1
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">14.5 Interpreter</h3>
      <p className="mt-2 text-az-35">
        The IR can also be executed directly in memory by the interpreter — no code generation
        required. This is how tests run, and it is the fastest path from source to a result during
        development.
      </p>
    </Section>
  )
}
