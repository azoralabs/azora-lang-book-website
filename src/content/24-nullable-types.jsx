import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function NullableTypes() {
  return (
    <Section id="nullable-types" title="24. Nullable Types">
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">?</code> after a type marks it as nullable - it may hold{' '}
        <code className="text-az-primary">null</code> or a value of the base type. The compiler
       tracks nullability so you must handle the absent case before using the value.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">24.1 Declaring and assigning</h3>
      <CodeBlock>{`func find(key: String): String? {
    if key == "missing" {
        return null
    }
    return "found"
}

func main() {
    var a: String? = find("missing")
    var b: String? = find("x")
    println(a)   // null
    println(b)   // found
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">24.2 Safe access and defaults</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">?.</code> accesses a member only when the receiver is
        non-null, otherwise it yields null. <code className="text-az-primary">??</code> provides a
        fallback when the left side is null.
      </p>
      <CodeBlock>{`func main() {
    var name: String? = null
    println(name?.length)         // null
    println(name ?? "anon")       // anon
    var n: String? = "azora"
    println(n?.length)            // 5
    println(n ?? "anon")          // azora
}`}</CodeBlock>
    </Section>
  )
}
