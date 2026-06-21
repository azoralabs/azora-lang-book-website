import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Generics() {
  return (
    <Section id="generics" title="20. Generics">
      <p className="mt-2 text-az-35">
        Generic functions and structs use type parameters. The compiler infers the type arguments
        from how you call — no explicit annotation needed at the call site.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">20.1 Generic functions</h3>
      <p className="mt-2 text-az-35">
        Declare a type parameter in angle brackets after <code className="text-az-primary">func</code>.
        The type parameter can be used in parameters and the return type. The compiler infers it
        from the arguments at each call site.
      </p>
      <CodeBlock>{`func<T> identity(x: T): T {
    return x
}

func<T, U> first(a: T, b: U): T {
    return a
}

func main() {
    println(identity(42))         // 42 — T inferred as Int
    println(identity("hello"))    // hello — T inferred as String
    println(first(10, "world"))   // 10 — T=Int, U=String
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">20.2 Generic structs</h3>
      <p className="mt-2 text-az-35">
        Generic <code className="text-az-primary">pack</code> declarations carry type parameters
        after the name. Fields can reference them. Construction and field access work as usual.
      </p>
      <CodeBlock>{`pack Box<T> {
    var value: T
}

func main() {
    var a = Box(42)
    println(a.value)       // 42

    var b = Box("hello")
    println(b.value)       // hello
}`}</CodeBlock>
    </Section>
  )
}
