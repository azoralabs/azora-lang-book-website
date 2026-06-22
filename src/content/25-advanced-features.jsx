import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function AdvancedFeatures() {
  return (
    <Section id="advanced-features" title="25. Advanced Features">
      <p className="mt-2 text-az-35">
        A grab-bag of features that round out day-to-day Azora: casts and runtime checks, early
        exits, default parameters, and named arguments.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">25.1 as and is</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">as</code> casts a value to a target type;{' '}
        <code className="text-az-primary">is</code> tests it at runtime and narrows the type inside
        a branch.
      </p>
      <CodeBlock>{`func describe(x: Any): String {
    if x is String {
        return "text: " + x
    }
    return "other"
}

func main() {
    println(describe("hi"))      // text: hi
    var n = 5 as Real
    println(n)                   // 5.0
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">25.2 guard and defer</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">guard</code> bails out early when a condition fails;{' '}
        <code className="text-az-primary">defer</code> schedules cleanup to run when the enclosing
        scope exits.
      </p>
      <CodeBlock>{`func half(n: Int): Int {
    guard n >= 0 else { return 0 }
    return n / 2
}

func main() {
    defer { println("done") }
    println(half(10))   // 5  then "done" prints on exit
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">25.3 Defaults and named args</h3>
      <CodeBlock>{`func greet(name: String, greeting: String = "Hello"): String {
    return greeting + ", " + name
}

func main() {
    println(greet("Azora"))                       // Hello, Azora
    println(greet("Azora", greeting: "Hi"))       // Hi, Azora
}`}</CodeBlock>
    </Section>
  )
}
