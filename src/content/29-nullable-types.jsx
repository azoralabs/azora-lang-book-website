import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Table from '../components/Table.jsx'

export default function NullableTypes() {
  return (
    <Section id="nullable-types" title="Nullable Types">
      <p>
        By default, no type in Azora can hold <code className="text-az-primary">null</code>. Append{' '}
        <code className="text-az-primary">?</code> to a type to make it nullable. This is enforced at
        compile time. A family of null-aware operators lets you unwrap, coalesce, and transform nullable
        values concisely.
      </p>

      <h3 className="text-lg font-semibold mt-2 mb-2 text-az-25">Declaration</h3>
      <p>
        Append <code className="text-az-primary">?</code> to any type. Works with primitives, structs,
        enums, and generics.
      </p>
      <CodeBlock>{`var x: Int? = null
var s: String? = null
var b: Bool? = null
var r: Real? = null`}</CodeBlock>
      <p>
        Nullable variables can also start with a concrete value:
      </p>
      <CodeBlock>{`var name: String? = "Azora"   // starts non-null, but could become null later
var count: Int? = 42          // nullable Int with an initial value`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Null Equality</h3>
      <p>
        Compare nullable values to <code className="text-az-primary">null</code> with{' '}
        <code className="text-az-primary">==</code> and <code className="text-az-primary">!=</code>:
      </p>
      <CodeBlock>{`var x: Int? = null
assert x == null

var y: Int? = 5
assert y != null`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Null-Coalescing (<code className="text-az-primary">??</code>)</h3>
      <p>
        Provides a fallback when the left side is null. The right side is evaluated lazily. The result
        type is always non-nullable. Supports chaining.
      </p>
      <CodeBlock>{`var y: Int = x ?? 42       // if x is null, use 42
var c: Int = a ?? b ?? 99  // chaining`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Null-Coalescing Assignment (<code className="text-az-primary">?=</code>)</h3>
      <p>
        Assigns a value only if the variable is currently null. Useful for lazy initialisation.
      </p>
      <CodeBlock>{`var x: Int? = null
x ?= 10            // assigns 10 (was null)
x ?= 20            // skips (already non-null, still 10)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Null-Safe Compound Operators</h3>
      <p>All null-safe operators perform their operation only when the variable is non-null.
        When null, they are complete no-ops.</p>
      <Table
        headers={['Operator', 'Meaning']}
        rows={[
          [<code>?+=</code>, 'Add if non-null'],
          [<code>?-=</code>, 'Subtract if non-null'],
          [<code>?*=</code>, 'Multiply if non-null'],
          [<code>?/=</code>, 'Divide if non-null'],
          [<code>?%=</code>, 'Modulo if non-null'],
          [<code>?++</code>, 'Increment if non-null'],
          [<code>?--</code>, 'Decrement if non-null'],
        ]}
      />
      <p className="mt-4">Full lifecycle example:</p>
      <CodeBlock>{`var x: Int? = null
x ?+= 5         // no-op (still null)
x ?= 10         // now x == 10
x ?+= 5         // now x == 15
x ?++            // now x == 16
x ?--            // now x == 15
x ?*= 2         // now x == 30
x ?/= 3         // now x == 10
x ?%= 3         // now x == 1
x ?-= 1         // now x == 0`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: Use non-nullable types by default. Only introduce nullability when absence is a meaningful
        part of the domain.
      </p>
    </Section>
  )
}
