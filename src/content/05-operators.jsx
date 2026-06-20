import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Table from '../components/Table.jsx'

export default function Operators() {
  return (
    <Section id="operators" title="5. Operators">
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">5.1 Arithmetic</h3>
      <CodeBlock>{`func main() {
    println(2 + 3)      // 5
    println(10 - 4)     // 6
    println(4 * 5)      // 20
    println(17 / 5)     // 3
    println(17 % 5)     // 2
    println(-7)         // -7  (unary negation)
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">+</code> also concatenates two strings, and{' '}
        <code className="text-az-primary">*</code> repeats a string by an integer count.
      </p>
      <CodeBlock>{`func main() {
    println("hello " + "world")   // hello world
    println("ab" * 3)             // ababab
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">5.2 Comparison & logical</h3>
      <CodeBlock>{`func main() {
    println(3 < 5)               // true
    println(5 <= 5)              // true
    println(2 == 2)              // true
    println(2 != 3)              // true

    var active = true
    var count = 0
    println(active && count == 0)   // true
    println(!active)                // false
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">5.3 Assignment & compound assignment</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">=</code> assigns (or reassigns a <code className="text-az-primary">var</code>).
        Compound operators combine an operation with assignment.
      </p>
      <CodeBlock>{`func main() {
    var n = 10
    n += 5      // 15
    n -= 2      // 13
    n *= 3      // 39
    n /= 3      // 13
    n %= 5      // 3
    println(n)  // 3
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">5.4 Ranges</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">..</code> creates an inclusive range,{' '}
        <code className="text-az-primary">..&lt;</code> an exclusive one. Ranges are most often used
        as the iterable of a <code className="text-az-primary">for</code> loop.
      </p>
      <CodeBlock>{`func main() {
    var sum = 0
    for i in 1..5 {        // 1, 2, 3, 4, 5
        sum += i
    }
    println(sum)           // 15

    var count = 0
    for i in 0..<5 {       // 0, 1, 2, 3, 4
        count += 1
    }
    println(count)         // 5
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">5.5 Precedence (low to high)</h3>
      <Table
        headers={['Level', 'Operators']}
        rows={[
          ['1', <code key="1" className="text-az-primary">||</code>],
          ['2', <code key="2" className="text-az-primary">{'&&'}</code>],
          ['3', <code key="3" className="text-az-primary">== !=</code>],
          ['4', <code key="4" className="text-az-primary">{'< <= > >='}</code>],
          ['5', <code key="5" className="text-az-primary">.. ..&lt;</code>],
          ['6', <code key="6" className="text-az-primary">+ -</code>],
          ['7', <code key="7" className="text-az-primary">* / %</code>],
          ['8', <code key="8" className="text-az-primary">! -</code> + ' (unary)'],
          ['9', 'call, index, member access'],
        ]}
      />
      <p className="mt-2 text-az-35">
        Use parentheses to override precedence.
      </p>
    </Section>
  )
}
