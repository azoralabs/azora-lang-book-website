import { ApiTable, CodeBlock, Lead, Note, Section, Subheading } from './Shared.jsx'

/**
 * "Standard Library" - every module group as its own chapter.
 * Containers, Serializer, and Time live in their own files; this file covers
 * the rest of the library plus the conventions chapter and the Macro/Reflection/
 * Reactive chapters appended at the end.
 */

export function StandardLibrary() {
  return (
    <Section id="wip-stdlib" title="2. Standard Library">
      <Lead>
        The standard library is ordinary Azora source installed with the toolchain. The compiler does not
        hardcode a <code>std</code> module - imports resolve from available library modules exactly like any
        other dependency.
      </Lead>
      <p>
        The chapters below mirror the modules under <code>std</code>. Most APIs carry
        <code>@Experimental</code>; that annotation communicates compatibility, not quality.
      </p>
      <ApiTable rows={[
        ['std.io', 'Console output - std::println.'],
        ['std.convert', 'Conversions: the Into / From specs and the cast lowering.'],
        ['std.math', 'Constants (PI) and math functions (abs, floor, sin, …).'],
        ['std.container.*', 'Read-only and mutable collections, queues, stacks, deques, sets, maps, tuples.'],
        ['std.memory.*', 'Allocator and smart pointers: Ptr, Unique, Arc, Weak, Slice.'],
        ['std.concurrency.*', 'Structured async utilities (timeout, retry, parallel).'],
        ['std.parallelism.*', 'Threads, channels, and synchronization primitives (Mutex).'],
        ['std.serializer', 'Lossless value trees and JSON/AZON text formats.'],
        ['std.time', 'Durations, instants, clocks, civil dates, UTC offsets, ISO-8601.'],
        ['std.{macro, reflection, reactive, result, functional, traits, random, string, char, algorithm}', 'Macros, type reflection, reactive state, Result types, combinators, core specs, RNG, string/char helpers, sort/search.'],
      ]} />
      <CodeBlock>{`module app

import std.io
import std.time
import std.container.list

func main() {
    fin createdAt = std::now()
    fin tags = std::listOf("azora", "wip")
    std::println(std::formatIsoInstant(createdAt))
    std::println(tags.size as String)
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.1 Imports & conventions                                         */
/* ------------------------------------------------------------------ */

export function ImportsAndConventions() {
  return (
    <Section id="wip-stdlib-conventions" title="2.1 Imports and conventions">
      <Lead>
        Import the narrowest module that owns the API you need. This keeps dependencies visible and avoids
        coupling to unrelated declarations in a larger zone.
      </Lead>

      <Subheading>Module paths use dots; zone access uses ::</Subheading>
      <CodeBlock>{`import std.container.list
import std.io
import std.time

func main() {
    fin values = std::listOf(1, 2, 3)
    fin current = std::now()
    std::println(values.size)
    std::println(std::formatIsoInstant(current))
}`}</CodeBlock>

      <Subheading>Experimental and stable metadata</Subheading>
      <p>
        <code>@Experimental(sinceAzora: "0.0.4")</code> means the API may change. <code>@SinceAzora</code> records
        when it appeared. <code>@Stable</code> promises the stated compatibility boundary. These appear as
        documentation badges, not prose.
      </p>
      <Note>
        Names marked <code>confine</code> are implementation details and are omitted from generated docs. Do not
        depend on them even if you can see them in source.
      </Note>

      <Subheading>Ownership in standard APIs</Subheading>
      <p>
        A <code>ref T</code> parameter is borrowed for the call. A returned owned <code>T</code> is yours.
        Mutable collections use <code>mut ref self</code>; read-only operations use <code>ref self</code>. String
        conversion goes through <code>Into&lt;String&gt;</code>, giving property-style <code>.toString</code> on
        types that implement it.
      </p>
      <CodeBlock>{`func main() {
    fin n = 42
    std::println(n.toString)   // "42" - property via Into<String>
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.2 IO                                                            */
/* ------------------------------------------------------------------ */

export function IoChapter() {
  return (
    <Section id="wip-stdlib-io" title="2.2 IO">
      <Lead>
        <code>std.io</code> is the home of console output. <code>println</code> accepts any value and prints its
        string representation followed by a newline.
      </Lead>
      <CodeBlock>{`import std.io

func main() {
    std::println("hello")
    std::println(42)
    std::println(3.14)
    std::println(arr![1, 2, 3])
}`}</CodeBlock>
      <ApiTable rows={[
        ['std::println(value)', 'Print any value followed by a newline.'],
        ['std::print(value)', 'Print without a trailing newline.'],
      ]} />
      <Subheading>String conversion</Subheading>
      <p>
        <code>println</code> renders each value through <code>Into&lt;String&gt;</code> when available, so the
        same <code>.toString</code> property you call by hand is what the console uses.
      </p>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.3 Convert (incl. cast)                                          */
/* ------------------------------------------------------------------ */

export function ConvertChapter() {
  return (
    <Section id="wip-stdlib-convert" title="2.3 Convert">
      <Lead>
        <code>std.convert</code> defines the <code>Into&lt;T&gt;</code> and <code>From&lt;T&gt;</code> specs. The
        converting cast <code>x as T</code> (i.e. <code>{'std::cast<T>(x)'}</code>) is the primitive conversion; the
        specs expose it as named properties.
      </Lead>
      <CodeBlock>{`import std.io

func main() {
    fin n = 42
    std::println(n as String)        // "42" - primitive conversion
    std::println(n.toString)         // "42" - via Into<String> for Int
    std::println(n as Real)          // 42.0
}`}</CodeBlock>
      <ApiTable rows={[
        ['Into<T>', 'A spec: implement to gain a to${T.typeName} property.'],
        ['From<T>', 'A spec: implement to gain a from${T.typeName} property.'],
        ['x as T  ≡ std::cast<T>(x)', 'The primitive converting cast used inside impls.'],
        ['x as? T ≡ std::dyncast<T>(x)', 'Runtime-checked downcast; result is T?.'],
        ['x as* T ≡ std::bitcast<T>(x)', 'Bit reinterpretation.'],
      ]} />
      <Note>
        Int, Real, Char, and Bool implement <code>Into&lt;String&gt;</code>, so each has a <code>.toString</code>
        property. You rarely call a separate <code>toString()</code> function.
      </Note>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.4 Math                                                          */
/* ------------------------------------------------------------------ */

export function MathChapter() {
  return (
    <Section id="wip-stdlib-math" title="2.4 Math">
      <Lead>
        <code>std.math</code> provides numeric constants and functions. Trigonometry and roots bind to the
        platform math library on native targets and <code>Math</code> on web targets.
      </Lead>
      <CodeBlock>{`import std.io
import std.math

func main() {
    std::println(abs(-5))
    std::println(std::math::floor(3.7))
    std::println(std::math::sqrt(16.0))
    std::println(std::math::PI)
}`}</CodeBlock>
      <ApiTable rows={[
        ['abs(x)', 'Absolute value.'],
        ['floor / ceil / round', 'Rounding helpers.'],
        ['sqrt, cbrt, pow', 'Roots and powers.'],
        ['sin, cos, tan, …', 'Trigonometry.'],
        ['min(a, b) / max(a, b)', 'Ordering helpers.'],
        ['PI, E', 'Constants.'],
      ]} />
      <Subheading>Per-type limits</Subheading>
      <p>
        Numeric limits live on each type’s <code>impl zone</code>, reached with <code>::</code>:
        <code> Int::MAX_VALUE</code>, <code>UInt::MIN_VALUE</code>, <code>Real::EPSILON</code>.
      </p>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.5 Strings & chars                                               */
/* ------------------------------------------------------------------ */

export function StringsAndCharsChapter() {
  return (
    <Section id="wip-stdlib-strings" title="2.5 Strings & chars">
      <Lead>
        <code>String</code> and <code>Char</code> are built-in types with helpers in the standard library for
        searching, slicing, and case conversion.
      </Lead>
      <CodeBlock>{`import std.io

func main() {
    fin s = "Azora"
    std::println(s.size)        // 5
    std::println(s.isEmpty)     // false
    fin c: Char = 'A'
    std::println(c < 'z')
}`}</CodeBlock>
      <ApiTable rows={[
        ['s.size', 'Scalar count.'],
        ['s.isEmpty / s.isNotEmpty', 'Boolean checks.'],
        ['s + t', 'Concatenation.'],
        ['s * n', 'Repetition.'],
        ['Char comparison', 'Orders by Unicode scalar value.'],
      ]} />
      <Subheading>Char helpers</Subheading>
      <p>
        <code>Char</code> supports comparison and conversion to its integer scalar value via <code>as Int</code>.
        Character classification helpers (digit, letter, whitespace) live alongside the string helpers.
      </p>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.6 Random                                                        */
/* ------------------------------------------------------------------ */

export function RandomChapter() {
  return (
    <Section id="wip-stdlib-random" title="2.6 Random">
      <Lead>
        <code>std.random</code> provides deterministic, seedable pseudo-random generation.
      </Lead>
      <CodeBlock>{`import std.io
import std.random

func main() {
    fin r = seed(42)
    std::println(r.nextInt(1, 100))
    std::println(r.nextReal())
}`}</CodeBlock>
      <ApiTable rows={[
        ['seed(n)', 'Create a deterministic generator.'],
        ['r.nextInt(min, max)', 'A random integer in [min, max].'],
        ['r.nextReal()', 'A random float in [0, 1).'],
      ]} />
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.7 Result                                                        */
/* ------------------------------------------------------------------ */

export function ResultChapter() {
  return (
    <Section id="wip-stdlib-result" title="2.7 Result">
      <Lead>
        <code>std.result</code> provides a <code>Result&lt;T, E&gt;</code> type for operations that succeed or
        fail with a payload, complementing the language-level failable <code>T!E</code>.
      </Lead>
      <CodeBlock>{`import std.io
import std.result

func main() {
    fin r = ok(5) catch -1
    std::println(r)
}`}</CodeBlock>
      <ApiTable rows={[
        ['ok(value)', 'A successful Result.'],
        ['err(error)', 'A failed Result.'],
        ['r.catch(fallback)', 'Unwrap or substitute a fallback.'],
        ['r.unwrapOr(fallback)', 'Same, named form.'],
      ]} />
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.8 Functional                                                    */
/* ------------------------------------------------------------------ */

export function FunctionalChapter() {
  return (
    <Section id="wip-stdlib-functional" title="2.8 Functional">
      <Lead>
        <code>std.functional</code> offers combinators for working with functions and collections: composition,
        partial application, and pipeline helpers.
      </Lead>
      <CodeBlock>{`import std.io
import std.container.list

func main() {
    fin nums = std::listOf(1, 2, 3, 4)
    fin doubled = nums.map { it * 2 }
    fin evens = nums.filter { it % 2 == 0 }
    std::println(doubled.size)   // 4
    std::println(evens.size)     // 2
}`}</CodeBlock>
      <ApiTable rows={[
        ['map(transform)', 'Transform each element.'],
        ['filter(predicate)', 'Keep matching elements.'],
        ['forEach(action)', 'Visit each element.'],
        ['any / all / none / count', 'Predicate queries.'],
      ]} />
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.9 Traits                                                        */
/* ------------------------------------------------------------------ */

export function TraitsChapter() {
  return (
    <Section id="wip-stdlib-traits" title="2.9 Traits">
      <Lead>
        <code>std.traits</code> declares the core specs shared across the library: <code>Comparable</code>,
        <code>Into</code>, <code>From</code>, and friends. Implement them on your own types to integrate with
        generic algorithms.
      </Lead>
      <CodeBlock>{`import std.io

pack Vec2 {
    var x: Int
    var y: Int
}

impl Comparable for Vec2 {
    func lessThan(other: ref self): Bool {
        return self.x < other.x
    }
}

func main() {
    fin a = Vec2(1, 2)
    fin b = Vec2(3, 4)
    std::println(a < b)   // true, via Comparable
}`}</CodeBlock>
      <ApiTable rows={[
        ['Comparable', 'Orders values with oper< (and derived oper<=, oper>, oper>=).'],
        ['Into<T> / From<T>', 'Conversions exposed as .toT / .fromT properties.'],
        ['Hashable', 'Supplies oper# for hash-based containers.'],
        ['Copyable / Cloneable', 'Value copying and cloning.'],
      ]} />
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.10 Algorithm                                                    */
/* ------------------------------------------------------------------ */

export function AlgorithmChapter() {
  return (
    <Section id="wip-stdlib-algorithm" title="2.10 Algorithm">
      <Lead>
        <code>std.algorithm</code> provides sorting and searching over indexable collections.
      </Lead>
      <CodeBlock>{`import std.io
import std.container.list
import std.algorithm.sort

func main() {
    fin xs = std::listOf(3, 1, 2)
    fin sorted = sort<Int>(xs)
    fin idx = binarySearch(sorted, 2)
    std::println(sorted.get(0))   // 1
    std::println(idx)
}`}</CodeBlock>
      <ApiTable rows={[
        ['sort<T>(xs)', 'Returns a sorted copy.'],
        ['binarySearch(xs, key)', 'Logarithmic lookup; returns an index or -1.'],
        ['minOf / maxOf', 'Extremum helpers.'],
      ]} />
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.11 Memory (incl. allocator)                                     */
/* ------------------------------------------------------------------ */

export function MemoryChapter() {
  return (
    <Section id="wip-stdlib-memory" title="2.11 Memory">
      <Lead>
        <code>std.memory</code> provides the allocator arena types and smart pointers:
        <code>Ptr</code>, <code>Unique</code>, <code>Arc</code>, <code>Weak</code>, and <code>Slice</code>.
      </Lead>
      <ApiTable rows={[
        ['Ptr<T>', 'A bare pointer.'],
        ['Unique<T>', 'Sole ownership; released on drop.'],
        ['Arc<T>', 'Atomic reference counting (thread-safe shared ownership).'],
        ['Weak<T>', 'A non-owning reference to an Arc (does not keep it alive).'],
        ['Slice<T>', 'A borrowed contiguous view.'],
      ]} />
      <CodeBlock>{`import std.io
import std.memory.arc

func main() {
    fin a = arc(10)
    fin b = a
    std::println(*a)
}`}</CodeBlock>
      <Subheading>Allocators</Subheading>
      <p>
        <code>std.allocator</code> exposes the backing allocator interface (the <code>Allocator</code> spec) used
        by <code>alloc</code> and the zone arenas. Custom allocators conform to it.
      </p>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.12 Concurrency                                                  */
/* ------------------------------------------------------------------ */

export function ConcurrencyStdlibChapter() {
  return (
    <Section id="wip-stdlib-concurrency" title="2.12 Concurrency">
      <Lead>
        <code>std.concurrency</code> builds higher-level patterns on the language’s tasks and flows: timeouts,
        retries, and parallel fan-out.
      </Lead>
      <CodeBlock>{`import std.io
import std.concurrency.async

task fetch(): Int { return 42 }

task main() {
    fin ok = timeout(100, { fetch() })
    std::println(await ok)
}`}</CodeBlock>
      <ApiTable rows={[
        ['timeout(ms, block)', 'Run a task with a deadline.'],
        ['retry(times, block)', 'Retry a failing task.'],
        ['parallel(...tasks)', 'Fan out and await all.'],
      ]} />
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.13 Parallelism                                                  */
/* ------------------------------------------------------------------ */

export function ParallelismChapter() {
  return (
    <Section id="wip-stdlib-parallelism" title="2.13 Parallelism">
      <Lead>
        <code>std.parallelism</code> covers OS-style threads, channels for message passing, and a
        <code>Mutex</code> for mutual exclusion.
      </Lead>
      <CodeBlock>{`import std.io
import std.parallelism.channel

func main() {
    var ch = channel()
    launch {
        ch.send(1)
        ch.close()
    }
    std::println(ch.receive())
}`}</CodeBlock>
      <ApiTable rows={[
        ['channel()', 'A buffered message channel.'],
        ['launch { … }', 'Spawn a detached worker.'],
        ['Mutex', 'Mutual-exclusion lock.'],
      ]} />
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.17 Macro                                                        */
/* ------------------------------------------------------------------ */

export function MacroChapter() {
  return (
    <Section id="wip-stdlib-macro" title="2.17 Macro">
      <Lead>
        <code>std.macro</code> defines the sigil macros that make common literals concise, plus the compile-time
        type macros that map short syntax to library types.
      </Lead>
      <Subheading>Value macros</Subheading>
      <ApiTable rows={[
        ['arr![a, b, c]', 'Expands to std::arrayOf(a, b, c) — an Array<T>.'],
        ['vec![]', 'Expands to std::emptyList().'],
        ['vec![1, 2, 3]', 'Expands to std::listOf(1, 2, 3) — a List<T>.'],
        ['set![]', 'Expands to std::emptySet().'],
        ['set![1, 2, 3]', 'Expands to std::setOf(1, 2, 3).'],
      ]} />
      <CodeBlock>{`import std.array
import std.container.list
import std.container.set
import std.io

func main() {
    fin nums = arr![1, 2, 3]      // Array<Int>
    fin items = vec![1, 2, 3]     // List<Int>
    fin flags = set![true, false] // Set<Bool>
    std::println(nums.size)
    std::println(items.size)
    std::println(flags.size)
}`}</CodeBlock>
      <Subheading>Type macros</Subheading>
      <p>
        In type position, <code>[T]</code> resolves to <code>std::List&lt;T&gt;</code> and <code>{'{T}'}</code> to
        <code> std::Set&lt;T&gt;</code> — shorthand for parameter and return types. These are spelling macros, not
        value constructors.
      </p>
      <CodeBlock>{`// [T] and {T} are type shorthand:
func count(xs: [Int]): Int { return xs.size }
func card(s: {Int}): Int { return s.size }`}</CodeBlock>
      <Note>
        <code>arr![…]</code> is the only array <i>value</i> literal. Plain <code>[1, 2, 3]</code> is not an array;
        <code>[T]</code> is a type. Use <code>vec![…]</code> or <code>std::listOf(…)</code> for growable lists.
      </Note>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.18 Reflection                                                   */
/* ------------------------------------------------------------------ */

export function ReflectionChapter() {
  return (
    <Section id="wip-stdlib-reflection" title="2.18 Reflection">
      <Lead>
        <code>std::reflection</code> exposes compile-time type metadata through the <code>reflector</code> /
        <code>{'std::reflect<T>'}</code> handle: a type’s name, its decorators, and the zone it was declared in.
      </Lead>
      <CodeBlock>{`import std.io

pack P {
    fin x: Int
}

func main() {
    std::println(std::reflect<P>.typeName)        // "P"
    std::println(std::reflect<P>.zone.label)      // "global"
    std::println(std::reflect<P>.hasDeco<Serializable>)
}`}</CodeBlock>
      <ApiTable rows={[
        ['std::reflect<T>', 'A compile-time reflection handle for T.'],
        ['.typeName', 'The type’s name as a String.'],
        ['.zone', 'The declaration zone (label, isInline, parent).'],
        ['.hasDeco<D>()', 'Whether the type carries decorator D.'],
        ['.decoMeta<D>()', 'The decorator’s compile-time metadata.'],
      ]} />
      <Note>
        Reflection is compile-time: <code>{'std::reflect<T>'}</code> is resolved while the compiler has the type,
        so it can drive <code>inline assert</code> in tests and metaprogramming.
      </Note>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.19 Reactive                                                     */
/* ------------------------------------------------------------------ */

export function ReactiveChapter() {
  return (
    <Section id="wip-stdlib-reactive" title="2.19 Reactive">
      <Lead>
        <code>std.reactive</code> provides the reactive primitives that back <code>view</code> components and
        reactive state holders.
      </Lead>
      <CodeBlock>{`import std.io
import std.reactive

func main() {
    var count = signal(0)
    count.set(count.get() + 1)
    std::println(count.get())
}`}</CodeBlock>
      <ApiTable rows={[
        ['signal(initial)', 'A readable, writable reactive cell.'],
        ['.get()', 'Read the current value.'],
        ['.set(value)', 'Update the value and notify observers.'],
        ['effect { … }', 'Run a side effect when tracked cells change.'],
      ]} />
      <Note>
        The <code>view</code> language construct (see Current Language → Reactivity &amp; Components) builds on
        these primitives; most programs use <code>mem</code>/<code>rem</code>/<code>ret</code> inside a
        <code> view</code> rather than the raw primitives directly.
      </Note>
    </Section>
  )
}
