import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function EnumsWhen() {
  return (
    <Section id="enums-when" title="15. Enums & When">
      <p className="mt-2 text-az-35">
        An <code className="text-az-primary">enum</code> is a named set of variants. A{' '}
        <code className="text-az-primary">when</code> expression matches a value against patterns and
        runs the first branch that matches.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">15.1 Declaring an enum</h3>
      <p className="mt-2 text-az-35">
        Each variant is written on its own line. Variant values are referenced
        as <code className="text-az-primary">Name.Variant</code>.
      </p>
      <CodeBlock>{`enum Color {
    Red
    Green
    Blue
}

func main() {
    fin c = Color.Green
    println(c)              // Green
    println(c == Color.Green)   // true
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">15.2 Matching with when</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">when</code> compares a value to each branch's patterns
        (comma-separated) and runs the first match. An optional <code className="text-az-primary">else</code> branch handles anything unmatched.
      </p>
      <CodeBlock>{`enum Light {
    Red
    Yellow
    Green
}

func action(l: String): String {
    when l {
        Light.Red -> { return "stop" }
        Light.Yellow -> { return "slow" }
        Light.Green -> { return "go" }
        else -> { return "unknown" }
    }
}

func main() {
    println(action(Light.Red))     // stop
    println(action(Light.Green))   // go
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">15.3 When on integers and strings</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">when</code> works on any comparable value, and a branch may
        list several patterns.
      </p>
      <CodeBlock>{`func main() {
    var n = 2
    when n {
        0, 1, 2, 3 -> { println("small") }
        else -> { println("big") }
    }
}`}</CodeBlock>
    </Section>
  )
}
