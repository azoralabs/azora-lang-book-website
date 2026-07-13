import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Ffi() {
  return (
    <Section id="ffi" title="33. Foreign Function Interface (bridge)">
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">bridge</code> declares external functions for cross-target
        interop for the active backends. You write the signatures; the compiler type-checks
        them and JavaScript/LLVM expose the host boundary in their generated output. In the interpreter,
        common math functions resolve to a built-in table.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">33.1 Declaring extern functions</h3>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">bridge</code> block targets a backend and lists function
        signatures. After the block, the functions are callable like any other.
      </p>
      <CodeBlock>{`bridge C {
    func sqrt(x: Real): Real
    func sin(x: Real): Real
}

func main() {
    println(sqrt(16.0))     // 4.0
    println(sin(0.0))       // 0.0
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">33.2 Multi-argument externs</h3>
      <CodeBlock>{`bridge C {
    func pow(val: Real, exp: Real): Real
}

func main() {
    println(pow(2.0, 10.0))   // 1024.0
}`}</CodeBlock>

      <p className="mt-4 text-az-35">
        What each backend emits: JavaScript host extern comments/import expectations and LLVM{' '}
        <code className="text-az-primary">declare</code>. Use{' '}
        <code className="text-az-primary">azora compile llvm pow.az</code> to see the declaration.
      </p>
    </Section>
  )
}
