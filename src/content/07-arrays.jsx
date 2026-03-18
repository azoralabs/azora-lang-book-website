import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Arrays() {
  return (
    <Section id="arrays" title="Arrays">
      <p>
        Arrays are ordered, zero-indexed, mutable (when <code className="text-az-primary">var</code>) collections
        of a single element type. They carry their length at runtime and support structural equality.
      </p>

      <h3 className="text-lg font-semibold mt-2 mb-2 text-az-25">Array Literals</h3>
      <CodeBlock>{`var x: Int[] = [1, 2, 3]           // typed array
var y: Int[2] = [1, 2]             // sized array (enforced at runtime)
var z: Int?[] = [1, null, 2]       // nullable element array
var a: Int[] = []                  // empty array
var s: String[] = ["hello", "world"]`}</CodeBlock>

      <p className="mt-4">
        <code className="text-az-primary">Int[]</code> declares an unsized array.
        <code className="text-az-primary"> Int[2]</code> enforces a fixed length at runtime.
        <code className="text-az-primary"> Int?[]</code> allows nullable elements (the nullability applies to elements,
        not the array itself).
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Index Access</h3>
      <CodeBlock>{`var a: Int[] = [10, 20, 30]
a[0]           // 10
a[i + 1]       // expression index`}</CodeBlock>

      <p className="mt-4">
        Out-of-bounds access is a runtime error (or a compile-time error when the preprocessor can detect it).
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Element Mutation</h3>
      <CodeBlock>{`var x: Int[] = [1, 2, 3]
x[0] = 10          // direct assignment
x[0] += 5          // compound assignment
x[1] -= 3
x[2] *= 2`}</CodeBlock>

      <p className="mt-4">
        Arrays declared with <code className="text-az-primary">fin</code> are immutable:
      </p>
      <CodeBlock>{`fin z: Int[] = [1, 2, 3]
z[0] = 10          // RUNTIME ERROR: immutable`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Array Properties</h3>
      <CodeBlock>{`a.length           // number of elements`}</CodeBlock>

      <p className="mt-4">
        When array size is known at compile time, the preprocessor folds <code className="text-az-primary">.length</code> into
        a constant.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Iteration</h3>
      <CodeBlock>{`for item in a {
    println(item)
}`}</CodeBlock>

      <p className="mt-4">
        The <code className="text-az-primary">for/else</code> pattern handles empty arrays: the
        <code className="text-az-primary"> else</code> branch executes only when the array has no elements.
        For indexed iteration, see the <code className="text-az-primary">with</code> clause in Control Flow.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Array Equality</h3>
      <CodeBlock>{`[1, 2, 3] == [1, 2, 3]    // true (structural equality)
[1, 2] != [1, 2, 3]       // true (different length)`}</CodeBlock>

      <p className="mt-4">
        Two arrays are equal if they have the same length and all corresponding elements are equal. Different
        lengths short-circuit to <code className="text-az-primary">false</code> immediately.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Boolean Coercion</h3>
      <CodeBlock>{`var a: Int[] = [1]
assert a           // non-empty is truthy

var b: Int[] = []
assert !b          // empty is falsy`}</CodeBlock>

      <p className="mt-4">
        Non-empty arrays are truthy, empty arrays are falsy. Prefer <code className="text-az-primary">if a</code> over
        <code className="text-az-primary"> if a.length &gt; 0</code>.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Compile-Time Checks</h3>
      <p className="mt-4">
        When array size is statically known, the preprocessor performs bounds checking and length folding automatically.
      </p>
      <CodeBlock>{`var a: Int[] = [1, 2, 3]
println(a[3])        // PREPROCESSOR ERROR: out of bounds
println(a.length)    // preprocessed to: println(3)`}</CodeBlock>

      <p className="mt-4 text-az-50">
        <strong>Tip:</strong> Use sized arrays (e.g., <code className="text-az-primary">Int[3]</code>) when the
        element count is known. This enables the preprocessor to catch more errors and apply more optimizations.
      </p>
    </Section>
  )
}
