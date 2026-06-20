import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Table from '../components/Table.jsx'

export default function PrimitiveTypes() {
  const integerHeaders = ['Type', 'Width', 'Suffix', 'Example']
  const integerRows = [
    ['Byte / UByte', '8-bit', 'b / ub', ['42', '42b', '255ub']],
    ['Short / UShort', '16-bit', 's / us', ['1000s', '5000us']],
    ['Int / UInt', '32-bit (default)', 'u', ['42', '42u']],
    ['Long / ULong', '64-bit', 'L / uL', ['42L', '42uL']],
    ['Cent / UCent', '128-bit', 'c / uc', ['100c', '100uc']],
  ]
  const floatHeaders = ['Type', 'Precision', 'Suffix', 'Example']
  const floatRows = [
    ['Float', '32-bit', 'f', '3.14f'],
    ['Real (default)', '64-bit', '', '3.14'],
    ['Decimal', '128-bit', 'D', '3.14D'],
  ]

  return (
    <Section id="primitive-types" title="4. Primitive Types">
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">4.1 Integers</h3>
      <p className="mt-2 text-az-35">
        Azora has signed and unsigned integers from 8 to 128 bits. An integer literal without a
        suffix is an <code className="text-az-primary">Int</code>.
      </p>
      <Table headers={integerHeaders} rows={integerRows}/>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">4.2 Floating-point numbers</h3>
      <p className="mt-2 text-az-35">
        A real literal without a suffix is a <code className="text-az-primary">Real</code> (64-bit).
      </p>
      <Table headers={floatHeaders} rows={floatRows}/>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">4.3 Literal forms</h3>
      <p className="mt-2 text-az-35">
        Integers support hexadecimal, octal, and binary prefixes, and underscore digit separators.
      </p>
      <CodeBlock>{`func main() {
    println(0xFF)         // 255 (hexadecimal)
    println(0o77)         // 63  (octal)
    println(0b1010)       // 10  (binary)
    println(1_000_000)    // 1000000 (underscores ignored)

    println(3.14)         // Real
    println(1.5e3)        // 1500.0 (scientific)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">4.4 Bool, Char, String, Unit</h3>
      <Table
        headers={['Type', 'Values']}
        rows={[
          [<code key="b" className="text-az-primary">Bool</code>, <code key="v" className="text-az-primary">true</code>, <code key="f" className="text-az-primary">false</code>],
          [<code key="c" className="text-az-primary">Char</code>, 'a single Unicode character: ' + <code key="l" className="text-az-primary">'A'</code>],
          [<code key="s" className="text-az-primary">String</code>, 'text: ' + <code key="l2" className="text-az-primary">"hello"</code>],
          [<code key="u" className="text-az-primary">Unit</code>, 'the absence of a meaningful value (like void)'],
        ]}
      />
      <CodeBlock>{`func main() {
    var active = true
    if active {
        println("active")
    }

    fin grade = 'A'
    println(grade == 'A')     // true  (Char equality)
    println('a' < 'z')        // true  (Char comparison)

    var name = "Azora"
    println(name)             // Azora
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">Unit</code> is the return type of functions that do not
        return a value (it is inferred when a function has no <code className="text-az-primary">return</code>).
      </p>
    </Section>
  )
}
