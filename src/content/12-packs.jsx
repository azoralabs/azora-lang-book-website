import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Packs() {
  return (
    <Section id="packs" title="Packs">
      <p>
        Packs group related data into a named type. They hold fields, support construction, field
        access, and structural equality out of the box. Methods are added separately through{' '}
        <code className="text-az-primary">impl</code> blocks.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Declaration</h3>
      <p>
        Declared with <code className="text-az-primary">pack</code>. Each field has a name, type,
        and optional default. Use <code className="text-az-primary">fin</code> for immutable fields
        and <code className="text-az-primary">var</code> for mutable ones. Fields without a modifier
        default to immutable.
      </p>
      <CodeBlock>{`pack Point {
    x: Real
    y: Real
}

pack Config {
    debug: Bool = false      // default value
    level: Int = 1
}

pack Food {
    fin name: String         // immutable field
    var quantity: Int = 0    // mutable field
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Construction</h3>
      <p>
        Call the pack name like a function. Supports positional and named arguments. Fields with
        defaults can be omitted.
      </p>
      <CodeBlock>{`var p = Point(3.0, 4.0)                   // positional
var r = Rect(height: 10.0, width: 5.0)   // named arguments
var c = Config()                          // all defaults`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Field Access</h3>
      <p>Access fields with dot notation:</p>
      <CodeBlock>{`p.x      // 3.0
p.y      // 4.0`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Field Mutation</h3>
      <p>
        Fields declared with <code className="text-az-primary">var</code> can be reassigned.
        Compound assignment operators work as expected. Reassigning a{' '}
        <code className="text-az-primary">fin</code> field is a compile-time error.
      </p>
      <CodeBlock>{`var f = Food("apple")
f.quantity = 7          // OK: var field
f.quantity += 5         // compound assignment OK
f.name = "banana"       // ERROR: fin field is immutable`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Pack Equality</h3>
      <p>
        Packs use structural equality: two instances are equal if all corresponding fields are equal.
        Nested packs are compared recursively.
      </p>
      <CodeBlock>{`Vec2(1, 2) == Vec2(1, 2)    // true
Vec2(1, 2) != Vec2(3, 4)    // true`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Inferred Field Types</h3>
      <p>
        When a field has a default value, the type annotation can be omitted:
      </p>
      <CodeBlock>{`pack X {
    var a0 = 0          // type inferred from initializer
}`}</CodeBlock>
      <p className="mt-3 text-sm text-az-50">
        Packs work with generics. You can parameterize a pack with type parameters
        like <code className="text-az-primary">{'pack Box<T>'}</code>. See Generics and Impl Blocks
        for details.
      </p>
    </Section>
  )
}
