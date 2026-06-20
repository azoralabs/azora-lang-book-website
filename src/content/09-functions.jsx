import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Functions() {
  return (
    <Section id="functions" title="9. Functions">
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">9.1 Declaring functions</h3>
      <p className="mt-2 text-az-35">
        A function is declared with <code className="text-az-primary">func</code>, a name, a
        parameter list, an optional return type, and a body of statements. Parameters are passed
        positionally.
      </p>
      <CodeBlock>{`func add(a: Int, b: Int): Int {
    return a + b
}

func greet(name: String) {
    println("Hello, " + name + "!")
}

func main() {
    println(add(2, 3))    // 5
    greet("Azora")        // Hello, Azora!
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">9.2 Return types</h3>
      <p className="mt-2 text-az-35">
        If you omit the return type, it is inferred from the function's{' '}
        <code className="text-az-primary">return</code> statements; a function with no return
        yields <code className="text-az-primary">Unit</code>.
      </p>
      <CodeBlock>{`func square(n: Int) {        // returns Unit
    println(n * n)
}

func double(n: Int) {        // return type inferred as Int
    return n * 2
}

func main() {
    square(5)                 // 25
    println(double(21))       // 42
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">9.3 Forward references</h3>
      <p className="mt-2 text-az-35">
        All function signatures are collected before any body is analyzed, so functions may call
        each other regardless of order.
      </p>
      <CodeBlock>{`func main() {
    println(isEven(10))     // true
}

func isEven(n: Int): Bool {
    if n == 0 {
        return true
    }
    return isOdd(n - 1)
}

func isOdd(n: Int): Bool {
    if n == 0 {
        return false
    }
    return isEven(n - 1)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">9.4 Recursion</h3>
      <CodeBlock>{`func factorial(n: Int): Int {
    if n <= 1 {
        return 1
    }
    return n * factorial(n - 1)
}

func main() {
    println(factorial(5))   // 120
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">9.5 Built-in: println</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">println(x)</code> prints a single value followed by a
        newline. It accepts any type.
      </p>
    </Section>
  )
}
