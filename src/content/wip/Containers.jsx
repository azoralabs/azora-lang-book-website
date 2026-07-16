import { ApiTable, CodeBlock, Lead, Note, Section, Subheading } from './Shared.jsx'

export function ContainersOverview() {
  return (
    <Section id="wip-containers" title="2.4 Containers">
      <Lead>
        Containers live in individual <code>std.container</code> modules. The language does not own
        <code>Array</code>, <code>Map</code>, <code>Set</code>, <code>List</code>, or tuple classes; importing a
        module makes its normal library declarations available.
      </Lead>
      <ApiTable rows={[
        ['List<T>', 'Ordered read-oriented values; includes EmptyList and SingletonList specializations.'],
        ['MutableList<T>', 'Growable ordered values with indexed mutation.'],
        ['Map<K, V>', 'Key/value lookup with unique keys.'],
        ['MutableMap<K, V>', 'Explicitly mutable key/value storage.'],
        ['Set<T>', 'Unique values and set algebra.'],
        ['MutableSet<T>', 'Explicitly mutable unique-value storage.'],
        ['Deque<T>', 'Double-ended queue with amortized O(1) operations at either end.'],
        ['Queue<T>', 'FIFO processing: enqueue at the back, dequeue from the front.'],
        ['Stack<T>', 'LIFO processing: push, peek, and pop at the top.'],
        ['Tuple<T...>', 'Fixed-size heterogeneous values, created with tuple syntax or tupleOf.'],
      ]} />
      <Note>
        Prefer the narrow interface that communicates intent. A queue says “process in arrival order” more clearly
        than a mutable list. A set says “duplicates are impossible” more clearly than repeated contains checks.
      </Note>
      <CodeBlock>{`use std.container.{list, mutable_list, set, map}

fin names = listOf("Ana", "Mara")
var pending = mutableListOf("compile", "test")
fin roles = setOf("reader", "writer")
fin metadata = emptyMap<String, String>()`}</CodeBlock>
    </Section>
  )
}

export function ListChapter() {
  return (
    <Section id="wip-list" title="2.4.1 List, EmptyList, and SingletonList">
      <Lead>
        <code>List&lt;T&gt;</code> is an ordered generic collection. Use <code>listOf</code> for normal construction and
        <code>emptyList</code> when the element type must be explicit. Indexes are zero-based and bounds are checked.
      </Lead>
      <CodeBlock>{`module app.catalog

use std.container.list

func main() {
    fin languages = listOf("Azora", "Kotlin", "Rust")
    println(languages.size)       // 3
    println(languages[0])         // Azora
    println(languages.first)      // Azora
    println(languages.last)       // Rust
    println(languages.isNotEmpty) // true
}`}</CodeBlock>
      <Subheading>Empty and singleton specialization</Subheading>
      <p>
        <code>EmptyList&lt;T&gt;</code> and <code>SingletonList&lt;T&gt;</code> avoid allocating a backing buffer for zero or
        one element. Their <code>size</code>, <code>isEmpty</code>, and <code>isNotEmpty</code> properties are constant.
        Accessing an empty list or any singleton index other than zero fails a bounds assertion.
      </p>
      <CodeBlock>{`fin none = emptyList<String>()
fin one = listOf("only")

println(none.isEmpty)
println(one[0])`}</CodeBlock>
      <Subheading>Queries and transformations</Subheading>
      <ApiTable rows={[
        ['contains(value)', 'Tests equality against each element; O(n).'],
        ['indexOf / lastIndexOf', 'Returns a matching index or -1.'],
        ['forEach(action)', 'Visits elements in index order.'],
        ['map(transform)', 'Builds a list by transforming each value.'],
        ['filter(predicate)', 'Keeps values for which the predicate is true.'],
        ['any / all / none', 'Short-circuit predicate queries.'],
        ['count(predicate)', 'Counts matching elements.'],
        ['subList(from, to)', 'Copies a checked half-open range.'],
        ['reversed', 'Returns a reversed list without mutating the receiver.'],
      ]} />
      <CodeBlock>{`fin scores = listOf(18, 7, 25, 10)
fin passing = scores.filter { score -> score >= 10 }

println(passing.count { score -> score >= 18 })
println(scores.any { score -> score == 25 })`}</CodeBlock>
    </Section>
  )
}

export function MutableListChapter() {
  return (
    <Section id="wip-mutable-list" title="2.4.2 MutableList">
      <Lead>
        <code>MutableList&lt;T&gt;</code> makes indexed mutation and growth explicit in the type. It owns a resizable
        buffer, grows geometrically, and retains insertion order.
      </Lead>
      <CodeBlock>{`use std.container.mutable_list

func main() {
    var tasks = mutableListOf("parse", "compile")
    tasks.add("link")
    tasks.insert(1, "validate")
    tasks[0] = "lex"

    fin completed = tasks.removeAt(0)
    println(completed)
    println(tasks.toString)
}`}</CodeBlock>
      <ApiTable rows={[
        ['add(value)', 'Appends at the end; amortized O(1).'],
        ['insert(index, value)', 'Shifts following values right; O(n).'],
        ['set / list[index] = value', 'Replaces a checked existing element; O(1).'],
        ['removeAt(index)', 'Removes and returns a value, shifting the tail; O(n).'],
        ['removeFirst / removeLast', 'Convenient checked end removal.'],
        ['clear()', 'Releases the old buffer and resets default capacity.'],
      ]} />
      <Note tone="yellow">
        Do not mutate a list while one of its <code>forEach</code>, <code>map</code>, or <code>filter</code>
        callbacks is traversing that same list. Make the mutation before/after traversal or build a second list.
      </Note>
    </Section>
  )
}

