
import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function ImplMethods() {
  return (
    <Section id="impl-methods" title="18. Impl Methods">
      <p className="mt-2 text-az-35">
        An <code className="text-az-primary">impl pack</code> block attaches methods to a{' '}
        <code className="text-az-primary">pack</code> in the file where that pack is declared. Inside
        a method, <code className="text-az-primary">self</code> refers to the receiver, so methods can
        read and mutate its fields.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">18.1 Defining methods</h3>
      <CodeBlock>{`pack Point {
    var x: Int
    var y: Int
}

impl pack Point {
    func lengthSquared(): Int {
        return self.x * self.x + self.y * self.y
    }
    func moveBy(dx: Int, dy: Int) {
        self.x = self.x + dx
        self.y = self.y + dy
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">18.2 Extensions</h3>
      <p className="mt-2 text-az-35">
        Outside the declaring file, add behavior with extension functions. Their receiver is declared
        inside the body header as <code className="text-az-primary">ref self</code> or{' '}
        <code className="text-az-primary">mut ref self</code>.
      </p>
      <CodeBlock>{`pack Point {
    var x: Int
    var y: Int
}

func Point.lengthSquared(): Int { ref self ->
    return self.x * self.x + self.y * self.y
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">18.3 Extension mutability</h3>
      <p className="mt-2 text-az-35">
        Extension functions can take <code className="text-az-primary">mut ref self</code> only
        when the pack exposes mutable state. If a pack has no <code className="text-az-primary">expose</code>{' '}
        fields, extensions are limited to <code className="text-az-primary">ref self</code>; methods in
        the declaring file still use <code className="text-az-primary">impl pack</code> for internal mutation.
      </p>
      <CodeBlock>{`pack Counter {
    var value: Int
}

impl pack Counter {
    func bump() {
        self.value = self.value + 1
    }
}

func Counter.peek(): Int { ref self ->
    return self.value
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">18.4 Calling methods</h3>
      <CodeBlock>{`func main() {
    var p = Point(3, 4)
    println(p.lengthSquared())   // 25
    p.moveBy(10, 20)
    println(p.lengthSquared())   // 725
}`}</CodeBlock>
    </Section>
  )
}
