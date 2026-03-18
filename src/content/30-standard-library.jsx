import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Table from '../components/Table.jsx'

export default function StandardLibrary() {
  return (
    <Section id="standard-library" title="Standard Library">
      <p>
        The standard library ships as built-in modules imported with <code className="text-az-primary">use</code>.
        Every module uses the same language features available to user code. Import a module and
        optionally bring its contents into scope:
      </p>
      <CodeBlock>{`use std.math
use scope std::math   // brings PI, E, etc. into scope directly`}</CodeBlock>

      {/* ── std.math ── */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">std.math</h3>
      <p>Constants and common numeric operations.</p>
      <CodeBlock>{`std::math::PI     // 3.14159265358979
std::math::E      // 2.71828182845905
std::math::TAU    // 6.28318530717959`}</CodeBlock>
      <Table
        headers={['Function', 'Description']}
        rows={[
          [<code>{'abs<T>(x: T): T'}</code>, 'Absolute value'],
          [<code>{'min<T>(a: T, b: T): T'}</code>, 'Minimum of two values'],
          [<code>{'max<T>(a: T, b: T): T'}</code>, 'Maximum of two values'],
          [<code>{'clamp<T>(x: T, lo: T, hi: T): T'}</code>, 'Clamp to range [lo, hi]'],
          [<code>{'sign<T>(x: T): Int'}</code>, 'Sign: -1, 0, or 1'],
          [<code>{'lerp(a: Real, b: Real, t: Real): Real'}</code>, 'Linear interpolation'],
          [<code>{'pow<T>(base: T, exp: Int): T'}</code>, 'Exponentiation'],
          [<code>{'factorial<T>(n: T): T'}</code>, 'n!'],
          [<code>{'gcd<T>(a: T, b: T): T'}</code>, 'Greatest common divisor'],
          [<code>{'lcm<T>(a: T, b: T): T'}</code>, 'Least common multiple'],
          [<code>{'isEven<T>(n: T): Bool'}</code>, 'Parity check (even)'],
          [<code>{'isOdd<T>(n: T): Bool'}</code>, 'Parity check (odd)'],
          [<code>{'sum<T>(arr: T[]): T'}</code>, 'Sum of integer array'],
          [<code>{'sumReal<T>(arr: T[]): T'}</code>, 'Sum of real array'],
          [<code>{'product<T>(arr: T[]): T'}</code>, 'Product of array elements'],
          [<code>{'fib<T>(n: T): T'}</code>, 'Nth Fibonacci number'],
        ]}
      />

      {/* ── std.container ── */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">std.container</h3>
      <p>
        Generic container types backed by pointer arrays with automatic growth.
      </p>

      <h4 className="text-base font-semibold mt-4 mb-1 text-az-30">Tuple</h4>
      <p>
        A fixed-size heterogeneous container using variadic type parameters.
        Requires at least two elements. Fields are accessed by position.
      </p>
      <CodeBlock>{`var t = Tuple(1, 2.3, "hello", true)
t.0    // 1
t.1    // 2.3`}</CodeBlock>

      <h4 className="text-base font-semibold mt-4 mb-1 text-az-30">List&lt;T&gt;</h4>
      <p>Dynamically-sized ordered collection.</p>
      <Table
        headers={['Method', 'Description']}
        rows={[
          [<code>add(element: T)</code>, 'Append element'],
          [<code>insert(index: Int, element: T)</code>, 'Insert at index'],
          [<code>get(index: Int): T</code>, 'Read element at index'],
          [<code>set(index: Int, element: T)</code>, 'Replace element at index'],
          [<code>removeAt(index: Int): T</code>, 'Remove and return element'],
          [<code>removeFirst(): T</code>, 'Remove and return first'],
          [<code>removeLast(): T</code>, 'Remove and return last'],
          [<code>contains(element: T): Bool</code>, 'Membership test'],
          [<code>indexOf(element: T): Int</code>, 'First index of element, or -1'],
          [<code>subList(from: Int, to: Int): List&lt;T&gt;</code>, 'Sub-range [from, to)'],
          [<code>clear()</code>, 'Remove all elements'],
        ]}
      />
      <p className="mt-2 text-sm text-az-50">
        Properties: <code className="text-az-primary">length</code>,{' '}
        <code className="text-az-primary">isEmpty</code>,{' '}
        <code className="text-az-primary">isNotEmpty</code>,{' '}
        <code className="text-az-primary">first</code>,{' '}
        <code className="text-az-primary">last</code>,{' '}
        <code className="text-az-primary">reversed</code>.
        Functional: <code className="text-az-primary">forEach</code>,{' '}
        <code className="text-az-primary">map</code>,{' '}
        <code className="text-az-primary">filter</code>,{' '}
        <code className="text-az-primary">any</code>,{' '}
        <code className="text-az-primary">all</code>,{' '}
        <code className="text-az-primary">none</code>,{' '}
        <code className="text-az-primary">count</code>.
        Supports <code className="text-az-primary">oper[]</code> and{' '}
        <code className="text-az-primary">oper[]=</code>.
      </p>

      <h4 className="text-base font-semibold mt-4 mb-1 text-az-30">Set&lt;T&gt;</h4>
      <p>Unique-element collection with set algebra.</p>
      <Table
        headers={['Method', 'Description']}
        rows={[
          [<code>add(element: T): Bool</code>, 'Add element (false if duplicate)'],
          [<code>remove(element: T): Bool</code>, 'Remove element'],
          [<code>contains(element: T): Bool</code>, 'Membership test'],
          [<code>{'union(other: Set<T>): Set<T>'}</code>, 'Union of two sets'],
          [<code>{'intersect(other: Set<T>): Set<T>'}</code>, 'Intersection'],
          [<code>{'difference(other: Set<T>): Set<T>'}</code>, 'Set difference'],
          [<code>clear()</code>, 'Remove all elements'],
        ]}
      />
      <p className="mt-2 text-sm text-az-50">
        Functional: <code className="text-az-primary">forEach</code>,{' '}
        <code className="text-az-primary">filter</code>,{' '}
        <code className="text-az-primary">any</code>,{' '}
        <code className="text-az-primary">all</code>.
        Supports <code className="text-az-primary">oper![]</code> for membership check.
      </p>

      <h4 className="text-base font-semibold mt-4 mb-1 text-az-30">Map&lt;K, V&gt;</h4>
      <p>Key-value dictionary backed by parallel pointer arrays.</p>
      <Table
        headers={['Method', 'Description']}
        rows={[
          [<code>put(key: K, value: V)</code>, 'Insert or update entry'],
          [<code>get(key: K): V</code>, 'Get value by key'],
          [<code>getOrDefault(key: K, default: V): V</code>, 'Get or return fallback'],
          [<code>remove(key: K): V</code>, 'Remove entry and return value'],
          [<code>containsKey(key: K): Bool</code>, 'Check if key exists'],
          [<code>containsValue(value: V): Bool</code>, 'Check if value exists'],
          [<code>keys(): [K]</code>, 'Array of all keys'],
          [<code>values(): [V]</code>, 'Array of all values'],
          [<code>clear()</code>, 'Remove all entries'],
        ]}
      />
      <p className="mt-2 text-sm text-az-50">
        Functional: <code className="text-az-primary">forEach(action: (K, V) -&gt; Unit)</code>.
        Supports <code className="text-az-primary">oper[:]</code> and{' '}
        <code className="text-az-primary">oper[:]=</code> for key access.
      </p>

      <h4 className="text-base font-semibold mt-4 mb-1 text-az-30">Stack&lt;T&gt; / Queue&lt;T&gt;</h4>
      <Table
        headers={['Type', 'Operations']}
        rows={[
          [<code>{'Stack<T>'}</code>, <span><code>push(element)</code>, <code>pop(): T</code>, <code>peek(): T</code>, <code>clear()</code></span>],
          [<code>{'Queue<T>'}</code>, <span><code>enqueue(element)</code>, <code>dequeue(): T</code>, <code>peek(): T</code>, <code>clear()</code></span>],
        ]}
      />
      <p className="mt-2 text-sm text-az-50">
        Both expose <code className="text-az-primary">length</code>,{' '}
        <code className="text-az-primary">isEmpty</code>, and{' '}
        <code className="text-az-primary">isNotEmpty</code> properties.
      </p>

      {/* ── std.algorithm ── */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">std.algorithm</h3>
      <p>Sorting and searching on arrays.</p>
      <Table
        headers={['Function', 'Description']}
        rows={[
          [<code>{'sort<T>(arr: T[]): T[]'}</code>, 'Sort ascending (returns new array)'],
          [<code>{'sortDescending<T>(arr: T[]): T[]'}</code>, 'Sort descending'],
          [<code>{'isSorted<T>(arr: T[]): Bool'}</code>, 'Check if sorted ascending'],
          [<code>{'reverse<T>(arr: T[]): T[]'}</code>, 'Reverse array'],
          [<code>{'linearSearch<T>(arr: T[], target: T): Int'}</code>, 'Linear search, returns index or -1'],
          [<code>{'binarySearch<T>(arr: T[], target: T): Int'}</code>, 'Binary search (array must be sorted)'],
          [<code>{'minOf<T>(arr: T[]): T'}</code>, 'Minimum element'],
          [<code>{'maxOf<T>(arr: T[]): T'}</code>, 'Maximum element'],
          [<code>{'count<T>(arr: T[], target: T): Int'}</code>, 'Count occurrences'],
        ]}
      />
      <CodeBlock>{`use std.algorithm
use scope std

var data = [5, 3, 8, 1, 4]
var sorted = sort(data)        // [1, 3, 4, 5, 8]
var idx = binarySearch(sorted, 4)  // 2
var biggest = maxOf(data)      // 8`}</CodeBlock>

      {/* ── std.io / std.fmt ── */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">std.io</h3>
      <p>Formatting constants and string utilities.</p>
      <CodeBlock>{`// Constants
std::fmt::newline     // "\\n"
std::fmt::tab         // "\\t"
std::fmt::space       // " "`}</CodeBlock>
      <Table
        headers={['Function', 'Description']}
        rows={[
          [<code>separator(char: String, length: Int): String</code>, 'Repeat char N times'],
          [<code>header(title: String, width: Int): String</code>, 'Print formatted header'],
          [<code>{'intToString<T>(n: T): String'}</code>, 'Integer to string'],
          [<code>{'realToString<T>(n: T): String'}</code>, 'Real to string'],
          [<code>{'boolToString<T>(b: T): String'}</code>, 'Bool to string'],
          [<code>{'padLeft<T>(s: T, count: Int, char: T): T'}</code>, 'Left-pad a string'],
          [<code>{'padRight<T>(s: T, count: Int, char: T): T'}</code>, 'Right-pad a string'],
          [<code>{'repeatString<T>(s: T, count: Int): T'}</code>, 'Repeat a string'],
          [<code>{'joinArray<T>(arr: T[], sep: T): T'}</code>, 'Join array with separator'],
        ]}
      />

      {/* ── std.traits ── */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">std.traits</h3>
      <p>Core type specifications for generic programming.</p>
      <Table
        headers={['Spec', 'Implementors', 'Description']}
        rows={[
          [<code>Equatable</code>, 'Int, Real, String, Bool', 'Supports == and !='],
          [<code>Comparable</code>, 'Int, Real, String', 'Supports < and >'],
          [<code>Displayable</code>, 'Int, Real, String, Bool', 'Has string representation'],
          [<code>Numeric</code>, 'Int, Real', 'Supports arithmetic operators'],
        ]}
      />
      <p className="mt-2">
        The <code className="text-az-primary">promote</code> type function determines the widest
        type among a set of numeric types at compile time:
      </p>
      <CodeBlock>{`type promote(T: Type...) where T.length >= 2 {
    // promote(Int, Real) -> Real
}`}</CodeBlock>

      {/* ── std.sync ── */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">std.sync</h3>
      <p>Synchronization primitives built on the language's <code className="text-az-primary">Mutex</code> and <code className="text-az-primary">Atomic</code> builtins.</p>
      <Table
        headers={['Type', 'Description']}
        rows={[
          [<code>{'Guard<T>'}</code>, <span>Mutex-protected value. Methods: <code>read(action)</code>, <code>write(action)</code>, <code>get(): T</code></span>],
          [<code>{'CountDownLatch<T>'}</code>, <span>Thread coordination. Methods: <code>countDown()</code>. Property: <code>isReached</code></span>],
          [<code>{'SpinLock<T>'}</code>, <span>CAS-based spin lock. Methods: <code>acquire()</code>, <code>release()</code>, <code>withLock(action)</code></span>],
        ]}
      />
      <CodeBlock>{`use std.sync
use scope std

var guard = Guard(value: 0)
guard.write({ it + 1 })
guard.read({ println(it) })   // 1

withMutex(myMutex) {
    // critical section
}`}</CodeBlock>

      {/* ── std.thread ── */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">std.thread</h3>
      <p>Threading and scheduling utilities.</p>
      <Table
        headers={['Task', 'Description']}
        rows={[
          [<code>{'sleep<T>(ms: T)'}</code>, 'Suspend current task for ms milliseconds'],
          [<code>{'spawnAsync<T>(ms: T, action: () -> Unit)'}</code>, 'Spawn a concurrent task'],
          [<code>{'joinAll<T>(count: T)'}</code>, 'Wait for concurrent tasks to complete'],
        ]}
      />

      {/* ── std.channel ── */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">std.channel</h3>
      <p>Thread-safe FIFO message channel for inter-thread communication.</p>
      <Table
        headers={['Method', 'Description']}
        rows={[
          [<code>send(value: T)</code>, 'Send a message (asserts not closed)'],
          [<code>receive(): T</code>, 'Receive next message (asserts not empty)'],
          [<code>tryReceive(default: T): T</code>, 'Receive or return default'],
          [<code>close()</code>, 'Close the channel'],
        ]}
      />
      <CodeBlock>{`use std.channel
use scope std

var ch = Channel<Int>()
ch.send(42)
var msg = ch.receive()   // 42
ch.close()`}</CodeBlock>

      {/* ── std.concurrency ── */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">std.concurrency</h3>
      <p>Higher-level async patterns built on coroutines.</p>
      <Table
        headers={['Task', 'Description']}
        rows={[
          [<code>delayed(ms: Int, action: () -&gt; Unit)</code>, 'Execute action after delay'],
          [<code>{'timeout<T>(ms: T, action: () -> Unit): Bool'}</code>, 'Run with timeout, returns success'],
          [<code>{'retry<T>(attempts: T, delayMs: T, action: () -> Bool): Bool'}</code>, 'Retry action up to N times'],
          [<code>{'parallel<T>(tag: T, a: () -> Unit, b: () -> Unit)'}</code>, 'Run two actions concurrently, wait for both'],
          [<code>{'race<T>(tag: T, a: () -> Unit, b: () -> Unit)'}</code>, 'Run two actions, complete when first finishes'],
        ]}
      />
      <CodeBlock>{`use std.concurrency
use scope std

// Retry up to 3 times with 100ms delay
await retry(3, 100) {
    return tryConnect()
}

// Run with 5 second timeout
await timeout(5000) {
    fetchData()
}`}</CodeBlock>

      {/* ── Kotlin Code Generation ── */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Kotlin Code Generation</h3>
      <p>Key translations when compiling to Kotlin:</p>
      <Table
        headers={['Azora', 'Kotlin']}
        rows={[
          [<code>fin</code>, <code>val</code>],
          [<code>var</code>, <code>var</code>],
          [<code>func</code>, <code>fun</code>],
          [<code>Real</code>, <code>Double</code>],
          [<code>Bool</code>, <code>Boolean</code>],
          [<code>pack</code>, <code>data class</code>],
          [<code>enum</code>, <code>enum class</code>],
          [<code>slot</code>, <code>sealed class</code>],
          [<code>scope</code>, <code>object</code>],
          [<code>func main()</code>, <code>fun main()</code>],
          [<code>assert</code>, <code>require()</code>],
          [<code>[1, 2, 3]</code>, <code>mutableListOf(1, 2, 3)</code>],
        ]}
      />
    </Section>
  )
}
