import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Traits() {
  return (
    <Section id="traits" title="21. Traits (spec)">
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">spec</code> declares a trait — a named set of method
        signatures. A type implements a spec with{' '}
        <code className="text-az-primary">impl SpecName for TypeName</code>. The compiler checks
        that every spec method is provided.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">21.1 Declaring a spec</h3>
      <CodeBlock>{`spec Describable {
    func describe(): String
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">21.2 Implementing a spec</h3>
      <CodeBlock>{`pack Point {
    var x: Int
    var y: Int
}

spec Describable {
    func describe(): String
}

impl Describable for Point {
    func describe(): String {
        return "Point(" + self.x + ", " + self.y + ")"
    }
}

func main() {
    var p = Point(3, 4)
    println(p.describe())   // Point(3, 4)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">21.3 Validation</h3>
      <p className="mt-2 text-az-35">
        If a type claims to implement a spec but is missing a method, the compiler reports an error.
        An unknown spec name is also an error.
      </p>
    </Section>
  )
}
