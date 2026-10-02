import { ApiTable, CodeBlock, Lead, Note, Section, Subheading } from './Shared.jsx'

export function StandardLibrary() {
  return (
    <Section id="v010dev-stdlib" title="2. Standard Library">
      <Lead>The library ships as Azora source with the toolchain. Import the module that owns an API;
        the compiler injects referenced declarations and their dependencies.</Lead>
      <ApiTable rows={[
        ['std.io', 'Console print and println.'],
        ['std.convert / std.format / std.traits', 'Conversions, display, comparison and other capabilities.'],
        ['std.math / std.random / std.string / std.char', 'Numeric, random and text utilities.'],
        ['std.container.* / std.algorithm.* / std.functional', 'Collections, sorting, searching and combinators.'],
        ['std.memory.* / std.allocator.*', 'Unique, Shared, Weak, Slice and allocator implementations.'],
        ['std.serializer / std.time', 'AZON value trees and portable time values.'],
        ['std.reactive / std.reflection', 'State holders and compile-time metadata.'],
        ['std.concurrency.* / std.parallelism.*', 'Experimental utilities; implementation gaps remain.'],
      ]} />
      <CodeBlock>{`module playground

import std.io
import std.container.list

func main() {
    fin tags = listOf("azora", "0.1-dev")
    println(tags.size)
}`}</CodeBlock>
      <Note>All APIs in this development edition may change. A declaration in the library does not
        guarantee support on every backend; the examples here are checked and run with the interpreter.</Note>
    </Section>
  )
}

export function ImportsAndConventions() {
  return (
    <Section id="v010dev-stdlib-conventions" title="2.1 Imports and conventions">
      <Lead>Module paths use dots. Imported functions are called by name; a named scope or a static member
        uses <code>::</code>. There is no implicit <code>std::</code> wrapper.</Lead>
      <CodeBlock>{`module playground

import std.io
import std.container.list

func main() {
    fin values = listOf(1, 2, 3)
    println(values.size)
}`}</CodeBlock>
      <Subheading>Ownership and metadata</Subheading>
      <p>A parameter of type <code>T&amp;</code> borrows read-only access; <code>T!</code> borrows
        writable access. Methods spell these receivers <code>&amp;.</code> and <code>!.</code>.
        A leading underscore marks a private declaration; <code>confined</code> narrows package visibility.</p>
      <p><code>@Since</code> records when an API appeared. <code>@Experimental</code> signals that it can
        change. Generated documentation reads these annotations from the current source.</p>
    </Section>
  )
}

export function IoChapter() {
  return (
    <Section id="v010dev-stdlib-io" title="2.2 IO">
      <Lead><code>std.io</code> provides console output. Interpolation uses <code>Display</code> for
        user-defined values; implement it or derive it when a pack should render as text.</Lead>
      <CodeBlock>{`module playground

import std.io

func main() {
    print("Azora ")
    println("0.1-dev")
    println(42)
    println(3.14)
}`}</CodeBlock>
      <ApiTable rows={[
        ['print(value)', 'Output without a newline.'],
        ['println(value)', 'Output followed by a newline.'],
      ]} />
    </Section>
  )
}

export function ConvertChapter() {
  return (
    <Section id="v010dev-stdlib-convert" title="2.3 Convert">
      <Lead>Casts describe representation; conversions describe meaning. The core <code>Into</code> and
        <code> From</code> specs expose <code>value.into&lt;T&gt;</code> and <code>T::from(value)</code>.</Lead>
      <CodeBlock>{`module playground

import std.io

func main() {
    fin n = 42
    println(n as Double)
    println(n as String)
    fin value: Int? = 7
    println(value ?? 0)
}`}</CodeBlock>
      <ApiTable rows={[
        ['value as T', 'Total cast.'],
        ['value as? T', 'Checked cast returning T?.'],
        ['value as* T', 'Bit reinterpretation.'],
        ['value.into<T> / T::from(value)', 'Conversion defined by Into / From.'],
      ]} />
    </Section>
  )
}

export function MathChapter() {
  return (
    <Section id="v010dev-stdlib-math" title="2.4 Math">
      <Lead><code>std.math</code> supplies constants, rounding, roots and trigonometry. Functions are
        imported directly. Floating-point types are <code>Float</code>, <code>Double</code> and <code>Quad</code>.</Lead>
      <CodeBlock>{`module playground

import std.io
import std.math

func main() {
    println(abs(-5))
    println(floor(3.7))
    println(sqrt(16.0))
    println(PI)
}`}</CodeBlock>
    </Section>
  )
}

