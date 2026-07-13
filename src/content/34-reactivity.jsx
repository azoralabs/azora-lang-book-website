
import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Reactivity() {
  return (
    <Section id="reactivity" title="34. Reactivity & Components">
      <p className="mt-2 text-az-35">
        Azora 0.0.3 uses three reactive binding keywords: <code className="text-az-primary">mem</code>
        for remembered state, <code className="text-az-primary">rem</code> for saveable/serializable
        remembered state, and <code className="text-az-primary">ret</code> for retained state. They
        currently lower like mutable bindings while the runtime reactivity model grows around them.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">34.1 mem, rem, ret</h3>
      <CodeBlock>{`func main() {
    mem local: Int = 1
    rem saved: Int = 2
    ret kept: Int = 3

    local = 4
    saved = 5
    kept = 6
    println(local + saved + kept)   // 15
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">34.2 Side effects</h3>
      <p className="mt-2 text-az-35">
        An <code className="text-az-primary">effect {`{ }`}</code> block runs its body once
        immediately. Automatic re-runs when tracked state changes are future work.
      </p>
      <CodeBlock>{`func main() {
    mem msg: String = "hello"
    effect {
        println(msg)
    }
    println("done")
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">34.3 Components with view</h3>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">view</code> declares a reactive component — lowered like a
        function and callable from code. Components compose with reactive state to describe a UI; a
        rendering backend turns the tree into pixels.
      </p>
      <CodeBlock>{`view Greet(name: String) {
    println("Hello, " + name + "!")
}

func main() {
    Greet("World")
}`}</CodeBlock>
    </Section>
  )
}
