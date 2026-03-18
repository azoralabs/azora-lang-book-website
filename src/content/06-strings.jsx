import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Strings() {
  return (
    <Section id="strings" title="Strings">
      <p>
        Strings in Azora are immutable, UTF-8 encoded values. There is no separate character type; a single
        character is simply a <code className="text-az-primary">String</code> of length one.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">String Literals</h3>
      <CodeBlock>{`var s = "hello world"
var empty = ""              // empty string
var zero: String = _        // also empty string`}</CodeBlock>

      <p className="mt-4">
        String values are always immutable. A <code className="text-az-primary">var</code> string variable can
        be reassigned to a different string, but the string content itself cannot be mutated in place.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Escape Sequences</h3>
      <CodeBlock>{`"\\n"     // newline
"\\t"     // tab
"\\\\"     // backslash
"\\""     // double quote
"\\$"     // literal dollar sign (prevents interpolation)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">String Interpolation</h3>
      <p>
        Use <code className="text-az-primary">$variable</code> for simple variable insertion
        and <code className="text-az-primary">{"${expression}"}</code> for arbitrary expressions.
      </p>
      <CodeBlock>{`var name = "world"
println("hello $name")             // hello world
println("result: \${x + 5}")       // result: 15
println("$a + $b = \${a + b}")     // 3 + 4 = 7`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">String Operations</h3>
      <p>
        Concatenation with <code className="text-az-primary">+</code> and repetition
        with <code className="text-az-primary">*</code>:
      </p>
      <CodeBlock>{`// Concatenation
"hello" + " " + "world"    // "hello world"

// Repetition
"ab" * 3                   // "ababab"
3 * "ha"                   // "hahaha"`}</CodeBlock>

      <p className="mt-4">
        Repetition works in either order. A count of zero produces an empty string. Strings use structural
        equality: <code className="text-az-primary">"ab" + "c" == "abc"</code> is <code className="text-az-primary">true</code>.
      </p>
    </Section>
  )
}