export function StringsAndCharsChapter() {
  return (
    <Section id="v010dev-stdlib-strings" title="2.5 Strings and chars">
      <Lead><code>String</code> is immutable text. <code>std.string</code> adds searching and slicing;
        <code> std.char</code> supplies character helpers.</Lead>
      <CodeBlock>{`module playground

import std.io
import std.string

func main() {
    fin text = "Azora"
    println(strLength(text))
    println(strStartsWith(text, "Az"))
    println(strSlice(text, 0, 2))
    println(strCharAt(text, 0) catch '?')
}`}</CodeBlock>
      <Note>Use the validated helpers for unchecked input. <code>strCharAt</code> is failable;
        <code> strSlice</code> has a bounds precondition.</Note>
    </Section>
  )
}

export function RandomChapter() {
  return (
    <Section id="v010dev-stdlib-random" title="2.6 Random">
      <Lead><code>Random(seed)</code> creates a deterministic pseudo-random generator. Advancing it mutates
        the receiver. It is intended for simulation and tests, and is unsuitable for cryptographic secrets.</Lead>
      <CodeBlock>{`module playground

import std.io
import std.random

func main() {
    var rng = Random(42)
    println(rng.next())
    println(rng.next())
}`}</CodeBlock>
      <Note>The source also declares <code>nextInt</code>, <code>nextRange</code> and <code>nextBool</code>.
        Their read-only receiver declarations currently conflict with mutation of the generator; use
        <code> next()</code> until that library issue is resolved.</Note>
    </Section>
  )
}

export function ResultChapter() {
  return (
    <Section id="v010dev-stdlib-result" title="2.7 Optional and failable values">
      <Lead><code>std.result</code> has been removed. Use <code>T?</code> for an optional value and
        <code> T ?! E</code> for a result that may fail with a declared error.</Lead>
      <CodeBlock>{`module playground

import std.io

error LookupError { Missing }

func lookup(found: Bool): Int ?! LookupError {
    if !found { return .Missing }
    return 42
}

func main() {
    fin nickname: String? = null
    println(nickname ?? "guest")
    println(lookup(false) catch -1)
    println(lookup(true) catch -1)
}`}</CodeBlock>
      <Note><code>std.core</code> declares <code>Option&lt;T&gt;</code> with <code>Some(T)</code> and
        <code> None</code>. Generic variant payload substitution is incomplete in this compiler, so the runnable
        examples use nullable types.</Note>
    </Section>
  )
}

export function FunctionalChapter() {
  return (
    <Section id="v010dev-stdlib-functional" title="2.8 Functional">
      <Lead><code>std.functional</code> defines array combinators. Collection specs also expose member
        operations. The current <code>map</code> keeps the element type: its callback is <code>(T) → T</code>.</Lead>
      <CodeBlock>{`module playground

import std.io
import std.container.list

func main() {
    fin values = listOf(1, 2, 3, 4)
    fin doubled = values.map { it * 2 }
    fin evens = values.filter { it % 2 == 0 }
    println(doubled[0])
    println(evens.size)
}`}</CodeBlock>
      <Note>A callback expecting <code>Unit</code> must return <code>Unit</code>. A final expression such
        as <code>map.put(...)</code> returns a value; use a loop when the callback would otherwise discard it.
        A lambda that accesses outer bindings must declare its captures.</Note>
    </Section>
  )
}

export function TraitsChapter() {
  return (
    <Section id="v010dev-stdlib-traits" title="2.9 Traits">
      <Lead><code>std.traits</code> defines capabilities such as <code>Equal</code>, <code>Order</code>,
        <code> Hash</code>, <code>Clone</code> and <code>Copy</code>. Order uses a three-way comparison;
        relational operators follow from it.</Lead>
      <CodeBlock>{`module playground

import std.io
import std.traits

pack Version {
    var major: Int
    var minor: Int
}

derive (Equal, Order) for Version

func main() {
    fin first = Version(1, 0)
    fin second = Version(2, 0)
    println(first < second)
    println(first == Version(1, 0))
}`}</CodeBlock>
    </Section>
  )
}

export function AlgorithmChapter() {
  return (
    <Section id="v010dev-stdlib-algorithm" title="2.10 Algorithm">
      <Lead>Sorting and searching use arrays and an <code>Order</code> implementation. Import sorting and
        searching separately. Binary search requires ascending sorted input.</Lead>
      <CodeBlock>{`module playground

import std.io
import std.algorithm.sort
import std.algorithm.search

func main() {
    fin values = sort<Int>([3, 1, 2])
    println(values[0])
    println(binarySearch(values, 2))
    println(binarySearch(values, 9))
}`}</CodeBlock>
    </Section>
  )
}

