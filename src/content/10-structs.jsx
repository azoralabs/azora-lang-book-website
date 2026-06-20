import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Structs() {
  return (
    <Section id="structs" title="10. Structs (pack)">
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">pack</code> is a struct: a named bundle of fields. Use
        it to group related data.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">10.1 Declaring a pack</h3>
      <p className="mt-2 text-az-35">
        Declare a pack with <code className="text-az-primary">pack</code>, a name, and a brace block
        of fields. Each field is written on its own line with a name, a type, and an optional
        mutability keyword.
      </p>
      <CodeBlock>{`pack Point {
    var x: Int
    var y: Int
}

pack User {
    fin id: Int
    var name: String
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Fields marked <code className="text-az-primary">var</code> are mutable after construction;
        fields marked <code className="text-az-primary">fin</code> (or with no keyword) are immutable.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">10.2 Construction</h3>
      <p className="mt-2 text-az-35">
        Construct a pack by calling its name like a function, passing the field values in
        declaration order.
      </p>
      <CodeBlock>{`pack Point {
    var x: Int
    var y: Int
}

func main() {
    var p = Point(3, 4)
    println(p.x)          // 3
    println(p.y)          // 4
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">10.3 Field access & mutation</h3>
      <CodeBlock>{`pack Counter {
    var count: Int
    fin label: String
}

func main() {
    var c = Counter(0, "hits")
    println(c.count)       // 0

    c.count = 10
    c.count += 5
    println(c.count)       // 15

    // c.label = "x"       // ERROR: 'label' is immutable
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">10.4 Packs everywhere</h3>
      <p className="mt-2 text-az-35">
        Packs can be returned from functions, stored in arrays, and passed as arguments.
      </p>
      <CodeBlock>{`pack Point {
    var x: Int
    var y: Int
}

func origin(): Point {
    return Point(0, 0)
}

func main() {
    var points = [Point(1, 2), Point(3, 4), origin()]
    println(points[1].x)        // 3
    println(points[2].y)        // 0
}`}</CodeBlock>
    </Section>
  )
}
