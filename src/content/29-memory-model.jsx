import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function MemoryModel() {
  return (
    <Section id="memory-model" title="29. The Memory Model">
      <p className="mt-2 text-az-35">
        Azora is garbage-collected by default, but it also exposes an explicit memory model for
        systems work: heap pointers, dereference, scoped arenas, and pointer arithmetic. These are
        the building blocks you reach for when you need manual control.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">29.1 Allocating a pointer</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">alloc</code> heap-allocates a value and returns a{' '}
        <code className="text-az-primary">T*</code> pointer. The prefix{' '}
        <code className="text-az-primary">*</code> dereferences it.
      </p>
      <CodeBlock>{`func main() {
    var p: Int* = alloc 42
    println(*p)            // 42
    *p = 99
    println(*p)            // 99
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">29.2 Buffers and pointer arithmetic</h3>
      <p className="mt-2 text-az-35">
        Allocating an array gives a pointer to its first element. You can offset a pointer with{' '}
        <code className="text-az-primary">+</code> / <code className="text-az-primary">-</code>, take
        the distance between two pointers with{' '}
        <code className="text-az-primary">-</code>, and compare them with{' '}
        <code className="text-az-primary">==</code>.
      </p>
      <CodeBlock>{`func main() {
    var p: Int* = alloc [10, 20, 30]
    println(*p)            // 10
    println(*(p + 1))      // 20
    *(p + 2) = 99
    println(*(p + 2))      // 99

    var q = p + 3
    println(q - p)         // 3   (distance)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">29.3 drop, unsafe, and isolated</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">drop expr</code> releases a value (advisory under GC).{' '}
        <code className="text-az-primary">unsafe {`{ }`}</code> marks an opt-in block for manual
        memory operations. <code className="text-az-primary">isolated(expr)</code> produces an
        independent deep copy, so two values stop sharing mutable state.
      </p>
      <CodeBlock>{`func main() {
    var original = [1, 2, 3]
    var copy = isolated(original)
    copy[0] = 99
    println(original[0])   // 1   - original is untouched
    drop original
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">29.4 Scoped arenas</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">zone alloc {`{ }`}</code> is a scoped allocation arena:
        pointers allocated inside are tracked and freed automatically when the zone exits - a handy
        way to batch short-lived allocations.
      </p>
      <CodeBlock>{`func main() {
    zone alloc {
        var p: Int* = alloc 7
        println(*p)        // 7
    }                       // p is released here
}`}</CodeBlock>
    </Section>
  )
}
