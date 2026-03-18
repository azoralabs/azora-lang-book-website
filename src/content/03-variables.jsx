import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Variables() {
  return (
    <Section id="variables" title="Variables">
      <p className="mt-2 text-az-35">
        Azora provides two keywords for declaring variables: <code className="text-az-primary">var</code> for
        mutable bindings and <code className="text-az-primary">fin</code> for immutable ones.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Mutable Variables (<code className="text-az-primary">var</code>)</h3>
      <p className="mt-4 text-az-35">
        A <code className="text-az-primary">var</code> variable can be reassigned at any point after declaration.
      </p>

      <CodeBlock>{`var x = 42           // type inferred as Int
var y: Int = 5        // explicit type annotation
var z: Int = _        // zero-value default (0 for Int)
var s: String = "hi"  // String variable`}</CodeBlock>

      <p className="mt-4 text-az-50">
        <strong>Tip:</strong> Let the compiler infer types when the initializer makes the type
        obvious (<code className="text-az-primary">var name = &quot;Alice&quot;</code>). Use explicit
        annotations when the type might be ambiguous or when declaring nullable types.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Immutable Variables (<code className="text-az-primary">fin</code>)</h3>
      <p className="mt-4 text-az-35">
        A <code className="text-az-primary">fin</code> binding cannot be reassigned after initialization. The
        compiler enforces this and will error on any attempt to reassign. Similar
        to <code className="text-az-primary">val</code> in Kotlin
        or <code className="text-az-primary">let</code> in Swift.
      </p>

      <CodeBlock>{`fin x = 10            // immutable, cannot reassign
fin pi: Real = 3.14   // explicit type`}</CodeBlock>

      <p className="mt-4 text-az-50">
        <strong>Tip:</strong> Prefer <code className="text-az-primary">fin</code> by default. Only
        use <code className="text-az-primary">var</code> when you genuinely need reassignment.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Type Inference</h3>
      <p className="mt-4 text-az-35">
        The compiler determines a variable's type from its initializer. This works for all primitives, collections,
        and generic expressions. Azora is fully statically typed: once inferred, the type is fixed.
      </p>

      <CodeBlock>{`var count = 10         // Int
var ratio = 0.75       // Real
var active = true      // Bool
var label = "score"    // String
fin items = [1, 2, 3]  // Array<Int>`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Default Zero Values (<code className="text-az-primary">_</code>)</h3>
      <p className="mt-4 text-az-35">
        The underscore <code className="text-az-primary">_</code> means "use the zero value for this type."
        It requires an explicit type annotation. Zero values
        are: <code className="text-az-primary">0</code> for integers, <code className="text-az-primary">0.0</code> for
        reals, <code className="text-az-primary">false</code> for booleans,
        and <code className="text-az-primary">&quot;&quot;</code> for strings.
      </p>

      <CodeBlock>{`var x: Int = _      // x = 0
var r: Real = _     // r = 0.0
var s: String = _   // s = ""
var b: Bool = _     // b = false

var y = _           // ERROR: requires type annotation`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Every variable in Azora is always initialized, either with an explicit value or with the type's zero
        value. There is no undefined behavior from reading uninitialized variables.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Nullable Variables</h3>
      <p className="mt-4 text-az-35">
        By default, variables cannot be <code className="text-az-primary">null</code>. To allow null, add
        a question mark to the type. <code className="text-az-primary">Int?</code> is distinct
        from <code className="text-az-primary">Int</code>: the compiler tracks this and requires you to handle
        the null case.
      </p>

      <CodeBlock>{`var x: Int? = null    // nullable, defaults to null`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Azora provides null-safe operators including <code className="text-az-primary">??</code> (null
        coalescing), <code className="text-az-primary">?=</code> (null-coalescing assignment), and null-safe
        compound operators like <code className="text-az-primary">?+=</code>. These are covered in the
        Nullable Types chapter.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Exposed Variables</h3>
      <p className="mt-4 text-az-35">
        All declarations are file-private by default. The <code className="text-az-primary">expose</code> keyword
        makes a declaration visible to other files in the same package and to importers.
      </p>

      <CodeBlock>{`expose var health: Int = 100`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Naming Conventions</h3>
      <p className="mt-4 text-az-35">
        Variables and functions use <code className="text-az-primary">camelCase</code>. Type names (packs, enums,
        specs) use <code className="text-az-primary">PascalCase</code>. These conventions are not compiler-enforced
        but are standard across the ecosystem.
      </p>
    </Section>
  )
}
