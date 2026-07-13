import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function InfixFunctions() {
  return (
    <Section id="infix-functions" title="22. Infix Functions">
      <p className="mt-2 text-az-35">
        A method declared <code className="text-az-primary">infix</code> can be called without dots
        or parentheses: <code className="text-az-primary">a plus b</code> instead of{' '}
        <code className="text-az-primary">a.plus(b)</code>. This makes DSL-like expressions read as
        plain English while staying statically typed.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">22.1 Declaring an infix method</h3>
      <p className="mt-2 text-az-35">
        Declare a single-parameter infix extension with <code className="text-az-primary">infx Type.method</code>.
      </p>
      <CodeBlock>{`pack Vec2 {
    var x: Int
    var y: Int
}

infx Vec2.plus(other: Vec2): Vec2 {
    return Vec2(self.x + other.x, self.y + other.y)
}

func main() {
    var a = Vec2(1, 2)
    var b = Vec2(3, 4)
    var c = a plus b          // same as a.plus(b)
    println(c.x)              // 4
    println(c.y)              // 6
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">22.2 When to use them</h3>
      <p className="mt-2 text-az-35">
        Infix calls are sugar — the dot-and-paren form always works too. They shine for math-like
        helpers and builders where readability matters.
      </p>
    </Section>
  )
}
