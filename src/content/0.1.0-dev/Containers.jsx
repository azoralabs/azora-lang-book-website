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
 * Deque and Queue are single-pack families; tuples are built into the language.
 */

export function ContainersOverview() {
  return (
    <Section id="v010dev-containers" title="2.14 Containers">
      <Lead>
        Containers live in individual <code>std.container</code> modules. Each collection family is a pair of
        specs - a read-only interface and a mutable one - backed by a concrete pack. A collection literal or a
        factory such as <code>listOf</code> builds one.
      </Lead>
      <ApiTable rows={[
        ['List / MutableList / ArrayList', 'Ordered, indexable values. The concrete pack is ArrayList.'],
        ['Set / MutableSet / LinkedHashSet·HashSet·TreeSet', 'Unique values with set algebra.'],
        ['Map / MutableMap / LinkedHashMap·HashMap·TreeMap', 'Key/value lookup. TreeMap keeps keys sorted.'],
        ['Deque', 'Double-ended queue with amortized O(1) at either end.'],
        ['Queue', 'FIFO processing: enqueue at the back, dequeue from the front.'],
        ['(A, B, …)', 'Tuples - fixed-size groups of values, built into the language.'],
      ]} />
      <Note>
        Prefer the narrow interface that communicates intent. A <code>List</code> parameter promises no mutation;
        a <code>MutableList</code> parameter advertises it. A queue says “process in arrival order” more clearly
        than a mutable list.
      </Note>
      <CodeBlock>{`module playground

import std.io
import std.container::{list, set, map}

func main() {
    fin names = listOf("Ana", "Mara")
    var pending = mutableListOf("compile", "test")
    fin roles = setOf("reader", "writer")
    fin metadata = mapOf<String, String>(mapEntry("host", "azora.dev"))

    pending.add("link")
    println(names.size)
    println(roles.size)
    println(metadata.size)
    println(pending.size)
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.14.1 List family                                                */
/* ------------------------------------------------------------------ */

export function ListFamily() {
  return (
    <Section id="v010dev-list" title="2.14.1 List family (List, MutableList, ArrayList)">
      <Lead>
        <code>List&lt;T&gt;</code> is the read-only ordered collection; <code>MutableList&lt;T&gt;</code> adds
        mutation; <code>ArrayList&lt;T&gt;</code> is the dynamic-array pack that implements both.
      </Lead>

      <Subheading>Construction, access, and queries</Subheading>
      <ApiTable rows={[
        ['listOf(...e) / [a, b] in a List context', 'A List<T> over a fresh ArrayList.'],
        ['mutableListOf(...e) / arrayListOf(...e)', 'A MutableList<T> / the concrete ArrayList<T>.'],
        ['get(index) / list[index]', 'Zero-based, bounds-checked access.'],
        ['first / last', 'The ends; assert when empty.'],
        ['size / isEmpty / isNotEmpty', 'Counts and checks.'],
        ['contains / indexOf / lastIndexOf', 'Equality searches; indexOf returns -1 when absent.'],
        ['map / filter / forEach', 'Transform (to the same element type), keep, or visit.'],
        ['any / all / none / count', 'Predicate queries.'],
        ['subList(from, to) / reversed', 'A copied half-open range / a reversed copy.'],
      ]} />
      <CodeBlock>{`module playground

import std.io
import std.container.list

func main() {
    fin languages = listOf("Azora", "Kotlin", "Rust")
    println(languages.size)
    println(languages.get(0))
    println(languages[1])
    println(languages.first)
    println(languages.last)
    println(languages.contains("Rust"))
    println(languages.indexOf("Kotlin"))

    fin scores = listOf(18, 7, 25, 10)
    fin passing = scores.filter { it >= 10 }
    println(passing.size)
    println(scores.any { it == 25 })
    println(scores.count { it > 9 })
    fin doubled = scores.map { it * 2 }
    println(doubled[0])
    println(scores.subList(0, 2).size)
}`}</CodeBlock>

      <Subheading>Mutation (MutableList)</Subheading>
      <ApiTable rows={[
        ['add(value)', 'Appends at the end; amortized O(1).'],
        ['insert(index, value)', 'Shifts following values right; O(n).'],
        ['set(index, value)', 'Replaces a checked existing element; O(1).'],
        ['removeAt(index)', 'Removes and returns a value, shifting the tail; O(n).'],
        ['removeFirst / removeLast', 'Checked end removal.'],
        ['clear()', 'Empties the list.'],
      ]} />
      <CodeBlock>{`module playground

import std.io
import std.container.list

func main() {
    var tasks = mutableListOf("parse", "compile")
    tasks.add("link")
    tasks.insert(1, "validate")
    tasks.set(0, "lex")
    fin completed = tasks.removeAt(0)
    println(completed)
    println(tasks.size)
    println(tasks[0])
}`}</CodeBlock>
      <Note tone="yellow">
        Do not mutate a list while one of its <code>forEach</code>, <code>map</code>, or <code>filter</code>
        callbacks is traversing that same list. Make the change before or after the traversal, or build a second
        list.
      </Note>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.14.2 Set family                                                 */
/* ------------------------------------------------------------------ */

export function SetFamily() {
  return (
    <Section id="v010dev-set" title="2.14.2 Set family (Set, MutableSet, LinkedHashSet)">
      <Lead>
        <code>Set&lt;T&gt;</code> stores unique values; <code>MutableSet&lt;T&gt;</code> adds membership
        changes. <code>LinkedHashSet</code> (the default) keeps insertion order, <code>HashSet</code> leaves order
        unspecified, and <code>TreeSet</code> keeps values sorted.
      </Lead>
      <ApiTable rows={[
        ['setOf(...e) / mutableSetOf(...e)', 'A Set<T> / MutableSet<T> over a LinkedHashSet.'],
        ['hashSetOf / linkedHashSetOf / treeSetOf', 'The concrete packs.'],
        ['contains(value)', 'Membership.'],
        ['union / intersect / difference', 'Set algebra; each returns a new set.'],
        ['add(value) / remove(value)', 'Change membership; each returns whether the set changed.'],
      ]} />
      <CodeBlock>{`module playground

import std.io
import std.container.set

func main() {
    fin requested = setOf("read", "write", "read")
    println(requested.size)
    println(requested.contains("read"))

    fin wanted = setOf("read", "write", "admin")
    fin allowed = setOf("read", "audit")
    println(wanted.intersect(allowed).contains("read"))
    println(wanted.difference(allowed).contains("write"))
    println(wanted.union(allowed).size)

    var online = mutableSetOf("ana", "mara")
    if online.add("noah") { println("presence changed") }
    online.remove("ana")
    println(online.contains("mara"))
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.14.3 Map family                                                 */
/* ------------------------------------------------------------------ */

export function MapFamily() {
  return (
    <Section id="v010dev-map" title="2.14.3 Map family (Map, MutableMap, HashMap/LinkedHashMap/TreeMap)">
      <Lead>
        <code>Map&lt;K, V&gt;</code> associates unique keys with values; <code>MutableMap&lt;K, V&gt;</code> adds
        mutation. <code>LinkedHashMap</code> (the default) keeps insertion order, <code>HashMap</code> is the
        fastest with unspecified order, and <code>TreeMap</code> keeps keys sorted.
      </Lead>

      <Subheading>Construction and lookup</Subheading>
      <ApiTable rows={[
        ['["k": v] / mapOf / mutableMapOf', 'A map literal, or the factories over a LinkedHashMap.'],
        ['mapEntry(k, v)', 'One MapEntry<K, V> for the factories.'],
        ['hashMapOf / linkedHashMapOf / treeMapOf', 'The concrete packs.'],
        ['get(key) / map[key]', 'The value, or null when absent.'],
        ['getOrDefault(key, fallback)', 'A fallback without changing the map.'],
        ['containsKey / containsValue', 'Membership.'],
        ['put / putAll / remove / getOrPut / clear', 'Mutation.'],
        ['keys() / values() / entries()', 'Snapshots in iteration order.'],
      ]} />
      <CodeBlock>{`module playground

import std.io
import std.container.map

func main() {
    var ports = mutableMapOf<String, Int>(mapEntry("http", 80), mapEntry("https", 443))
    ports.put("ssh", 22)
    println(ports["https"])
    println(ports.getOrDefault("dns", 53))
    println(ports.containsKey("http"))
    println(ports.size)
}`}</CodeBlock>

      <Subheading>Building a map</Subheading>
      <CodeBlock>{`module playground

import std.io
import std.container.list
import std.container.map

func frequencies(words: List<String>&): MutableMap<String, Int> {
    var counts = mutableMapOf<String, Int>()
    for i in 0..<words.size {
        fin word = words[i]
        counts.put(word, counts.getOrDefault(word, 0) + 1)
    }
    return counts
}

func main() {
    fin counts = frequencies(listOf("a", "b", "a"))
    println(counts["a"])
}`}</CodeBlock>

      <Subheading>Sorted maps (TreeMap)</Subheading>
      <ApiTable rows={[
        ['firstKey() / lastKey()', 'The extremes, or null when empty.'],
        ['lowerKey / floorKey / ceilingKey / higherKey', 'Neighbour lookup around a key.'],
        ['headMap(to) / tailMap(from) / subMap(from, to)', 'Ascending range views.'],
        ['pollFirstEntry / pollLastEntry', 'Remove and return a boundary entry.'],
      ]} />
      <CodeBlock>{`module playground

import std.io
import std.container.map

func main() {
    fin ages = treeMapOf<String, Int>(mapEntry("Mara", 25), mapEntry("Ana", 30))
    println(ages.firstKey())
    println(ages.lastKey())
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.14.4 Deque                                                      */
/* ------------------------------------------------------------------ */

export function DequeChapter() {
  return (
    <Section id="v010dev-deque" title="2.14.4 Deque">
      <Lead>
        <code>Deque&lt;T&gt;</code> is a circular-buffer double-ended queue. Push and pop at either end are O(1)
        amortized - the right default for work queues and sliding windows.
      </Lead>
      <ApiTable rows={[
        ['pushFront / pushBack', 'Insert at the selected end.'],
        ['popFront / popBack', 'Remove and return from the selected end.'],
        ['peekFront / peekBack', 'Inspect an end without removing it.'],
        ['isEmpty / isNotEmpty / clear()', 'Checks and reset.'],
      ]} />
      <CodeBlock>{`module playground

import std.io
import std.container.deque

func main() {
    var work = Deque<String>()
    work.pushBack("normal")
    work.pushFront("urgent")
    work.pushBack("background")

    println(work.peekFront())
    println(work.popFront())
    println(work.popBack())
}`}</CodeBlock>
      <Note tone="yellow">
        Pop and peek assume a non-empty deque. Check <code>isNotEmpty</code> where emptiness is possible.
      </Note>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.14.5 Queue                                                      */
/* ------------------------------------------------------------------ */

export function QueueChapter() {
  return (
    <Section id="v010dev-queue" title="2.14.5 Queue">
      <Lead>
        <code>Queue&lt;T&gt;</code> communicates first-in-first-out processing. <code>enqueue</code> adds at the
        back; <code>dequeue</code> removes the oldest value; <code>peek</code> reads it without removing it.
      </Lead>
      <CodeBlock>{`module playground

import std.io
import std.container.queue

func main() {
    var messages = Queue<String>()
    messages.enqueue("first")
    messages.enqueue("second")

    while messages.isNotEmpty {
        println(messages.dequeue())
    }
}`}</CodeBlock>
      <p>
        <code>dequeue</code> shifts the remaining elements, so prefer a <code>Deque</code> for high-throughput
        FIFO workloads.
      </p>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.14.6 Tuples                                                     */
/* ------------------------------------------------------------------ */

export function TupleChapter() {
  return (
    <Section id="v010dev-tuple" title="2.14.6 Tuples">
      <Lead>
        A tuple groups a fixed number of values of any types. Build one with parentheses,
        <code> (a, b, c)</code>; write its type the same way, <code>(A, B, C)</code>; read it positionally with
        <code> .0</code>, <code>.1</code>, … or destructure it.
      </Lead>
      <CodeBlock>{`module playground

import std.io

func describe(): (String, Int, Bool) {
    return ("Azora", 3, true)
}

func main() {
    fin value = describe()
    println(value.0)
    println(value.1)
    println(value.2)

    fin (code, reason) = (404, "Not Found")
    println("\${code} \${reason}")
}`}</CodeBlock>
      <Note>
        Use a pack when fields have durable domain meaning. A tuple is best for short local groupings and generic
        code where position is obvious at the call site.
      </Note>
    </Section>
  )
}
