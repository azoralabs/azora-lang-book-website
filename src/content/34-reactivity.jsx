import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Reactivity() {
  return (
    <Section id="reactivity" title="34. Reactivity & Components">
      <p className="mt-2 text-az-35">
        Azora ships a reactive model for building UIs and other state-driven programs. Three
        keywords form the core: <code className="text-az-primary">rem</code> declares reactive state,
        <code className="text-az-primary">effect {`{ }`}</code> runs a side effect, and{' '}
        <code className="text-az-primary">view</code> declares a component.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">34.1 Reactive state with rem</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">rem</code> declares a reactive variable — read and assign it
        like an ordinary <code className="text-az-primary">var</code>.
      </p>
      <CodeBlock>{`func main() {
    rem count: Int = 0
    println(count)        // 0
    count = 42
    println(count)        // 42
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">34.2 Side effects</h3>
      <p className="mt-2 text-az-35">
        An <code className="text-az-primary">effect {`{ }`}</code> block runs its body once
        immediately. (Automatic re-runs when the state it reads changes are future work; today it
        matches a run-once semantic.)
      </p>
      <CodeBlock>{`func main() {
    rem msg: String = "hello"
    effect {
        println(msg)      // hello
    }
    println("done")       // done
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">34.3 Components with view</h3>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">view</code> declares a reactive component — lowered like a
        function and callable from code. Components compose with reactive state to describe a UI; a
        rendering backend (web, Compose) turns the tree into pixels.
      </p>
      <CodeBlock>{`view Greet(name: String) {
    println("Hello, " + name + "!")
}

func main() {
    Greet("World")        // Hello, World!
}`}</CodeBlock>
    </Section>
  )
}
