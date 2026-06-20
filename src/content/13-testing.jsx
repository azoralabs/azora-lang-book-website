import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Testing() {
  return (
    <Section id="testing" title="13. Testing & Tracing">
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">13.1 Tests</h3>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">test</code> declaration is a named block of code that
        runs after <code className="text-az-primary">main</code>. Tests live at the top level of a
        file.
      </p>
      <CodeBlock>{`func add(a: Int, b: Int): Int {
    return a + b
}

test "addition works" {
    fin result = add(2, 3)
    assert result == 5 { "2 + 3 should be 5" }
}

test "negation" {
    assert add(-1, 1) == 0 { "-1 + 1 should be 0" }
}

func main() {
    println("running")
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">13.2 Assertions</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">assert condition {'{ "message" }'}</code> checks a runtime
        condition. If the condition is false, the program aborts with the message. Assertions are
        allowed inside functions and <code className="text-az-primary">zone</code> blocks.
      </p>
      <CodeBlock>{`func divide(a: Int, b: Int): Int {
    assert b != 0 { "division by zero" }
    return a / b
}

func main() {
    println(divide(10, 2))   // 5
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">13.3 Compile-time assertions</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">inline assert</code> evaluates the condition at compile
        time. A false condition is a compilation error.
      </p>
      <CodeBlock>{`func main() {
    inline fin SIZE = 16
    inline assert SIZE > 0 { "SIZE must be positive" }
    println(SIZE)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">13.4 Tracing</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">trace</code> prints a diagnostic line prefixed with{' '}
        <code className="text-az-primary">[TRACE]</code>. It is useful for debugging.
      </p>
      <CodeBlock>{`func process(x: Int): Int {
    trace { "processing value" }
    return x * 2
}

func main() {
    println(process(5))
}`}</CodeBlock>
    </Section>
  )
}
