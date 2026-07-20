import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function BitwiseOps() {
  return (
    <Section id="bitwise-ops" title="23. Bitwise Operators">
      <p className="mt-2 text-az-35">
        Integer types support the usual bitwise operators. They work on{' '}
        <code className="text-az-primary">Int</code>, <code className="text-az-primary">Long</code>,
        and the sized unsigned variants.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">23.1 The operators</h3>
      <CodeBlock>{`func main() {
    println(0b1100 & 0b1010)   // 8   (AND)
    println(0b1100 | 0b1010)   // 14  (OR)
    println(0b1100 ^ 0b1010)   // 6   (XOR)
    println(~0b0)              // -1  (NOT)
    println(1 << 4)            // 16  (left shift)
    println(256 >> 2)          // 64  (right shift)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">23.2 Flags and masks</h3>
      <p className="mt-2 text-az-35">
        Combine flags with OR, test them with AND. Binary literals (<code className="text-az-primary">0b...</code>)
        make intent obvious.
      </p>
      <CodeBlock>{`var READ  = 0b0001
var WRITE = 0b0010
var EXEC  = 0b0100

func main() {
    var perms = READ | WRITE
    println(perms & READ != 0)   // true - has READ
    println(perms & EXEC != 0)   // false - no EXEC
}`}</CodeBlock>
    </Section>
  )
}
