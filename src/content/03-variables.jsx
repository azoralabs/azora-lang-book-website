import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Variables() {
  return (
    <Section id="variables" title="3. Variables & Bindings">
      <p className="mt-2 text-az-35">
        Azora has three binding keywords that differ by mutability.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">3.1 var, let, and fin</h3>
      <Table/>
      <CodeBlock>{`func main() {
    var count = 0        // mutable: can be reassigned
    count = 10
    count = count + 5
    println(count)       // 15

    let limit = 100      // immutable view: cannot be reassigned
    println(limit)       // 100

    fin pi = 3           // deeply immutable integer
    println(pi)          // 3
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Reassigning a <code className="text-az-primary">let</code> or <code className="text-az-primary">fin</code> binding is a compile-time error:
      </p>
      <CodeBlock>{`func main() {
    fin x = 5
    x = 6                // ERROR: cannot reassign immutable binding 'x'
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">3.2 Type annotations & inference</h3>
      <p className="mt-2 text-az-35">
        Types can be inferred from the initializer, or written explicitly with a colon. The two
        forms are equivalent when the initializer's type matches.
      </p>
      <CodeBlock>{`func main() {
    var a = 42           // inferred: Int
    var b: Int = 42      // explicit: Int

    var name = "Azora"   // inferred: String
    var greeting: String = "hi"

    var ready = true     // inferred: Bool
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">3.3 Top-level bindings</h3>
      <p className="mt-2 text-az-35">
        At the top level of a file, only deeply-immutable <code className="text-az-primary">fin</code> bindings are
        allowed — mutable globals are rejected as not thread-safe. Mutable state lives inside functions.
      </p>
      <CodeBlock>{`fin MAX_SIZE = 1024        // OK: immutable global
fin APP_NAME = "Azora"     // OK

func main() {
    var local = 0          // OK: mutable local
    println(APP_NAME)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">3.4 Shadowing is not allowed</h3>
      <p className="mt-2 text-az-35">
        A variable cannot be redeclared in the same scope. Use a <code className="text-az-primary">zone</code> to
        introduce a nested scope when you need a fresh name.
      </p>
      <CodeBlock>{`func main() {
    var x = 1
    var x = 2              // ERROR: 'x' is already declared in this scope

    zone {
        var x = 2          // OK: different scope
        println(x)
    }
}`}</CodeBlock>
    </Section>
  )
}

function Table() {
  const headers = ['Keyword', 'Mutability']
  const rows = [
    [<code key="1" className="text-az-primary">var</code>, 'Mutable — can be reassigned'],
    [<code key="1" className="text-az-primary">let</code>, 'Immutable — read-only view, cannot be reassigned'],
    [<code key="1" className="text-az-primary">fin</code>, 'Deeply immutable — cannot be reassigned'],
  ]
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
