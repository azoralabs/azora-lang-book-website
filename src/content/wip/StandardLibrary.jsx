import { ApiTable, CodeBlock, Lead, Note, Section, Subheading } from './Shared.jsx'

/**
 * "Standard Library" - every module group as its own chapter.
 * Containers, Serializer, and Time live in their own files; this file covers
 * the rest of the library plus the conventions chapter.
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
        The chapters below mirror the modules under <code>Internal/Std</code>. Most APIs carry
        <code>@experimental</code>; that annotation communicates compatibility, not quality.
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
        ['std.{result, functional, traits, random, string, char, algorithm}', 'Result types, combinators, core specs, RNG, string/char helpers, sort/search.'],
      ]} />
      <CodeBlock>{`module app

import std.io
import std.time
import std.container.list

func main() {
    fin createdAt = std::now()
    fin tags = std::listOf("azora", "wip")
    std::println(std::formatIsoInstant(createdAt))
    std::println(tags.length as String)
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
        <code>@experimental(since: "0.0.4")</code> means the API may change. <code>@stable</code> promises the
        stated compatibility boundary. <code>@deprecated</code> gives a migration path. These appear as
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
    std::println([1, 2, 3])
}`}</CodeBlock>
      <ApiTable rows={[
        ['std::println(value)', 'Print any value followed by a newline.'],
        ['fin newline = "\\n"', 'Formatting constants live under std::fmt.'],
      ]} />
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.3 Convert                                                       */
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
    std::println(s.length)        // 5
    std::println(s.isEmpty)       // false
    fin c: Char = 'A'
    std::println(c < 'z')
}`}</CodeBlock>
      <ApiTable rows={[
        ['s.length', 'Scalar count.'],
        ['s.isEmpty / s.isNotEmpty', 'Boolean checks.'],
        ['s + t', 'Concatenation.'],
        ['s * n', 'Repetition.'],
      ]} />
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

func main() {
    fin nums = [1, 2, 3, 4]
    fin doubled = nums.map { it * 2 }
    fin evens = nums.filter { it % 2 == 0 }
    std::println(doubled.length)
    std::println(evens.length)
}`}</CodeBlock>
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
}`}</CodeBlock>
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
import std.algorithm.sort

func main() {
    fin xs = [3, 1, 2]
    fin sorted = sort(xs)
    fin idx = binarySearch(sorted, 2)
    std::println(sorted[0])   // 1
    std::println(idx)
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 2.11 Memory                                                       */
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

func main() {
    var ch = channel()
    launch {
        ch.send(1)
        ch.close()
    }
    std::println(ch.receive())
}`}</CodeBlock>
    </Section>
  )
}
