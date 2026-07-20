import { ApiTable, CodeBlock, Lead, Note, Section, Subheading } from './Shared.jsx'

/**
 * "Containers" (chapter 2.14) - one chapter per family.
 *
 * Each collection family has:
 *   - a read-only spec (List / Set / Map)
 *   - a mutable spec    (MutableList / MutableSet / MutableMap)
 *   - one or more concrete packs that implement them (ArrayList, LinkedHashSet,
 *     HashMap / LinkedHashMap / TreeMap)
 * The concrete pack is what you construct; the spec is the type you pass around.
 * Deque, Queue, Stack, and Tuple are single-pack families.
 */

export function ContainersOverview() {
  return (
    <Section id="wip-containers" title="2.14 Containers">
      <Lead>
        Containers live in individual <code>std.container</code> modules. Each collection family is a pair of
        specs — a read-only interface and a mutable one — backed by a concrete pack you construct. The language
        owns no collection types; importing a module makes its ordinary library declarations available.
      </Lead>
      <ApiTable rows={[
        ['List / MutableList / ArrayList', 'Ordered, indexable values. The concrete pack is ArrayList.'],
        ['Set / MutableSet / LinkedHashSet', 'Unique values with insertion-ordered storage and set algebra.'],
        ['Map / MutableMap / HashMap·LinkedHashMap·TreeMap', 'Key/value lookup. Three concrete packs, one sorted.'],
        ['Deque', 'Double-ended queue with amortized O(1) at either end.'],
        ['Queue', 'FIFO processing: enqueue at the back, dequeue from the front.'],
        ['Stack', 'LIFO processing: push, peek, and pop at the top.'],
        ['Tuple<...T>', 'Fixed-size heterogeneous values, created with tupleOf.'],
      ]} />
      <Note>
        Prefer the narrow interface that communicates intent. A <code>List</code> parameter promises no mutation;
        a <code>MutableList</code> parameter advertises it. A queue says “process in arrival order” more clearly
        than a mutable list.
      </Note>
      <CodeBlock>{`import std.container.{list, set, map}
import std.io

func main() {
    fin names = std::listOf("Ana", "Mara")
    var pending = std::mutableListOf("compile", "test")
    fin roles = std::setOf("reader", "writer")
    fin metadata = std::mapOf(std::mapEntry("host", "azora.dev"))

    pending.add("link")
    std::println(names.size)
    std::println(roles.size)
    std::println(metadata.size)
    std::println(pending.size)
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.14.1 List family                                                */
/* ------------------------------------------------------------------ */

export function ListFamily() {
  return (
    <Section id="wip-list" title="2.14.1 List family (List, MutableList, ArrayList)">
      <Lead>
        <code>List&lt;T&gt;</code> is the read-only ordered collection; <code>MutableList&lt;T&gt;</code> adds
        indexed mutation; <code>ArrayList&lt;T&gt;</code> is the concrete dynamic-array pack that implements both.
        Construct with the factories; pass the spec around.
      </Lead>

      <Subheading>Construction and access</Subheading>
      <CodeBlock>{`module app.catalog

import std.container.list
import std.io

func main() {
    fin languages = std::listOf("Azora", "Kotlin", "Rust")
    std::println(languages.size)        // 3
    std::println(languages.get(0))      // Azora
    std::println(languages.first)       // Azora
    std::println(languages.last)        // Rust
    std::println(languages.isNotEmpty)  // true
}`}</CodeBlock>
      <ApiTable rows={[
        ['std::listOf(...e)', 'A List<T> view over a fresh ArrayList.'],
        ['std::emptyList<T>()', 'An empty List<T> (type-annotated form).'],
        ['std::mutableListOf(...e)', 'A MutableList<T> view.'],
        ['std::arrayListOf(...e)', 'The concrete ArrayList<T>.'],
        ['get(index) / list[index]', 'Zero-based, bounds-checked access.'],
        ['first / last', 'The ends; assert when empty.'],
        ['size / isEmpty / isNotEmpty', 'Counts and checks.'],
      ]} />

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
      <CodeBlock>{`func main() {
    fin scores = std::listOf(18, 7, 25, 10)
    fin passing = scores.filter { it >= 10 }
    std::println(passing.size)             // 3
    std::println(scores.any { it == 25 })  // true
}`}</CodeBlock>

      <Subheading>Mutation (MutableList)</Subheading>
      <ApiTable rows={[
        ['add(value)', 'Appends at the end; amortized O(1).'],
        ['insert(index, value)', 'Shifts following values right; O(n).'],
        ['set(index, value) / list[index] = value', 'Replaces a checked existing element; O(1).'],
        ['removeAt(index)', 'Removes and returns a value, shifting the tail; O(n).'],
        ['removeFirst / removeLast', 'Convenient checked end removal.'],
        ['clear()', 'Releases the old buffer and resets default capacity.'],
      ]} />
      <CodeBlock>{`func main() {
    var tasks = std::mutableListOf("parse", "compile")
    tasks.add("link")
    tasks.insert(1, "validate")
    tasks[0] = "lex"
    fin completed = tasks.removeAt(0)
    std::println(completed)
    std::println(tasks.size)
}`}</CodeBlock>
      <Note tone="yellow">
        Do not mutate a list while one of its <code>forEach</code>, <code>map</code>, or <code>filter</code>
        callbacks is traversing that same list. Make the mutation before/after traversal or build a second list.
      </Note>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.14.2 Set family                                                 */
/* ------------------------------------------------------------------ */

export function SetFamily() {
  return (
    <Section id="wip-set" title="2.14.2 Set family (Set, MutableSet, LinkedHashSet)">
      <Lead>
        <code>Set&lt;T&gt;</code> stores unique values; <code>MutableSet&lt;T&gt;</code> adds live membership
        mutation; <code>LinkedHashSet&lt;T&gt;</code> is the concrete pack, keeping insertion order so indexed
        access is well-defined. Element equality uses <code>oper==</code>.
      </Lead>

      <Subheading>Construction and membership</Subheading>
      <CodeBlock>{`import std.container.set
import std.io

func main() {
    fin requested = std::setOf("read", "write", "read")
    std::println(requested.size)        // 2  (duplicates dropped)
    std::println(requested.contains("read"))
    std::println(requested.get(0))      // "read" (insertion order)
}`}</CodeBlock>
      <ApiTable rows={[
        ['std::setOf(...e)', 'A Set<T> view over a fresh LinkedHashSet.'],
        ['std::emptySet<T>()', 'An empty Set<T>.'],
        ['std::mutableSetOf(...e)', 'A MutableSet<T> view.'],
        ['std::linkedHashSetOf(...e)', 'The concrete LinkedHashSet<T>.'],
        ['contains(value)', 'Membership query.'],
        ['get(index)', 'Insertion-order positional access (low-level).'],
      ]} />

      <Subheading>Set algebra</Subheading>
      <ApiTable rows={[
        ['union(other)', 'Values present in either set.'],
        ['intersect(other)', 'Values present in both sets.'],
        ['difference(other)', 'Values present only in the receiver.'],
        ['filter(predicate)', 'Builds a new set while preserving uniqueness.'],
      ]} />
      <CodeBlock>{`func main() {
    fin requested = std::setOf("read", "write", "admin")
    fin allowed = std::setOf("read", "audit")

    fin effective = requested.intersect(allowed)
    fin missing = requested.difference(allowed)
    std::println(effective.contains("read"))   // true
    std::println(missing.contains("write"))    // true
}`}</CodeBlock>

      <Subheading>Mutable membership</Subheading>
      <ApiTable rows={[
        ['add(value)', 'Adds only when absent and returns whether the set changed.'],
        ['remove(value)', 'Removes a value and returns whether it existed.'],
        ['clear()', 'Empties the receiver.'],
      ]} />
      <CodeBlock>{`func main() {
    var online = std::mutableSetOf("ana", "mara")
    if online.add("noah") { std::println("presence changed") }
    online.remove("ana")
    std::println(online.contains("mara"))
}`}</CodeBlock>
      <Note>
        Positional access exposes storage order for low-level iteration, not semantic ordering. Do not persist or
        compare sets by index. Use membership and set algebra.
      </Note>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.14.3 Map family                                                 */
/* ------------------------------------------------------------------ */

export function MapFamily() {
  return (
    <Section id="wip-map" title="2.14.3 Map family (Map, MutableMap, HashMap/LinkedHashMap/TreeMap)">
      <Lead>
        <code>Map&lt;K, V&gt;</code> associates unique keys with values; <code>MutableMap&lt;K, V&gt;</code> adds
        mutation. Three concrete packs implement them: <code>HashMap</code> (fastest, unspecified order, needs
        <code> oper#</code> + <code>oper==</code> on <code>K</code>), <code>LinkedHashMap</code> (insertion-ordered,
        the default), and <code>TreeMap</code> (sorted, needs <code>oper&lt;</code> on <code>K</code>, also a
        <code>SortedMap</code>).
      </Lead>

      <Subheading>Construction and lookup</Subheading>
      <CodeBlock>{`import std.container.map
import std.io

func main() {
    var ports = std::mutableMapOf(std::mapEntry("http", 80), std::mapEntry("https", 443))
    ports.put("ssh", 22)
    std::println(ports["https"])                 // 443
    std::println(ports.getOrDefault("dns", 53))  // 53
    std::println(ports.containsKey("http"))      // true
}`}</CodeBlock>
      <ApiTable rows={[
        ['std::mapOf(...entries)', 'A Map<K,V> view over a LinkedHashMap (Kotlin default).'],
        ['std::mutableMapOf(...entries)', 'A MutableMap<K,V> view over a LinkedHashMap.'],
        ['std::mapEntry(k, v)', 'Builds one MapEntry<K,V>.'],
        ['std::hashMapOf / linkedHashMapOf / treeMapOf', 'The three concrete packs.'],
        ['get(key) / map[key]', 'Returns the value or null when absent.'],
        ['getOrDefault(key, fallback)', 'Returns a fallback without modifying the map.'],
        ['containsKey / containsValue', 'Membership queries.'],
        ['keys() / values() / entries()', 'Iteration-order snapshots.'],
      ]} />

      <Subheading>Mutation (MutableMap)</Subheading>
      <ApiTable rows={[
        ['put(key, value)', 'Inserts or replaces an association; returns the previous value or null.'],
        ['putAll(other)', 'Copies entries from another map.'],
        ['remove(key)', 'Removes and returns the associated value or null.'],
        ['getOrPut(key, default())', 'Returns the existing value or inserts the default.'],
        ['clear()', 'Releases entries while keeping the map reusable.'],
      ]} />
      <CodeBlock>{`func frequencies(words: ref List<String>): MutableMap<String, Int> {
    var counts = std::mutableMapOf<String, Int>()
    words.forEach { word ->
        counts[word] = counts.getOrDefault(word, 0) + 1
    }
    return counts
}`}</CodeBlock>

      <Subheading>Sorted maps (TreeMap)</Subheading>
      <p>
        <code>TreeMap&lt;K, V&gt;</code> keeps keys in ascending <code>oper&lt;</code> order and is also a
        <code> SortedMap</code>, so it exposes navigation and range views.
      </p>
      <ApiTable rows={[
        ['firstKey() / lastKey()', 'The extremes, or null when empty.'],
        ['lowerKey / floorKey / ceilingKey / higherKey', 'Neighbour lookup around a key.'],
        ['headMap(to) / tailMap(from) / subMap(from, to)', 'Ascending read-only range views.'],
        ['pollFirstEntry / pollLastEntry', 'Remove and return a boundary entry.'],
      ]} />
      <CodeBlock>{`func main() {
    fin ages = std::treeMapOf(std::mapEntry("Ana", 30), std::mapEntry("Mara", 25))
    std::println(ages.firstKey())   // Ana  (sorted by key)
    std::println(ages.lastKey())    // Mara
}`}</CodeBlock>
      <Note>
        The three concrete packs share one <code>Map</code>/<code>MutableMap</code> surface; switch packs by
        changing the factory. <code>HashMap</code> needs <code>oper#</code> and <code>oper==</code> on the key
        type; <code>TreeMap</code> needs <code>oper&lt;</code>.
      </Note>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.14.4 Deque                                                      */
/* ------------------------------------------------------------------ */

export function DequeChapter() {
  return (
    <Section id="wip-deque" title="2.14.4 Deque">
      <Lead>
        <code>Deque&lt;T&gt;</code> is a circular-buffer double-ended queue. Push and pop at either end are O(1)
        amortized, making it the right default for work queues, sliding windows, and breadth/depth hybrid algorithms.
      </Lead>
      <CodeBlock>{`import std.container.deque
import std.io

func main() {
    var work = Deque<String>()
    work.pushBack("normal")
    work.pushFront("urgent")
    work.pushBack("background")

    std::println(work.peekFront()) // urgent
    std::println(work.popFront())  // urgent
    std::println(work.popBack())   // background
}`}</CodeBlock>
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

/* ------------------------------------------------------------------ */
/* 2.14.5 Queue                                                      */
/* ------------------------------------------------------------------ */

export function QueueChapter() {
  return (
    <Section id="wip-queue" title="2.14.5 Queue">
      <Lead>
        <code>Queue&lt;T&gt;</code> communicates first-in-first-out processing. Enqueue adds at the back; dequeue
        removes the oldest value from the front.
      </Lead>
      <CodeBlock>{`import std.container.queue
import std.io

func main() {
    var messages = Queue<String>()
    messages.enqueue("first")
    messages.enqueue("second")

    while messages.isNotEmpty {
        std::println(messages.dequeue())
    }
}`}</CodeBlock>
      <p>
        <code>peek</code> returns the next value without removing it. <code>dequeue</code> and <code>peek</code>
        assert that the queue is non-empty. The current implementation shifts remaining elements during dequeue, so
        a <code>Deque</code> is preferable for high-throughput FIFO workloads until Queue adopts circular storage.
      </p>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.14.6 Stack                                                      */
/* ------------------------------------------------------------------ */

export function StackChapter() {
  return (
    <Section id="wip-stack" title="2.14.6 Stack">
      <Lead>
        <code>Stack&lt;T&gt;</code> is last-in-first-out storage. It is useful for parsers, undo history, tree
        traversal, and any algorithm that must resume the most recently suspended work first.
      </Lead>
      <CodeBlock>{`import std.container.stack
import std.io

func main() {
    var undo = Stack<String>()
    undo.push("insert title")
    undo.push("rename title")

    std::println(undo.peek()) // rename title
    std::println(undo.pop())  // rename title
    std::println(undo.pop())  // insert title
}`}</CodeBlock>
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

/* ------------------------------------------------------------------ */
/* 2.14.7 Tuple                                                      */
/* ------------------------------------------------------------------ */

export function TupleChapter() {
  return (
    <Section id="wip-tuple" title="2.14.7 Tuple">
      <Lead>
        <code>Tuple&lt;T...&gt;</code> is a fixed-size heterogeneous container generated by the stdlib variadic
        pack. Tuples require at least two elements and expose zero-based positional fields.
      </Lead>
      <CodeBlock>{`import std.container.tuple
import std.io

func describe(): Tuple<String, Int, Bool> {
    return std::tupleOf("Azora", 3, true)
}

func main() {
    fin value = describe()
    std::println(value.0) // Azora
    std::println(value.1) // 3
    std::println(value.2) // true
}`}</CodeBlock>
      <Subheading>Construction and access</Subheading>
      <p>
        Build tuples with <code>std::tupleOf</code>. Tuple types are written <code>Tuple&lt;A, B&gt;</code> when
        naming the stdlib type explicitly; positional access remains <code>.0</code>, <code>.1</code>, and so on.
      </p>
      <CodeBlock>{`func main() {
    fin pair = std::tupleOf(404, "Not Found")
    std::println(pair.0)
    std::println(pair.1)
}`}</CodeBlock>
      <Note>
        Use a pack when fields have durable domain meaning. A tuple is best for short local groupings and generic
        algorithms where positional meaning is obvious at the call site.
      </Note>
    </Section>
  )
}
