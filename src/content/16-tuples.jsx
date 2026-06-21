import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Tuples() {
  return (
    <Section id="tuples" title="16. Tuples">
      <p className="mt-2 text-az-35">
        A tuple groups two or more values of possibly different types into a single value. Elements
        are accessed positionally with <code className="text-az-primary">.0</code>,{' '}
        <code className="text-az-primary">.1</code>, and so on.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">16.1 Tuple literals</h3>
      <CodeBlock>{`func main() {
    fin pair = (1, "hello")
    println(pair.0)     // 1
    println(pair.1)     // hello
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">16.2 Returning multiple values</h3>
      <p className="mt-2 text-az-35">
        A function can return a tuple, declared with a tuple type{' '}
        <code className="text-az-primary">{'(A, B)'}</code>.
      </p>
      <CodeBlock>{`func divmod(a: Int, b: Int): (Int, Int) {
    return (a / b, a % b)
}

func main() {
    fin r = divmod(17, 5)
    println(r.0)     // 3  (quotient)
    println(r.1)     // 2  (remainder)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">16.3 Nested tuples</h3>
      <CodeBlock>{`func main() {
    fin t = (1, (2, 3), "end")
    fin inner = t.1
    println(inner.0)     // 2
}`}</CodeBlock>
    </Section>
  )
}
