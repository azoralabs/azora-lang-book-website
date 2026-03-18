import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Table from '../components/Table.jsx'

export default function Operators() {
  return (
    <Section id="operators" title="Operators">
      <p className="mt-2 text-az-35">
        Azora provides operators for arithmetic, comparison, logic, assignment, null handling, ranges, and
        scope resolution.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Operator Precedence (lowest to highest)</h3>
      <Table
        headers={['Precedence', 'Operators', 'Description']}
        rows={[
          ['1', <code>??</code>, 'Null coalescing'],
          ['2', <code>||</code>, 'Logical OR'],
          ['3', <code>&&</code>, 'Logical AND'],
          ['4', <code>== !=</code>, 'Equality'],
          ['5', <code>{'< <= > >='}</code>, 'Comparison'],
          ['6', 'Infix functions', 'User-defined infix operators'],
          ['7', <code>as is</code>, 'Cast / type check'],
          ['8', <code>+ -</code>, 'Addition / subtraction'],
          ['9', <code>* / %</code>, 'Multiplication / division / modulo'],
          ['10', <code>- !</code>, 'Unary negation / logical NOT'],
          ['11', <code>. () []</code>, 'Member access, call, index'],
        ]}
      />

      <p className="mt-4 text-az-50">
        <strong>Tip:</strong> When in doubt, use parentheses. <code className="text-az-primary">(a + b) * c</code> is
        immediately clear.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Arithmetic</h3>
      <CodeBlock>{`2 + 3      // 5
10 - 4     // 6
3 * 7      // 21
20 / 4     // 5
17 % 5     // 2
-x         // unary negation

// Mixed Int/Real promotes to Real:
2 + 1.5    // 3.5 (Real)`}</CodeBlock>

      <p className="mt-4 text-az-35">
        When mixing <code className="text-az-primary">Int</code> and <code className="text-az-primary">Real</code>,
        the integer is promoted to <code className="text-az-primary">Real</code>. Integer division truncates toward
        zero: <code className="text-az-primary">7 / 2</code> yields <code className="text-az-primary">3</code>. For a
        fractional result, ensure one operand is <code className="text-az-primary">Real</code>:
        <code className="text-az-primary"> 7.0 / 2</code> yields <code className="text-az-primary">3.5</code>.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Comparison</h3>
      <CodeBlock>{`1 < 2      // true
2 <= 2     // true
3 > 2      // true
3 >= 3     // true
5 == 5     // true
5 != 6     // true`}</CodeBlock>

      <p className="mt-4 text-az-35">
        All comparisons produce <code className="text-az-primary">Bool</code>. Equality
        (<code className="text-az-primary">==</code>) is structural, not referential. Comparing incompatible
        types is a compile-time error.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Logical (short-circuit)</h3>
      <CodeBlock>{`true && true    // true
false || true   // true
!false          // true`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Both <code className="text-az-primary">&&</code> and <code className="text-az-primary">||</code> use
        short-circuit evaluation. With <code className="text-az-primary">&&</code>, if the left
        is <code className="text-az-primary">false</code>, the right is never evaluated. With
        <code className="text-az-primary"> ||</code>, if the left is <code className="text-az-primary">true</code>,
        the right is skipped.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Assignment</h3>
      <CodeBlock>{`x = 10
x += 5    // x = x + 5
x -= 3    // x = x - 3
x *= 2    // x = x * 2
x /= 4   // x = x / 4`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Compound assignment operators work with all arithmetic operators. Assignment only works
        with <code className="text-az-primary">var</code> variables.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Null-Aware Operators</h3>
      <p className="mt-4 text-az-35">
        The null-coalescing operator <code className="text-az-primary">??</code> returns the left operand if
        non-null, otherwise the right (fallback). It can be
        chained: <code className="text-az-primary">a ?? b ?? c</code>.
      </p>

      <CodeBlock>{`var name: String? = null
var display = name ?? "Anonymous"  // "Anonymous"

var score: Int? = 42
var value = score ?? 0             // 42`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Additional null-safe operators (<code className="text-az-primary">?=</code>,
        <code className="text-az-primary"> ?+=</code>, <code className="text-az-primary">?-=</code>,
        <code className="text-az-primary"> ?++</code>) perform their operation only when the variable is non-null.
        See the Nullable Types chapter.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Range</h3>
      <p className="mt-4 text-az-35">
        The <code className="text-az-primary">..</code> operator creates an <strong>inclusive</strong> range.
        Both endpoints are included.
      </p>

      <CodeBlock>{`1..5       // inclusive range: 1, 2, 3, 4, 5

for i in 0..4 {
    println(i)  // prints 0, 1, 2, 3, 4
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Scope Resolution</h3>
      <p className="mt-4 text-az-35">
        The <code className="text-az-primary">::</code> operator accesses members of named scopes (namespaces).
        It can be chained.
      </p>

      <CodeBlock>{`media::a              // access 'a' in scope 'media'
std::math::PI         // chained scope access`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Common Patterns</h3>
      <CodeBlock>{`// Clamping a value within bounds
var health = 120
health = if health > 100 { 100 } else { health }

// Safe default with null coalescing
var config: String? = null
fin setting = config ?? "default_value"

// Accumulating in a loop
var sum = 0
for i in 1..10 {
    sum += i
}

// Type-safe conditional logic
var input = 42
if input is Int && input > 0 {
    println("positive integer")
}`}</CodeBlock>
    </Section>
  )
}
