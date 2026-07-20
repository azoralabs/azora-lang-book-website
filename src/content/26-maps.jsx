import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Maps() {
  return (
    <Section id="maps" title="26. Maps">
      <p className="mt-2 text-az-35">
        A <strong>map</strong> is a keyed collection - Azora's spelling is{' '}
        <code className="text-az-primary">[&quot;k&quot;: v]</code>. The literal syntax mirrors the
        array literal, but each entry is a <code className="text-az-primary">key: value</code> pair.
        Keys and values can be any type.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">26.1 Creating and reading</h3>
      <CodeBlock>{`func main() {
    var m = ["a": 1, "b": 2, "c": 3]
    println(m["a"])          // 1
    println(m["c"])          // 3
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">26.2 Updating a value</h3>
      <p className="mt-2 text-az-35">
        Index-assign on a map writes through, just like an array element.
      </p>
      <CodeBlock>{`func main() {
    var m = ["a": 1, "b": 2, "c": 3]
    m["b"] = 99
    println(m["b"])          // 99
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">26.3 Any key type</h3>
      <p className="mt-2 text-az-35">
        Keys are not limited to strings - integers work too, which makes a map a natural sparse
        table.
      </p>
      <CodeBlock>{`func main() {
    var scores = [10: 10, 20: 20, 30: 30]
    scores[40] = 40
    println(scores[30])      // 30
    println(scores[40])      // 40
}`}</CodeBlock>
    </Section>
  )
}