export function MapChapter() {
  return (
    <Section id="wip-map" title="2.4.3 Map">
      <Lead>
        <code>Map&lt;K, V&gt;</code> associates unique keys with values. A repeated key replaces its previous value.
        Lookups are checked: use <code>getOrDefault</code> when absence is expected.
      </Lead>
      <CodeBlock>{`use std.container.map

func main() {
    var ports = emptyMap<String, Int>()
    ports.put("http", 80)
    ports.put("https", 443)

    println(ports["https"])
    println(ports.getOrDefault("ssh", 22))
    println(ports.containsKey("http"))
}`}</CodeBlock>
      <ApiTable rows={[
        ['put(key, value)', 'Inserts or replaces an association.'],
        ['get(key) / map[key]', 'Returns the value or fails when the key is absent.'],
        ['getOrDefault(key, fallback)', 'Returns a fallback without modifying the map.'],
        ['remove(key)', 'Removes and returns the associated value.'],
        ['containsKey / containsValue', 'Linear membership queries in the current implementation.'],
        ['forEach(action)', 'Visits key/value pairs in storage order.'],
        ['keys() / values()', 'Returns snapshots of keys or values.'],
      ]} />
      <Note>
        The WIP implementation uses parallel owned buffers. It does not yet promise hash-map complexity, so do
        not rely on constant-time lookup in performance contracts. The API can later change storage strategy
        without changing call sites.
      </Note>
    </Section>
  )
}

export function MutableMapChapter() {
  return (
    <Section id="wip-mutable-map" title="2.4.4 MutableMap">
      <Lead>
        Use <code>MutableMap&lt;K, V&gt;</code> when mutation is part of the public contract: caches, counters, symbol
        tables, and incremental state. The mutable type prevents callers from mistaking live state for a snapshot.
      </Lead>
      <CodeBlock>{`use std.container.mutable_map

func frequencies(words: ref List<String>): MutableMap<String, Int> {
    var counts = mutableMapOf<String, Int>()
    words.forEach { word ->
        counts[word] = counts.getOrDefault(word, 0) + 1
    }
    return counts
}`}</CodeBlock>
      <p>
        Index assignment inserts when a key is absent and replaces when it exists. <code>remove</code> is checked;
        use <code>containsKey</code> first when removal is optional. <code>clear</code> releases entries while keeping
        the map value reusable.
      </p>
      <CodeBlock>{`var sessions = mutableMapOf<String, String>()
sessions["a1"] = "Ana"
sessions["m2"] = "Mara"

if sessions.containsKey("a1") {
    fin removed = sessions.remove("a1")
    println(removed)
}`}</CodeBlock>
    </Section>
  )
}

export function SetChapter() {
  return (
    <Section id="wip-set" title="2.4.5 Set">
      <Lead>
        <code>Set&lt;T&gt;</code> stores unique values. Construction and assignment enforce uniqueness: adding an
        existing value is a no-op, and replacing by index is skipped when it would create a duplicate.
      </Lead>
      <CodeBlock>{`use std.container.set

fin requested = setOf("read", "write", "read")
fin allowed = setOf("read", "audit")

fin effective = requested.intersect(allowed)
fin missing = requested.difference(allowed)

println(effective.contains("read"))
println(missing.contains("write"))`}</CodeBlock>
      <ApiTable rows={[
        ['add(value)', 'Adds only when absent and returns whether the set changed.'],
        ['remove(value)', 'Removes a value and returns whether it existed.'],
        ['contains(value)', 'Membership query.'],
        ['union(other)', 'Values present in either set.'],
        ['intersect(other)', 'Values present in both sets.'],
        ['difference(other)', 'Values present only in the receiver.'],
        ['filter(predicate)', 'Builds a new set while preserving uniqueness.'],
      ]} />
      <Note>
        Set indexes expose storage order for low-level iteration, not semantic ordering. Do not persist or compare
        sets by index. Use membership and set algebra.
      </Note>
    </Section>
  )
}

