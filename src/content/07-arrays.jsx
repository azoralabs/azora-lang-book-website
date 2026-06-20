import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Arrays() {
  return (
    <Section id="arrays" title="7. Arrays">
      <p className="mt-2 text-az-35">
        Arrays are ordered, zero-indexed, resizable collections of a single element type. They
        carry their length at runtime.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">7.1 Array literals</h3>
      <p className="mt-2 text-az-35">
        Create an array with square brackets. The element type is inferred from the contents.
      </p>
      <CodeBlock>{`func main() {
    var numbers = [10, 20, 30]          // array of Int
    var names = ["Alice", "Bob"]        // array of String
    var flags = [true, false, true]     // array of Bool

    println(numbers[0])                 // 10
    println(names[1])                   // Bob
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        An empty literal <code className="text-az-primary">[]</code> is not allowed on its own
        because the element type cannot be inferred. Provide at least one element, or build the
        array with <code className="text-az-primary">.add</code> from a one-element seed.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">7.2 Indexing</h3>
      <p className="mt-2 text-az-35">
        Access elements by zero-based index. Any integer expression may be used as the index.
      </p>
      <CodeBlock>{`func main() {
    var a = [10, 20, 30]
    println(a[0])              // 10
    println(a[a.length - 1])   // 30

    var i = 1
    println(a[i + 1])          // 30
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">7.3 Length and emptiness</h3>
      <CodeBlock>{`func main() {
    var items = [10, 20, 30]
    println(items.length)      // 3
    println(items.isEmpty)     // false
    println(items.isNotEmpty)  // true
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">7.4 Adding elements</h3>
      <p className="mt-2 text-az-35">
        Arrays are resizable. <code className="text-az-primary">.add(x)</code> appends an element
        and grows the array by one.
      </p>
      <CodeBlock>{`func main() {
    var a = [1, 2, 3]
    a.add(4)
    a.add(5)
    println(a.length)   // 5
    println(a[4])       // 5
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">7.5 Mutation</h3>
      <p className="mt-2 text-az-35">
        Assign to an index with <code className="text-az-primary">=</code> or a compound operator.
      </p>
      <CodeBlock>{`func main() {
    var x = [1, 2, 3]
    x[0] = 99
    x[1] += 5
    x[2] *= 10
    println(x[0])       // 99
    println(x[1])       // 7
    println(x[2])       // 30
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">7.6 Iteration</h3>
      <p className="mt-2 text-az-35">
        Iterate an array by index using a <code className="text-az-primary">for</code> range over its length.
      </p>
      <CodeBlock>{`func main() {
    var fruits = ["apple", "banana", "cherry"]
    var total = 0
    for i in 0..<fruits.length {
        println(fruits[i])
        total += 1
    }
    println("ate \${total} fruits")
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">7.7 Nested arrays</h3>
      <CodeBlock>{`func main() {
    var grid = [[1, 2], [3, 4]]
    println(grid[0][1])   // 2
    println(grid[1][0])   // 3
}`}</CodeBlock>
    </Section>
  )
}