export function MemoryChapter() {
  return (
    <Section id="v010dev-stdlib-memory" title="2.11 Memory">
      <Lead>Smart-pointer modules expose ownership explicitly. The old <code>Arc</code> and
        <code> std.memory.arc</code> API has been replaced by <code>Shared</code> and <code>SyncShared</code>.</Lead>
      <ApiTable rows={[
        ['T* / alloc / purge', 'Raw pointer, allocation and release.'],
        ['Unique<T> / uniqueOf(value)', 'Single owner of an allocation.'],
        ['Shared<T> / sharedOf(value)', 'Shared owning pointer.'],
        ['Weak<T> / weakOf(pointer)', 'Non-owning pointer; owner lifetime must be respected.'],
        ['Slice<T> / sliceOf(pointer, length)', 'Contiguous borrowed view.'],
        ['SyncShared<T>', 'Synchronization-oriented API; native thread support remains incomplete.'],
      ]} />
      <CodeBlock>{`module playground

import std.io
import std.memory.unique

func main() {
    var value = uniqueOf(10)
    println(value.get)
    value.set(20)
    println(value.get)
    value.dispose()
}`}</CodeBlock>
      <p>Allocator implementations live under <code>std.allocator</code>. Check ownership and backend
        support before integrating them; the development library is still evolving.</p>
    </Section>
  )
}

export function ConcurrencyStdlibChapter() {
  return (
    <Section id="v010dev-stdlib-concurrency" title="2.12 Concurrency">
      <Lead>Use <code>async func</code>, <code>async</code> blocks, <code>await</code> and <code>delay</code>
        for cooperative asynchronous work.</Lead>
      <CodeBlock>{`module playground

import std.io

async func fetch(): Int {
    delay 1
    return 42
}

async func main() {
    fin pending = fetch()
    println(await pending)
}`}</CodeBlock>
      <Note>The higher-level <code>std.concurrency.async</code> timeout, retry, parallel and race helpers
        remain experimental. Their generic numeric parameters and implicit captures are not fully compatible
        with the current checker. This edition uses the working language constructs above.</Note>
    </Section>
  )
}

export function ParallelismChapter() {
  return (
    <Section id="v010dev-stdlib-parallelism" title="2.13 Parallelism">
      <Lead>The files under <code>std.parallelism</code> describe experimental threading and channel APIs.
        Real OS threads, <code>Mutex</code> and <code>Atomic</code> are not implemented yet.</Lead>
      <Note>The current channel module does not type-check when its dependent declarations are injected.
        There is no runnable thread/channel example for this release. Use cooperative async work where
        appropriate, and check the language roadmap for native parallelism.</Note>
    </Section>
  )
}

export function MacroChapter() {
  return (
    <Section id="v010dev-stdlib-macro" title="2.17 Collection literals and macros">
      <Lead><code>std.macro</code> and the old collection sigil macros have been removed. Brackets construct
        an array by default; contextual collection types and factories select other containers.</Lead>
      <CodeBlock>{`module playground

import std.io
import std.container.list

func main() {
    fin values = [1, 2, 3]
    fin empty: Array<Int> = []
    fin names = listOf("Ada", "Ana")
    println(values[0])
    println(empty.length)
    println(names.size)
}`}</CodeBlock>
      <p>Write types with generics: <code>Array&lt;T&gt;</code>, <code>List&lt;T&gt;</code>,
        <code> Set&lt;T&gt;</code> and <code>Map&lt;K, V&gt;</code>. User macros start with <code>@</code>
        in both their declaration and their invocation.</p>
    </Section>
  )
}

export function ReflectionChapter() {
  return (
    <Section id="v010dev-stdlib-reflection" title="2.18 Reflection">
      <Lead><code>reflect&lt;T&gt;</code> is a compile-time handle. Annotation queries use
        <code> hasAnnot</code> and <code>annotMeta</code>; enclosing scope metadata uses
        <code> enclosingScope</code>.</Lead>
      <CodeBlock>{`module playground

import std.io
import std.reflection

annot @Label {
    fin value: String
}

@Label("point")
pack Point {
    var x: Int
}

func main() {
    inline fin labelled = reflect<Point>.hasAnnot<Label>
    println(labelled)
}`}</CodeBlock>
    </Section>
  )
}

export function ReactiveChapter() {
  return (
    <Section id="v010dev-stdlib-reactive" title="2.19 Reactive">
      <Lead><code>std.reactive</code> provides <code>State&lt;T&gt;</code> through <code>state(initial)</code>.
        Read <code>.value</code>, update with <code>set</code> or <code>update</code>, and observe with
        <code> subscribe</code>.</Lead>
      <CodeBlock>{`module playground

import std.io
import std.reactive

func main() {
    var count = state(0)
    count.set(count.value + 1)
    count.update { it + 1 }
    println(count.value)
    println(count.version)
}`}</CodeBlock>
      <p>The language also provides <code>react func</code>, <code>remember</code>, <code>retain</code>,
        <code> preserve</code> and <code>effect</code> for state lifetimes and dependency tracking.</p>
    </Section>
  )
}
