import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Enums() {
  return (
    <Section id="enums" title="Enums">
      <p>
        Enums represent a fixed set of named values. Azora supports simple enums (plain labels) and
        parameterized enums (where every variant shares the same fields with different values). For
        variants that carry <em>different</em> fields, use{' '}
        <code className="text-az-primary">slot</code> instead.
      </p>

      <h3 className="text-lg font-semibold mt-2 mb-2 text-az-25">Simple Enums</h3>
      <p>
        A list of named variants with no associated data:
      </p>
      <CodeBlock>{`enum Color {
    Red
    Green
    Blue
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Parameterized Enums</h3>
      <p>
        Fields are declared once at the enum level. Every variant provides values for those fields:
      </p>
      <CodeBlock>{`enum Color(r: Int, g: Int, b: Int) {
    Red(255, 0, 0)
    Green(0, 255, 0)
    Blue(0, 0, 255)
}

enum Direction(dx: Int, dy: Int) {
    Up(0, 1)
    Down(0, -1)
    Left(-1, 0)
    Right(1, 0)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Usage</h3>
      <p>
        Reference variants with dot notation. Access parameterized fields the same way as packs:
      </p>
      <CodeBlock>{`var c = Color.Red
assert c.r == 255
assert c.g == 0`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Equality</h3>
      <p>
        Two enum values are equal if they are the same variant:
      </p>
      <CodeBlock>{`Direction.Up == Direction.Up     // true
Direction.Up != Direction.Down   // true`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">When with Dot Shorthand</h3>
      <p>
        Inside a <code className="text-az-primary">when</code> block, use{' '}
        <code className="text-az-primary">.Variant</code> instead of{' '}
        <code className="text-az-primary">EnumName.Variant</code>. The compiler infers the type from
        the subject. Works as an expression:
      </p>
      <CodeBlock>{`var name = when c {
    .Red -> "red"
    .Green -> "green"
    .Blue -> "blue"
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Dot Shorthand Assignment</h3>
      <p>
        When a variable already has a known enum type, use the dot shorthand on the right side of
        assignment:
      </p>
      <CodeBlock>{`var s: Size = .Medium`}</CodeBlock>
    </Section>
  )
}
