import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Decorators() {
  return (
    <Section id="decorators" title="Decorators">
      <p>
        Decorators are compile-time metadata annotations processed by the preprocessor. They attach
        structured information to declarations without affecting runtime behavior. All decorator queries
        are resolved during preprocessing with zero runtime overhead.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Declaring Decorators</h3>
      <p>
        Declare with the <code className="text-az-primary">deco</code> keyword. A decorator with no fields is
        a <em>marker decorator</em>. A decorator with fields carries structured metadata.
      </p>
      <CodeBlock>{`deco Serializable               // marker decorator (no fields)

deco Range {                    // decorator with fields
    min: Int
    max: Int
}

deco Label {
    text: String
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Applying Decorators</h3>
      <p>
        Prefix declarations with <code className="text-az-primary">@</code> followed by the decorator name.
        Marker decorators need no arguments. Field decorators use named-argument syntax. Multiple
        decorators can be stacked on the same declaration.
      </p>
      <CodeBlock>{`@Serializable
var health: Int = 50

@Range(min = 0, max = 100)
var health: Int = 50

@Serializable
@Range(min = 10, max = 200)
var mana: Int = 100

@Pure
func add(a: Int, b: Int) { return a + b }

@Entity
pack Player {
    name: String
    health: Int
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Querying at Compile Time</h3>
      <p>
        Use <code className="text-az-primary">hasDeco(target, DecoratorName)</code> to check for a decorator
        and <code className="text-az-primary">getDeco(target, DecoratorName, "fieldName")</code> to retrieve
        field values. Both are used inside <code className="text-az-primary">inline if</code> blocks, which
        conditionally include code at compile time.
      </p>
      <CodeBlock>{`inline if hasDeco(health, Serializable) {
    var isSerialized: Bool = true
}

inline if hasDeco(health, Range) {
    var healthMin: Int = getDeco(health, Range, "min")
    var healthMax: Int = getDeco(health, Range, "max")
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">System Decorators</h3>
      <p>
        Built-in decorators that control compiler behavior.
        <code className="text-az-primary"> @file:script(hooks = true)</code> enables the hook system for
        a file. <code className="text-az-primary">@enforceNumFields</code> validates field counts in packs
        (useful for variadic generic packs).
      </p>
      <CodeBlock>{`@file:script(hooks = true)

@enforceNumFields
pack Tuple<T...> { ... }`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: <code className="text-az-primary">@file:script</code> is placed at the very top of a file,
        before the package declaration.
      </p>
    </Section>
  )
}
