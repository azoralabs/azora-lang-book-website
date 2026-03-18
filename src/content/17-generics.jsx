import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Generics() {
  return (
    <Section id="generics" title="Generics">
      <p>
        Azora uses monomorphization for generics. Generic types and functions are expanded into
        specialized versions at compile time by the preprocessor. No type erasure, no boxing, no
        virtual dispatch. The generated code is identical to hand-written type-specific code.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Generic Packs</h3>
      <p>
        Packs can be parameterized with one or more type parameters. The preprocessor generates a
        specialized pack for each concrete instantiation.
      </p>
      <CodeBlock>{`pack Box<T> {
    value: T
}

typealias IntBox = Box<Int>
// Creates: pack IntBox { value: Int }

var p: Pair<Int, String> = Pair<Int, String>(first: 1, second: "hi")`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Generic Functions</h3>
      <p>
        Functions can also be generic. Two equivalent syntaxes are supported: type parameters after
        the function name or before it.
      </p>
      <CodeBlock>{`// Type params after name:
func identity<T>(x: T): T = x

// Type params before name:
func<T> add(a: T, b: T): T {
    return a + b
}`}</CodeBlock>

      <p>
        Calling <code className="text-az-primary">add(5, 7)</code> generates <code className="text-az-primary">add__Int</code> with
        all <code className="text-az-primary">T</code> replaced by <code className="text-az-primary">Int</code>. Each
        unique type combination produces a separate specialization.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Type Inference</h3>
      <p>
        You often do not need to specify type arguments explicitly. The compiler deduces concrete
        types from the values you pass.
      </p>
      <CodeBlock>{`fin result = add(5, 7)            // inferred as add<Int>
var p = Pair(1, "hello")          // inferred as Pair<Int, String>`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">typealias</h3>
      <p>
        The <code className="text-az-primary">typealias</code> keyword creates a named alias for a specific
        generic instantiation, triggering expansion by the preprocessor.
      </p>
      <CodeBlock>{`typealias Vec3 = Vector<Real, 3>`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Default Value Expansion</h3>
      <p>
        When <code className="text-az-primary">_</code> is used as a default in a generic context, it expands
        to the zero value of the concrete type:
      </p>
      <CodeBlock>{`pack Box<T> { value: T = _ }
typealias IntBox = Box<Int>       // value: Int = 0
typealias StringBox = Box<String> // value: String = ""`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Nested Generics</h3>
      <p>
        Generic types can be nested. The preprocessor expands them recursively.
      </p>
      <CodeBlock>{`var x: Box<Pair<Int, Bool>> = Box<Pair<Int, Bool>>(
    value: Pair<Int, Bool>(first: 1, second: true)
)
// Creates: pack Pair__Int__Bool and pack Box__Pair__Int__Bool`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Compile-Time Variable Substitution</h3>
      <p>
        Compile-time variables (prefixed with <code className="text-az-primary">$</code>) can be used as generic
        arguments alongside types, enabling parameterization by values such as array sizes.
      </p>
      <CodeBlock>{`fin $size = 4
pack Arr<T, N> { data: T[N] }
typealias Vec4 = Arr<Real, $size>
// Creates: pack Vec4 { data: Real[4] }`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: Use <code className="text-az-primary">typealias</code> generously to give meaningful names to
        generic instantiations. Names like <code className="text-az-primary">Vec3</code> and
        <code className="text-az-primary"> IntBox</code> are far more readable than their fully parameterized forms.
      </p>
    </Section>
  )
}
