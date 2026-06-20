import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function CTCE() {
  return (
    <Section id="ctce" title="12. Compile-Time Execution">
      <p className="mt-2 text-az-35">
        Azora can run parts of your program while it compiles. Compile-time constructs are resolved{' '}
        <em>before</em> type checking, so the type checker always sees clean, fully-evaluated code.
        The surviving runtime program contains only real, runtime work.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">12.1 Compile-time constants</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">inline fin</code> declares a value computed at compile
        time. References to it are replaced by the value, and the declaration disappears from the
        final program.
      </p>
      <CodeBlock>{`func main() {
    inline fin SIZE = 8
    inline fin AREA = 8 * 8
    println(SIZE)      // 8
    println(AREA)      // 64  (computed at compile time)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">12.2 Conditional compilation</h3>
      <p className="mt-2 text-az-35">
        A top-level <code className="text-az-primary">deepinline if</code> on a compile-time
        condition includes or excludes declarations. The untaken branch is removed entirely — it is
        not even type-checked.
      </p>
      <CodeBlock>{`inline fin DEBUG = true

deepinline if DEBUG {
    func debugBanner() {
        println("== debug mode ==")
    }
}

func main() {
    debugBanner()      // only present because DEBUG is true
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">12.3 inline blocks</h3>
      <p className="mt-2 text-az-35">
        An <code className="text-az-primary">inline {'{ }'}</code> block makes everything inside it
        compile-time. <code className="text-az-primary">deepinline</code> does the same recursively,
        so nested declarations and conditionals are also evaluated at compile time.
      </p>
      <CodeBlock>{`func main() {
    inline {
        fin GREETING = "hello"
        println(GREETING)        // survives as println("hello")
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">12.4 Inline functions</h3>
      <p className="mt-2 text-az-35">
        An <code className="text-az-primary">inline func</code> is not emitted on its own. Instead,
        its body is substituted directly at every call site.
      </p>
      <CodeBlock>{`inline func double(x: Int): Int {
    return x * 2
}

func main() {
    println(double(21))     // 42  (call replaced by the body)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">12.5 Escaping back to runtime</h3>
      <p className="mt-2 text-az-35">
        Inside a compile-time context, <code className="text-az-primary">noinline</code> marks a
        statement as runtime, escaping back out of compile-time evaluation.
      </p>
      <CodeBlock>{`func main() {
    deepinline {
        fin LIMIT = 10
        if LIMIT > 5 {
            noinline println("limit exceeded")   // emitted as runtime code
        }
    }
}`}</CodeBlock>
    </Section>
  )
}
