import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function ErrorHandling() {
  return (
    <Section id="error-handling" title="17. Error Handling">
      <p className="mt-2 text-az-35">
        Azora handles errors with <code className="text-az-primary">throw</code>,{' '}
        <code className="text-az-primary">try</code>/<code className="text-az-primary">catch</code>,
        and the <code className="text-az-primary">expr catch fallback</code> expression. A thrown
        value propagates until it is caught.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">17.1 throw</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">throw value</code> raises a value (of any type) as a
        throwable. An uncaught throw aborts the program.
      </p>
      <CodeBlock>{`func safeDiv(a: Int, b: Int): Int {
    if b == 0 { throw "division by zero" }
    return a / b
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">17.2 try / catch</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">try {'{ }'} catch {'{ name -> }'}</code> runs a block and,
        if it throws, binds the thrown value to <code className="text-az-primary">name</code> and runs
        the handler. The binding is optional.
      </p>
      <CodeBlock>{`func main() {
    try {
        throw "boom"
    } catch { e ->
        println("caught: " + e)   // caught: boom
    }

    try {
        println("all good")
    } catch {
        println("error")          // not printed
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">17.3 The catch expression</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">expr catch fallback</code> evaluates{' '}
        <code className="text-az-primary">expr</code>; if it throws, the result is{' '}
        <code className="text-az-primary">fallback</code> instead.
      </p>
      <CodeBlock>{`func safeDiv(a: Int, b: Int): Int {
    if b == 0 { throw "div0" }
    return a / b
}

func main() {
    println(safeDiv(10, 2) catch -1)   // 5
    println(safeDiv(10, 0) catch -1)   // -1
}`}</CodeBlock>
    </Section>
  )
}
