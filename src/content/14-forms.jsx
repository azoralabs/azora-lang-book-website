import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Slots() {
  return (
    <Section id="slots" title="Slots">
      <p>
        Slots are tagged unions (algebraic data types) where each variant can carry different data.
        Use enums when all variants share the same fields; use slots when variants need structurally
        different payloads.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Declaration</h3>
      <p>
        Declared with <code className="text-az-primary">slot</code>. Each variant has a name and
        optional typed fields. Variants with no fields act as simple tags.
      </p>
      <CodeBlock>{`slot Result {
    Success(data: String)
    Error(code: Int)
    Loading                   // empty variant
}

slot Shape {
    Circle(radius: Real)
    Rect(width: Real, height: Real)
    Point
}

slot Option {
    Some(value: Int)
    None
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Construction</h3>
      <p>
        Use dot notation on the slot type name. Pass arguments for variants with fields; omit
        parentheses for empty variants:
      </p>
      <CodeBlock>{`var r1 = Result.Success("hello")
var r2 = Result.Error(404)
var opt = Option.None`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Field Access</h3>
      <p>
        Access variant fields with dot notation. Accessing a field that does not exist on the current
        variant is an error.
      </p>
      <CodeBlock>{`r1.data     // "hello"
r2.code     // 404`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Pattern Matching</h3>
      <p>
        Use <code className="text-az-primary">when</code> to branch on variants. The dot shorthand
        works here just like with enums. <code className="text-az-primary">when</code> can be used
        as an expression:
      </p>
      <CodeBlock>{`var desc = when s {
    .Circle -> "circle"
    .Rect -> "rect"
    .Point -> "point"
}`}</CodeBlock>
    </Section>
  )
}
