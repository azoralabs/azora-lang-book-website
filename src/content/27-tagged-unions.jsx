import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function TaggedUnions() {
  return (
    <Section id="tagged-unions" title="27. Tagged Unions (slot)">
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">slot</code> is a tagged union: a value that can be one of
        several named <em>variants</em>, each optionally carrying a payload. Where an{' '}
        <code className="text-az-primary">enum</code> lists plain names, a{' '}
        <code className="text-az-primary">slot</code> lets a variant carry data. They shine for
        modeling choices - option types, results, AST nodes, events.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">27.1 Declaring a slot</h3>
      <p className="mt-2 text-az-35">
        A variant with a type in parentheses carries a payload; a bare variant carries none.
      </p>
      <CodeBlock>{`slot Option {
    Some(Int)
    None
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">27.2 Constructing variants</h3>
      <p className="mt-2 text-az-35">
        Variants are qualified by their slot name: <code className="text-az-primary">Option.Some(42)</code>.
      </p>
      <CodeBlock>{`func main() {
    var o = Option.Some(42)
    var n = Option.None
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">27.3 Matching with destructuring</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">when</code> matches a slot variant and binds its payload to
        names. The compiler checks exhaustiveness - you either cover every variant or supply an{' '}
        <code className="text-az-primary">else</code>.
      </p>
      <CodeBlock>{`slot Option {
    Some(Int)
    None
}

func main() {
    var o = Option.Some(42)
    when o {
        Option.Some(v) -> { println(v) }     // 42
        Option.None    -> { println("nothing") }
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">27.4 Multiple payloads</h3>
      <p className="mt-2 text-az-35">
        A variant may carry several payloads, bound positionally in the match.
      </p>
      <CodeBlock>{`slot Shape {
    Circle(Int)
    Rect(Int, Int)
    Point
}

func main() {
    var s = Shape.Rect(3, 4)
    when s {
        Shape.Circle(r)   -> { println(r) }       // 3
        Shape.Rect(w, h)  -> { println(w + h) }   // 7
        Shape.Point       -> { println("0") }
    }
}`}</CodeBlock>
    </Section>
  )
}
