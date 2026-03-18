import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function SpecsTraits() {
  return (
    <Section id="specs-traits" title="Specs & Traits">
      <p>
        Specs are Azora&rsquo;s trait system, providing compile-time type constraints for generics.
        A spec is a label that you attach to types to indicate they belong to a particular category.
        The preprocessor uses these labels to validate generic instantiations before generating code.
        Specs are erased from the final output and have zero runtime cost.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Spec Declaration</h3>
      <p>
        Declare a spec with the <code className="text-az-primary">spec</code> keyword. Unlike interfaces in
        other languages, Azora specs do not list method signatures. They are pure markers.
      </p>
      <CodeBlock>{`spec Numeric`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Implementing a Spec</h3>
      <p>
        Tag a type with a spec using <code className="text-az-primary">impl ... for</code>. This is purely
        declarative and requires no method bodies.
      </p>
      <CodeBlock>{`impl Numeric for Int
impl Numeric for Real`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Where Constraints</h3>
      <p>
        Attach <code className="text-az-primary">where</code> clauses to generic functions or packs to require
        that type parameters implement specific specs. Multiple constraints are separated by commas.
      </p>
      <CodeBlock>{`func<T1, T2> add(a: T1, b: T2): T1
where T1: Numeric, T2: Numeric {
    return a + b
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Constraint Violations</h3>
      <p>If a type does not implement the required spec, the preprocessor reports an error at the call site:</p>
      <CodeBlock>{`var r = add<String, Int>("hello", 5)
// ERROR: String does not implement Numeric`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Comparison with Interfaces</h3>
      <p>
        Specs differ from interfaces in Java, Go, or C#. Interfaces define required methods and enable
        runtime polymorphism via virtual dispatch. Specs are compile-time-only markers with no method
        requirements and no runtime representation. If you need runtime polymorphism, use slots (variant
        types) and pattern matching instead.
      </p>

      <p className="mt-4 text-sm text-az-50">
        Tip: Specs work with <code className="text-az-primary">where each</code> in variadic
        generics. <code className="text-az-primary">where each T: Numeric</code> ensures every type in
        the pack satisfies the constraint individually.
      </p>
    </Section>
  )
}
