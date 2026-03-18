import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function ImplBlocks() {
  return (
    <Section id="impl-blocks" title="Impl Blocks">
      <p>
        Impl blocks add methods to types, cleanly separating data definition from behavior. Methods
        can access the pack's fields directly by name without a{' '}
        <code className="text-az-primary">self</code> or{' '}
        <code className="text-az-primary">this</code> prefix.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Declaration</h3>
      <p>
        Use <code className="text-az-primary">impl TypeName</code> with standard{' '}
        <code className="text-az-primary">func</code> declarations inside. Fields are in scope
        automatically. You can have multiple impl blocks for the same type.
      </p>
      <CodeBlock>{`pack Rect {
    width: Real
    height: Real
}

impl Rect {
    func area(): Real = width * height
    func perimeter(): Real = 2.0 * (width + height)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Usage</h3>
      <p>
        Call methods with dot notation on an instance:
      </p>
      <CodeBlock>{`var r = Rect(3.0, 4.0)
assert r.area() == 12.0
assert r.perimeter() == 14.0`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Impl with Generics</h3>
      <p>
        Impl blocks work with generic packs. The type parameter carries through to method
        signatures. A <code className="text-az-primary">typealias</code> generates a concrete
        specialization of both the pack and its impl block (monomorphization, no type erasure).
      </p>
      <CodeBlock>{`pack Box<T> {
    value: T
}

impl Box<T> {
    func get(): T = value
}

typealias IntBox = Box<Int>
// Generates: impl IntBox { func get(): Int = value }`}</CodeBlock>
    </Section>
  )
}
