
import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function CompilationTargets() {
  return (
    <Section id="compilation-targets" title="14. Compilation Targets">
      <p className="mt-2 text-az-35">
        Azora 0.0.3 has four active execution surfaces from the same typed IR: the in-memory
        interpreter, JavaScript, WebAssembly (WAT), and LLVM IR. Every compile produces the codegen
        outputs together; <code className="text-az-primary">azora compile &lt;target&gt;</code> emits the
        one you ask for.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">14.1 A sample program</h3>
      <CodeBlock title="add.az">{`func add(a: Int, b: Int): Int {
    return a + b
}

func main() {
    println(add(2, 3))
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">14.2 JavaScript</h3>
      <CodeBlock language="javascript">{`function add(a, b) {
    return (a + b);
}

function main() {
    console.log(add(2, 3));
}

main();`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">14.3 WebAssembly</h3>
      <p className="mt-2 text-az-35">
        The WASM backend emits WebAssembly text with host imports for printing and a compact linear
        memory runtime for strings, arrays, and packs.
      </p>
      <CodeBlock language="wasm">{`(module
  (import "env" "print_i32" (func $print_i32 (param i32)))
  (func $add (param $a i32) (param $b i32) (result i32)
    (i32.add (local.get $a) (local.get $b)))
  (func $main
    (call $print_i32 (call $add (i32.const 2) (i32.const 3))))
  (export "main" (func $main)))`}</CodeBlock>

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
        The IR can also be executed directly in memory by the interpreter - no code generation
        required. This is how tests run, and it is the fastest path from source to a result during
        development.
      </p>
    </Section>
  )
}
