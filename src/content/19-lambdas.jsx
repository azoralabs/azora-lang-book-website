import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Lambdas() {
  return (
    <Section id="lambdas" title="19. Lambdas">
      <p className="mt-2 text-az-35">
        A lambda is an anonymous function. It has the form{' '}
        <code className="text-az-primary">{`{ params -> body }`}</code>. Parameters carry explicit
        types, and a lambda returns the value of its last expression. Lambdas capture the variables
        in scope where they are defined (closures).
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">19.1 Lambdas as values</h3>
      <CodeBlock>{`func main() {
    var double = { x: Int -> x * 2 }
    println(double(21))   // 42
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">19.2 Higher-order functions</h3>
      <p className="mt-2 text-az-35">
        Function types are written <code className="text-az-primary">{'(A, B) -> R'}</code>. A
        function can take a lambda as an argument and call it.
      </p>
      <CodeBlock>{`func apply(f: (Int) -> Int, x: Int): Int {
    return f(x)
}

func main() {
    println(apply({ x: Int -> x * x }, 5))   // 25
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">19.3 Closures</h3>
      <p className="mt-2 text-az-35">
        A lambda captures the variables around it. A function that returns a lambda gives you a
        closure that remembers those captured values.
      </p>
      <CodeBlock>{`func makeAdder(n: Int): (Int) -> Int {
    return { x: Int -> x + n }
}

func main() {
    var add10 = makeAdder(10)
    println(add10(32))   // 42
}`}</CodeBlock>
    </Section>
  )
}