export function MutableSetChapter() {
  return (
    <Section id="wip-mutable-set" title="2.4.6 MutableSet">
      <Lead>
        <code>MutableSet&lt;T&gt;</code> is the explicit mutable counterpart for live membership state. Its mutating
        methods report whether the operation changed the set, which is useful for invalidation and event emission.
      </Lead>
      <CodeBlock>{`use std.container.mutable_set

var online = mutableSetOf("ana", "mara")

if online.add("noah") {
    println("presence changed")
}

online.remove("ana")
println(online.contains("mara"))`}</CodeBlock>
      <p>
        <code>union</code>, <code>intersect</code>, and <code>difference</code> return new mutable sets; they do not
        mutate either operand. <code>clear</code> empties the receiver. As with <code>Set</code>, positional access
        is an implementation-order facility rather than sorted order.
      </p>
    </Section>
  )
}

export function DequeChapter() {
  return (
    <Section id="wip-deque" title="2.4.7 Deque">
      <Lead>
        <code>Deque&lt;T&gt;</code> is a circular-buffer double-ended queue. Push and pop at either end are O(1)
        amortized, making it the right default for work queues, sliding windows, and breadth/depth hybrid algorithms.
      </Lead>
      <CodeBlock>{`use std.container.deque

var work = Deque<String>()
work.pushBack("normal")
work.pushFront("urgent")
work.pushBack("background")

println(work.peekFront()) // urgent
println(work.popFront())  // urgent
println(work.popBack())   // background`}</CodeBlock>
      <ApiTable rows={[
        ['pushFront / pushBack', 'Insert at the selected end; O(1) amortized.'],
        ['popFront / popBack', 'Remove and return from the selected end; O(1).'],
        ['peekFront / peekBack', 'Inspect an end without removal.'],
        ['isEmpty / isNotEmpty', 'Check before popping or peeking.'],
        ['clear()', 'Resets logical contents while retaining capacity.'],
      ]} />
      <Note tone="yellow">
        The current pop/peek functions assume a non-empty deque. Check <code>isNotEmpty</code> at boundaries where
        emptiness is possible.
      </Note>
    </Section>
  )
}

export function QueueChapter() {
  return (
    <Section id="wip-queue" title="2.4.8 Queue">
      <Lead>
        <code>Queue&lt;T&gt;</code> communicates first-in-first-out processing. Enqueue adds at the back; dequeue removes
        the oldest value from the front.
      </Lead>
      <CodeBlock>{`use std.container.queue

var messages = Queue<String>()
messages.enqueue("first")
messages.enqueue("second")

while messages.isNotEmpty {
    println(messages.dequeue())
}`}</CodeBlock>
      <p>
        <code>peek</code> returns the next value without removing it. <code>dequeue</code> and <code>peek</code> assert
        that the queue is non-empty. The current implementation shifts remaining elements during dequeue, so a
        <code>Deque</code> is preferable for high-throughput FIFO workloads until Queue adopts circular storage.
      </p>
    </Section>
  )
}

export function StackChapter() {
  return (
    <Section id="wip-stack" title="2.4.9 Stack">
      <Lead>
        <code>Stack&lt;T&gt;</code> is last-in-first-out storage. It is useful for parsers, undo history, tree traversal,
        and any algorithm that must resume the most recently suspended work first.
      </Lead>
      <CodeBlock>{`use std.container.stack

var undo = Stack<String>()
undo.push("insert title")
undo.push("rename title")

println(undo.peek()) // rename title
println(undo.pop())  // rename title
println(undo.pop())  // insert title`}</CodeBlock>
      <ApiTable rows={[
        ['push(value)', 'Appends at the top; amortized O(1).'],
        ['peek()', 'Returns the top without changing the stack.'],
        ['pop()', 'Removes and returns the top; O(1).'],
        ['clear()', 'Drops the old backing buffer and resets capacity.'],
      ]} />
      <Note tone="yellow">Check <code>isNotEmpty</code> before <code>peek</code> or <code>pop</code>.</Note>
    </Section>
  )
}

export function TupleChapter() {
  return (
    <Section id="wip-tuple" title="2.4.10 Tuple">
      <Lead>
        <code>Tuple&lt;T...&gt;</code> is a fixed-size heterogeneous container generated by the stdlib variadic pack.
        Tuples require at least two elements and expose zero-based positional fields.
      </Lead>
      <CodeBlock>{`use std.container.tuple

func describe(): Tuple<String, Int, Bool> {
    return tupleOf("Azora", 3, true)
}

func main() {
    fin value = describe()
    println(value.0) // Azora
    println(value.1) // 3
    println(value.2) // true
}`}</CodeBlock>
      <Subheading>Literal syntax</Subheading>
      <p>
        The language also accepts <code>(1, "two")</code>. There is no <code>tup</code> keyword. Tuple type
        declarations use <code>Tuple&lt;A, B&gt;</code> when naming the stdlib type explicitly; positional access remains
        <code>.0</code>, <code>.1</code>, and so on.
      </p>
      <CodeBlock>{`fin pair = (404, "Not Found")
println(pair.0)
println(pair.1)`}</CodeBlock>
      <Note>
        Use a pack when fields have durable domain meaning. A tuple is best for short local groupings and generic
        algorithms where positional meaning is obvious at the call site.
      </Note>
    </Section>
  )
}
