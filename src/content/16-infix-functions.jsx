import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function InfixFunctions() {
  return (
    <Section id="infix-functions" title="Infix Functions">
      <p>
        Infix functions are called between a receiver and an argument without dot notation, reading
        like natural language or mathematical notation. They are ideal for building DSLs.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Declaration</h3>
      <p>
        Declared with <code className="text-az-primary">infx</code>, followed by the receiver type,
        a dot, the function name, and exactly one parameter. Inside the body,{' '}
        <code className="text-az-primary">self</code> refers to the left-hand receiver.
      </p>
      <CodeBlock>{`infx Int.plus(other: Int): Int = self + other
infx String.repeat(n: Int): String = self * n`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Usage</h3>
      <p>Called between receiver and argument, like custom operators:</p>
      <CodeBlock>{`var result = 5 plus 3    // 8
var s = "ha" repeat 3   // "hahaha"`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Precedence</h3>
      <p>
        Infix calls sit between comparison operators (<code className="text-az-primary">==</code>,{' '}
        <code className="text-az-primary">&lt;</code>) and{' '}
        <code className="text-az-primary">as</code>/<code className="text-az-primary">is</code>.
        Arithmetic operators bind more tightly:{' '}
        <code className="text-az-primary">2 + 3 plus 4</code> evaluates as{' '}
        <code className="text-az-primary">5 plus 4</code> = <code className="text-az-primary">9</code>.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Practical Examples</h3>
      <p>
        Infix functions excel in math libraries, test assertions, and collection DSLs:
      </p>
      <CodeBlock>{`// Math DSL
infx Vec3.dot(other: Vec3): Real = self.x * other.x + self.y * other.y + self.z * other.z
var d = v1 dot v2

// Test assertion DSL
infx Int.shouldBe(expected: Int): Bool = self == expected
var ok = result shouldBe 42

// Collection DSL
infx Array<Int>.contains(el: Int): Bool = self.has(el)
var found = myArr contains 7`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        The parser pre-scans all <code className="text-az-primary">infx</code> declarations to
        recognize infix identifiers. Keep names short and descriptive for readability.
      </p>
    </Section>
  )
}
