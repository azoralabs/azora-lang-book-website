import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function ImplMethods() {
  return (
    <Section id="impl-methods" title="18. Impl Methods">
      <p className="mt-2 text-az-35">
        An <code className="text-az-primary">impl</code> block attaches methods to a{' '}
        <code className="text-az-primary">pack</code>. Inside a method,{' '}
        <code className="text-az-primary">self</code> refers to the value the method was called on,
        so methods can read and mutate its fields.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">18.1 Defining methods</h3>
      <CodeBlock>{`pack Point {
    var x: Int
    var y: Int
}

impl Point {
    func lengthSquared(): Int {
        return self.x * self.x + self.y * self.y
    }
    func moveBy(dx: Int, dy: Int) {
        self.x = self.x + dx
        self.y = self.y + dy
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">18.2 Calling methods</h3>
      <p className="mt-2 text-az-35">
        Call a method with dot syntax: <code className="text-az-primary">value.method(args)</code>.
        Methods can read fields, compute results, and (if the fields are{' '}
        <code className="text-az-primary">var</code>) mutate them.
      </p>
      <CodeBlock>{`pack Point {
    var x: Int
    var y: Int
}

impl Point {
    func lengthSquared(): Int {
        return self.x * self.x + self.y * self.y
    }
    func moveBy(dx: Int, dy: Int) {
        self.x = self.x + dx
        self.y = self.y + dy
    }
}

func main() {
    var p = Point(3, 4)
    println(p.lengthSquared())   // 25  (3*3 + 4*4)
    p.moveBy(10, 20)
    println(p.lengthSquared())   // 725 (13*13 + 24*24)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">18.3 Methods on values in collections</h3>
      <p className="mt-2 text-az-35">
        Methods work on any value of the type, including elements pulled from an array.
      </p>
      <CodeBlock>{`pack Point {
    var x: Int
    var y: Int
}

impl Point {
    func lengthSquared(): Int {
        return self.x * self.x + self.y * self.y
    }
}

func main() {
    fin pts = [Point(1, 1), Point(3, 4), Point(5, 5)]
    println(pts[1].lengthSquared())   // 25
}`}</CodeBlock>
    </Section>
  )
}
