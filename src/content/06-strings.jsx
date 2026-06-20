import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Strings() {
  return (
    <Section id="strings" title="6. Strings">
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">6.1 String literals</h3>
      <p className="mt-2 text-az-35">
        Strings are double-quoted sequences of UTF-8 characters.
      </p>
      <CodeBlock>{`func main() {
    var greeting = "Hello, Azora!"
    println(greeting)             // Hello, Azora!

    var empty = ""
    println(empty.length)         // 0
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">6.2 Escape sequences</h3>
      <Table
        headers={['Escape', 'Meaning']}
        rows={[
          [<code key="1" className="text-az-primary">{'\\n'}</code>, 'newline'],
          [<code key="2" className="text-az-primary">{'\\t'}</code>, 'tab'],
          [<code key="3" className="text-az-primary">{'\\r'}</code>, 'carriage return'],
          [<code key="4" className="text-az-primary">{'\\\\'}</code>, 'backslash'],
          [<code key="5" className="text-az-primary">{'\\"'}</code>, 'double quote'],
          [<code key="6" className="text-az-primary">{'\\$'}</code>, 'literal dollar (disables interpolation)'],
        ]}
      />
      <CodeBlock>{`func main() {
    println("line one\\nline two")     // two lines
    println("price is \\$5")           // price is $5
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">6.3 Interpolation</h3>
      <p className="mt-2 text-az-35">
        Insert a value into a string with a dollar sign. Use{' '}
        <code className="text-az-primary">$name</code> for a bare identifier, or{' '}
        <code className="text-az-primary">{'${expr}'}</code> for any expression.
      </p>
      <CodeBlock>{`func main() {
    var name = "Azora"
    println("Hello, $name!")              // Hello, Azora!

    var x = 3
    var y = 4
    println("$x + $y = \${x + y}")         // 3 + 4 = 7

    var items = [10, 20, 30]
    println("first is \${items[0]}")       // first is 10
    println("count is \${items.length}")   // count is 3
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">6.4 Concatenation & length</h3>
      <CodeBlock>{`func main() {
    var first = "Hello"
    var second = "World"
    var combined = first + ", " + second + "!"
    println(combined)        // Hello, World!
    println(combined.length) // 12
}`}</CodeBlock>
    </Section>
  )
}

function Table({ headers, rows }) {
  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-az-75">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-az-85">
            {headers.map((h, i) => (
              <th key={i} className="text-left px-4 py-2.5 font-semibold text-az-25 border-b border-az-75">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-az-85 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-az-35">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
