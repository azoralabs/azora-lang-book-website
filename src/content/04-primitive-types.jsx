import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Table from '../components/Table.jsx'

export default function PrimitiveTypes() {
  return (
    <Section id="primitive-types" title="Primitive Types">
      <p className="mt-2 text-az-35">
        Azora has a rich set of primitive types: 15 numeric types covering integers, unsigned integers, and
        floating-point numbers, plus <code className="text-az-primary">Bool</code>,
        <code className="text-az-primary"> String</code>, and <code className="text-az-primary">Unit</code>.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Integer Types</h3>
      <Table
        headers={['Type', 'Size', 'Signed', 'Suffix', 'Default']}
        rows={[
          [<code className="text-az-primary">Byte</code>, '8-bit', 'Yes', <code>b</code>, <code>0</code>],
          [<code className="text-az-primary">UByte</code>, '8-bit', 'No', <code>ub</code>, <code>0</code>],
          [<code className="text-az-primary">Short</code>, '16-bit', 'Yes', <code>s</code>, <code>0</code>],
          [<code className="text-az-primary">UShort</code>, '16-bit', 'No', <code>us</code>, <code>0</code>],
          [<code className="text-az-primary">Int</code>, '32-bit', 'Yes', '(none)', <code>0</code>],
          [<code className="text-az-primary">UInt</code>, '32-bit', 'No', <code>u</code>, <code>0</code>],
          [<code className="text-az-primary">Long</code>, '64-bit', 'Yes', <code>L</code>, <code>0</code>],
          [<code className="text-az-primary">ULong</code>, '64-bit', 'No', <code>uL</code>, <code>0</code>],
          [<code className="text-az-primary">Cent</code>, '128-bit', 'Yes', <code>c</code>, <code>0</code>],
          [<code className="text-az-primary">UCent</code>, '128-bit', 'No', <code>uc</code>, <code>0</code>],
          [<code className="text-az-primary">Size</code>, 'Platform', 'Yes', <code>sz</code>, <code>0</code>],
          [<code className="text-az-primary">USize</code>, 'Platform', 'No', <code>usz</code>, <code>0</code>],
        ]}
      />

      <p className="mt-4 text-az-35">
        <code className="text-az-primary">Int</code> is 32-bit and is the default integer type. Unsuffixed integer
        literals are inferred as <code className="text-az-primary">Int</code>. <code className="text-az-primary">Long</code> is
        64-bit. <code className="text-az-primary">Size</code> and <code className="text-az-primary">USize</code> match
        the platform's native pointer width.
      </p>

      <CodeBlock>{`var a = 42              // Int (32-bit)
var b = 42L             // Long (64-bit)
var c = 42b             // Byte
var d = 42u             // UInt
var e = 42sz            // Size
var f = 100c            // Cent (128-bit)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Floating-Point Types</h3>
      <Table
        headers={['Type', 'Size', 'Suffix', 'Default']}
        rows={[
          [<code className="text-az-primary">Float</code>, '32-bit', <code>f</code>, <code>0.0</code>],
          [<code className="text-az-primary">Real</code>, '64-bit', '(none)', <code>0.0</code>],
          [<code className="text-az-primary">Decimal</code>, 'Arbitrary precision', <code>D</code>, <code>0.0</code>],
        ]}
      />

      <p className="mt-4 text-az-35">
        <code className="text-az-primary">Real</code> (64-bit double) is the default floating-point type. Unsuffixed
        decimal literals are inferred as <code className="text-az-primary">Real</code>.
        <code className="text-az-primary"> Float</code> is 32-bit single precision.
        <code className="text-az-primary"> Decimal</code> provides arbitrary precision for financial or scientific use.
      </p>

      <CodeBlock>{`var x = 3.14            // Real (64-bit)
var y = 3.14f           // Float (32-bit)
var z = 1.5D            // Decimal`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Literal Bases and Separators</h3>
      <p className="mt-4 text-az-35">
        Numeric literals support hexadecimal, octal, and binary bases, plus underscore separators for readability.
      </p>

      <CodeBlock>{`var hex = 0xFF          // 255
var oct = 0o77          // 63
var bin = 0b1010        // 10
var big = 1_000_000     // underscores are ignored`}</CodeBlock>

      <p className="mt-4 text-az-50">
        <strong>Note:</strong> The suffixes <code className="text-az-primary">b</code>,
        <code className="text-az-primary"> c</code>, and <code className="text-az-primary">f</code> are not
        recognized as type suffixes in hex literals because they are valid hex digits.
        Use explicit type annotations instead: <code className="text-az-primary">var x: Byte = 0xFF</code>.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Type Promotion</h3>
      <p className="mt-4 text-az-35">
        When mixing numeric types in an expression, Azora promotes automatically using these rules: float wins
        over integer, higher bitwidth wins, and unsigned wins at the same width. Overflow wraps via narrowing
        casts.
      </p>

      <CodeBlock>{`2 + 1.5         // Real (Int promoted to Real)
42b + 100       // Int (Byte promoted to Int)
5u + 5          // UInt (unsigned wins at same width)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Bool</h3>
      <p className="mt-4 text-az-35">
        Two values: <code className="text-az-primary">true</code> and <code className="text-az-primary">false</code>.
        Used in conditions, flags, and logical expressions. Azora does not support "truthy" or "falsy" coercion
        for non-boolean types in boolean contexts (except arrays and strings, which have their own coercion rules).
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">String</h3>
      <p className="mt-4 text-az-35">
        Immutable UTF-8 encoded text. The default zero value is <code className="text-az-primary">&quot;&quot;</code>,
        not <code className="text-az-primary">null</code>. Use <code className="text-az-primary">String?</code> for
        nullable strings. See the Strings chapter for details on interpolation, escapes, and operations.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Unit</h3>
      <p className="mt-4 text-az-35">
        Represents the absence of a meaningful value, like <code className="text-az-primary">void</code> in
        C/Java. Functions with no return value implicitly return <code className="text-az-primary">Unit</code>.
        Unlike <code className="text-az-primary">void</code>, it is a real type that can appear in generics
        (e.g., <code className="text-az-primary">Box&lt;Unit&gt;</code>).
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Type Properties</h3>
      <p className="mt-4 text-az-35">
        Every value exposes <code className="text-az-primary">.typename</code>. Numeric types also
        expose <code className="text-az-primary">.min</code> and <code className="text-az-primary">.max</code>.
      </p>

      <CodeBlock>{`var a: Int = 4
assert a.typename == "Int"
assert a.min == -2_147_483_648
assert a.max == 2_147_483_647`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Type Conversions</h3>
      <p className="mt-4 text-az-35">
        Azora does not perform implicit type coercion (except numeric promotion). Use explicit conversion functions.
        Note that <code className="text-az-primary">toInt()</code> truncates toward zero, it does not round.
      </p>

      <CodeBlock>{`toString(42)     // "42"
toInt(3.9)       // 3 (truncates)
toReal(3)        // 3.0`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Casting (<code className="text-az-primary">as</code>)</h3>
      <p className="mt-4 text-az-35">
        The <code className="text-az-primary">as</code> keyword performs type casts. For primitives, it behaves
        like the conversion functions. For numeric-to-boolean: zero
        is <code className="text-az-primary">false</code>, non-zero is <code className="text-az-primary">true</code>.
      </p>

      <CodeBlock>{`var x: Int = 3.14 as Int        // 3 (truncates)
var s: String = 42 as String    // "42"
var r: Real = 42 as Real        // 42.0
var b: Bool = 1 as Bool         // true
var b2: Bool = 0 as Bool        // false`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Type Checking (<code className="text-az-primary">is</code>)</h3>
      <p className="mt-4 text-az-35">
        The <code className="text-az-primary">is</code> keyword checks a value's type at runtime, returning
        a <code className="text-az-primary">Bool</code>. The negated form <code className="text-az-primary">is!</code> checks
        that a value does <em>not</em> belong to the given type.
      </p>

      <CodeBlock>{`var x = 5
if x is Int { println("it's an Int") }
if x is! String { println("not a String") }`}</CodeBlock>

      <p className="mt-4 text-az-50">
        <strong>Note:</strong> Numeric type names (Byte, Short, Long, Float, etc.) are not language keywords.
        They are regular identifiers recognized as types in type annotation context.
      </p>
    </Section>
  )
}
