import { ApiTable, CodeBlock, Lead, Note, Section, Subheading } from './Shared.jsx'

/**
 * "Current Language" - the whole language as one guided story.
 * Chapters are ordered so each builds on the previous: you can read top to bottom.
 */

export function CurrentLanguage() {
  return (
    <Section id="wip-language" title="1. Current Language">
      <Lead>
        This part of the book describes the language as it exists in the repository today. It is organised as a
        single story - read from the top, or jump to any chapter. Syntax here tracks the latest compiler, so it
        may change before the next versioned release.
      </Lead>
      <p>
        Azora is a statically-typed, native-compiled language. It aims for Kotlin-like readability while giving
        you explicit ownership, deterministic cleanup, structured concurrency, and direct control over memory.
        The active backends are the interpreter, LLVM, JavaScript, and WebAssembly.
      </p>
      <Note tone="yellow">
        Files declare a <code>module</code>, never a <code>package</code>. Imports use the <code>import</code>
        keyword and dotted paths (<code>import std.math</code>); zone-qualified access uses <code>::</code>
        (<code>std::math::abs</code>). The standard library is a real library you import - nothing is compiler magic.
      </Note>
      <CodeBlock>{`module playground

import std.container.list
import std.io

func main() {
    fin names = std::listOf("Mira", "Noah")
    fin total = names.length
    std::println("count is \${total}")
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.1 Modules & imports                                              */
/* ------------------------------------------------------------------ */

export function ModulesAndZones() {
  return (
    <Section id="wip-modules" title="1.1 Modules, imports, and zones">
      <Lead>
        A <b>module</b> locates code (it maps to a file path). A <b>zone</b> is a shared namespace that lives
        inside the code. Keeping them separate means libraries organise themselves without hardcoded roots.
      </Lead>
      <ApiTable rows={[
        ['module app.model', 'Declares the file’s module. There is no package declaration.'],
        ['import std.container.list', 'Imports everything exported by one module.'],
        ['import std.container.{list, map}', 'Imports several children of the same root.'],
        ['import std.math.abs', 'Imports a single name from a module.'],
        ['std::math::abs(x)', 'Reaches a declaration through its zone path. Dots are not namespace access.'],
        ['friend zone std::math { … }', 'Contributes declarations to a zone shared across files.'],
      ]} />
      <Subheading>Importing a leaf module</Subheading>
      <CodeBlock>{`module app.metrics

import std.time

func sample(): Int {
    return now()
}

func qualified(): Int {
    return std::now()
}`}</CodeBlock>
      <Subheading>Shared namespaces with friend zone</Subheading>
      <p>
        A plain <code>zone</code> owns its namespace and is declared once. Use <code>friend zone</code> when
        several files contribute to the same shared namespace - members are reachable by their zone path and
        bare access is rejected from outside the zone.
      </p>
      <CodeBlock>{`module tools.checksum

friend zone tools::hash {
    func checksum(text: String): Int {
        return 0
    }
}

func main() {
    std::println(tools::hash::checksum("Azora"))
}`}</CodeBlock>

      <Subheading>Module visibility</Subheading>
      <p>
        A bare <code>module x</code> is <code>expose</code> — importable everywhere, including downstream
        libraries. Prefix the declaration to narrow that reach. <code>export</code> is orthogonal: it
        <i> auto-imports</i> the module (no <code>import</code> needed) within whatever visibility scope it has.
      </p>
      <ApiTable rows={[
        ['expose module x', 'Default. Importable everywhere, downstream libraries included.'],
        ['intern module x', 'Importable only inside the declaring library.'],
        ['protect module x', 'Importable only inside the declaring folder.'],
        ['confine module x', 'Private — not importable anywhere. For test files and an app’s main module.'],
        ['export module x', 'Auto-imported everywhere (same as export expose module x).'],
        ['export intern module x', 'Auto-imported everywhere within the declaring library.'],
        ['export protect module x', 'Auto-imported within the declaring folder.'],
        ['export confine module x', 'Rejected — a confined module is private and cannot be exported.'],
      ]} />
      <CodeBlock>{`confine module app.main    // private entry point

func main() {
    std::println("only this program can see this module")
}`}</CodeBlock>
      <Note>
        <code>intern</code> is also a declaration modifier — like <code>expose</code>/<code>confine</code>/
        <code>protect</code> it can precede a <code>zone</code>, <code>pack</code>, <code>func</code>, field, and
        so on, granting visibility only inside the declaring library.
      </Note>

      <Subheading>Labeled zones &amp; zone reflection</Subheading>
      <p>
        A zone may carry a string <b>label</b>: <code>zone "my zone" &#123; … &#125;</code>. Unlike a namespace
        <code> zone Name</code>, a labeled (or anonymous) zone keeps its members at the top level — it only
        attaches metadata you can read with <code>{'std::reflect<T>'}</code>. Every declaration has a
        <code> .zone</code>; a globally-declared one reports the label <code>"global"</code>. Nesting inside an
        <code> inline</code>/<code>deepinline</code> zone marks a zone (and those nested in it) as inline.
      </p>
      <CodeBlock>{`zone "my zone" {
    pack P { fin x: Int }
}

func main() {
    std::println(std::reflect<P>.zone?.label ?? null)   // "my zone"  (null if unlabeled)
    std::println(std::reflect<P>.zone.isInline)         // false
}`}</CodeBlock>
      <CodeBlock>{`deepinline zone "a" {
    zone "b" {
        pack P { fin x: Int }
    }
}

func main() {
    std::println(std::reflect<P>.zone.isInline)               // true  (nested in a deepinline zone)
    std::println(std::reflect<P>.zone.label ?? null)          // "b"
    std::println(std::reflect<P>.zone?.zone.label ?? null)    // "a"   (enclosing zone)
    std::println(std::reflect<P>.zone?.zone.isInline ?? null) // true
}`}</CodeBlock>
      <Note>
        A declaration outside any zone reports <code>{'std::reflect<X>.zone.label == "global"'}</code> and
        <code> .zone.isInline == false</code>; the global zone has no parent, so
        <code>{' std::reflect<X>.zone?.zone'}</code> is <code>null</code>.
      </Note>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.2 Variables & bindings                                          */
/* ------------------------------------------------------------------ */

export function VariablesAndBindings() {
  return (
    <Section id="wip-variables" title="1.2 Variables & bindings">
      <Lead>
        Three binding keywords express three intents: <code>var</code> (mutable), <code>let</code> (immutable
        reference), and <code>fin</code> (deeply immutable value). Types are usually inferred.
      </Lead>
      <ApiTable rows={[
        ['var x = 0', 'A mutable variable. Reassignment and mutation are allowed.'],
        ['let name = "Ada"', 'An immutable binding (reference cannot be rebound).'],
        ['fin pi = 3', 'A deeply immutable value - compile-time foldable.'],
        ['var count: Int = 0', 'An explicit type annotation.'],
        ['threadlocal var seed = 0', 'A per-thread copy of a mutable global.'],
      ]} />
      <CodeBlock>{`func main() {
    var count = 0
    count = count + 1
    let limit = 100
    fin label = "hits"
    std::println("\${label}: \${count} of \${limit}")
}`}</CodeBlock>
      <Note>
        Prefer <code>fin</code> for constants the compiler can fold, <code>let</code> for immutable locals, and
        <code>var</code> only when you actually mutate. The compiler warns on unused or shadowed bindings.
      </Note>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.3 Primitive types                                               */
/* ------------------------------------------------------------------ */

export function PrimitiveTypes() {
  return (
    <Section id="wip-primitive-types" title="1.3 Primitive types">
      <Lead>
        Azora has fixed-width integer families, two floating-point widths plus a decimal, plus <code>Bool</code>,
        <code>Char</code>, <code>String</code>, <code>Unit</code>, and the top type <code>Any</code>.
      </Lead>
      <ApiTable rows={[
        ['Int, UInt', 'Default signed/unsigned 32-bit integer.'],
        ['Byte, Short, Long, Cent', '8 / 16 / 64 / 128-bit integers; U-prefixed for unsigned.'],
        ['Real', 'Default 64-bit float. Float is 32-bit.'],
        ['Decimal', 'Fixed-point 128-bit decimal (currency-grade).'],
        ['Bool', 'true / false.'],
        ['Char', 'A single Unicode scalar (single quotes).'],
        ['String', 'A UTF-8 sequence (double quotes).'],
        ['Unit', 'The type of “no meaningful value”.'],
        ['Any', 'The top type - every value is compatible with Any.'],
      ]} />
      <Subheading>Numeric literal suffixes</Subheading>
      <CodeBlock>{`fin a: Byte = 5b
fin b: UInt = 7u
fin c: Long = 9L
fin d: Float = 3.0f
fin e: Decimal = 1.5D
fin hex = 0xFF
fin binary = 0b1010
fin octal = 0o17
fin grouped = 1_000_000`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.4 Operators & casts                                             */
/* ------------------------------------------------------------------ */

export function OperatorsAndCasts() {
  return (
    <Section id="wip-operators" title="1.4 Operators & casts">
      <Lead>
        Azora has the usual arithmetic, comparison, logical, bitwise, and compound-assignment operators, plus
        ranges and three cast forms. Each cast is sugar for a <code>std</code> intrinsic; there is no <code>cast</code>
        keyword.
      </Lead>
      <ApiTable rows={[
        ['+ - * / %', 'Arithmetic; + and * also work on strings (concat / repeat).'],
        ['== != < <= > >=', 'Comparison, returns Bool.'],
        ['&& || !', 'Logical and / or / not.'],
        ['& | ^ ~ << >>', 'Bitwise and / or / xor / not / shifts.'],
        ['= += -= *= /= %=', 'Assignment and compound assignment.'],
        ['++ --', 'Increment / decrement.'],
        ['a..b, a..<b', 'Inclusive and exclusive ranges.'],
        ['x as T   ≡ std::cast<T>(x)', 'Converting/static cast - Int→String, numeric widening/narrowing, up/down casts.'],
        ['x as? T  ≡ std::dyncast<T>(x)', 'Runtime-checked downcast; result is T? (null on mismatch).'],
        ['x as* T  ≡ std::bitcast<T>(x)', 'Bit reinterpretation (representation-preserving).'],
      ]} />
      <Subheading>Casting values</Subheading>
      <CodeBlock>{`func main() {
    fin n = 42
    fin text = n as String            // "42"  (= std::cast<String>(n))
    fin asReal = n as Real            // 42.0
    fin maybeDog = animal as? Dog     // Dog?  - null if not a Dog
    std::println(text)
}`}</CodeBlock>
      <p>
        Primitives gain a <code>.toString</code> property through the <code>Into&lt;String&gt;</code> spec, so
        <code>5.toString</code>, <code>5 as String</code>, and <code>std::cast&lt;String&gt;(5)</code> are all
        equivalent for Int, Real, Char, and Bool.
      </p>
      <Subheading>Null-conditional operators</Subheading>
      <CodeBlock>{`fin name: String? = maybeName()
fin length = name?.length       // Int? - null if name is null
fin greeting = name ?: "guest"  // fallback value
name ?+= "!"                     // mutate only when non-null`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.5 Strings                                                       */
/* ------------------------------------------------------------------ */

export function Strings() {
  return (
    <Section id="wip-strings" title="1.5 Strings">
      <Lead>
        Strings are double-quoted UTF-8. Interpolation uses <code>${'${}'}</code>; <code>+</code> concatenates and
        <code>*</code> repeats.
      </Lead>
      <CodeBlock>{`func main() {
    fin who = "Azora"
    std::println("Hello, \${who}!")
    fin x = 3
    fin y = 4
    std::println("\${x} + \${y} = \${x + y}")
    std::println("ab" * 3)        // ababab
    std::println("line1\\nline2")
}`}</CodeBlock>
      <ApiTable rows={[
        ['s.length', 'Number of scalar values.'],
        ['s.isEmpty / s.isNotEmpty', 'Boolean checks.'],
        ['s + t', 'Concatenation.'],
        ['s * n', 'Repetition.'],
      ]} />
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.6 Arrays & collection literals                                  */
/* ------------------------------------------------------------------ */

export function ArraysAndCollections() {
  return (
    <Section id="wip-arrays" title="1.6 Arrays & collection literals">
      <Lead>
        Square brackets make arrays. Sets and maps are built with standard-library constructors
        (<code>std::setOf</code>, <code>std::emptyMap</code>) — there is no special set or map literal syntax.
      </Lead>
      <CodeBlock>{`import std.container.set

func main() {
    fin nums = [1, 2, 3]
    nums.add(4)
    std::println(nums.length)     // 4
    std::println(nums[0])         // 1

    fin flags = std::setOf(true, false, true)
    fin roles = std::emptyMap<String, Int>()
    roles.put("admin", 1)
    roles.put("user", 2)
    std::println(roles["admin"])  // 1
}`}</CodeBlock>
      <Note>
        Array literals build the immutable <code>List</code> type. For sets, maps, and mutating variants, import
        the relevant <code>std.container.*</code> module.
      </Note>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.7 Control flow                                                  */
/* ------------------------------------------------------------------ */

export function ControlFlow() {
  return (
    <Section id="wip-control-flow" title="1.7 Control flow">
      <Lead>
        Azora has <code>if</code>/<code>else</code>, <code>when</code> (pattern switch), <code>for</code>,
        <code>while</code>, <code>loop</code>, labelled <code>break</code>/<code>continue</code>, and
        <code>reverse for</code>.
      </Lead>
      <CodeBlock>{`func classify(score: Int): String {
    if score >= 90 { return "A" }
    else if score >= 80 { return "B" }
    else { return "C" }
}

func describe(n: Int): String {
    when n {
        0 -> "zero"
        1, 2, 3 -> "small"
        else -> "large"
    }
}

func main() {
    for i in 1..5 { std::println(i) }       // 1 2 3 4 5
    for i in 1..<5 by 2 { std::println(i) } // 1 3
    reverse for x in [1, 2, 3] { std::println(x) } // 3 2 1
    var i = 0
    loop {
        if i >= 3 { break }
        i += 1
    }
}`}</CodeBlock>
      <Subheading>Labelled loops</Subheading>
      <CodeBlock>{`@outer for x in xs {
    for y in ys {
        if cond { break @outer }
    }
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.8 Functions & lambdas                                           */
/* ------------------------------------------------------------------ */

export function FunctionsAndLambdas() {
  return (
    <Section id="wip-functions" title="1.8 Functions & lambdas">
      <Lead>
        Functions are declared with <code>func</code>. Parameters may have defaults and are passed by value,
        <code>ref</code>, or <code>out</code>. Lambdas are first-class; the single-parameter form can use
        implicit <code>it</code>.
      </Lead>
      <CodeBlock>{`func add(a: Int, b: Int): Int { return a + b }
func greet(name: String = "world"): String { return "Hello, \${name}" }
func twice(f: (Int) -> Int, x: Int): Int { return f(f(x)) }

func main() {
    std::println(add(2, 3))
    std::println(twice({ it * 2 }, 5))   // 20
    fin sq = { n: Int -> n * n }
    std::println(sq(6))
}`}</CodeBlock>
      <Subheading>Generators: flow</Subheading>
      <p>
        A <code>flow</code> is a function that yields a sequence of values, lazily consumed by <code>for</code>.
      </p>
      <CodeBlock>{`flow squares(n: Int): Int {
    for i in 0..<n { yield i * i }
}

func main() {
    for v in squares(4) { std::println(v) }  // 0 1 4 9
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.9 Packs, impls & properties                                     */
/* ------------------------------------------------------------------ */

export function PacksAndImpls() {
  return (
    <Section id="wip-packs" title="1.9 Packs, impls & properties">
      <Lead>
        A <code>pack</code> is a struct: a bundle of named fields. Behaviour lives in <code>impl</code> blocks;
        each method declares its receiver (<code>ref self</code> or <code>mut ref self</code>).
      </Lead>
      <CodeBlock>{`pack Counter {
    var count: Int
    fin label: String
}

impl Counter {
    prop isHigh: Bool = self.count > 10
    func bump(): Unit { mut ref self -> self.count += 1 }
    func describe(): String { ref self -> return "\${self.label}: \${self.count}" }
}

func main() {
    var c = Counter(0, "hits")
    c.bump()
    c.count += 5
    std::println(c.describe())
}`}</CodeBlock>
      <ApiTable rows={[
        ['expose / confine / protect', 'Field visibility modifiers (public / private / protected).'],
        ['shield', 'Externally read-only, internally mutable.'],
        ['prop name: T = expr', 'A computed property.'],
        ['ctor(params) { … }', 'A custom constructor inside an impl.'],
        ['dtor { … }', 'A deterministic destructor.'],
      ]} />
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.10 Generics & variadics                                         */
/* ------------------------------------------------------------------ */

export function GenericsAndVariadics() {
  return (
    <Section id="wip-generics" title="1.10 Generics & variadics">
      <Lead>
        Functions and packs take type parameters in angle brackets. A trailing <code>...T</code> declares a
        variadic parameter; <code>...arr</code> spreads an array into a call.
      </Lead>
      <CodeBlock>{`func identity<T>(x: T): T { return x }
func first<T>(xs: [T]): T { return xs[0] }

pack<A, B> Pair {
    fin a: A
    fin b: B
}

func sumAll(...nums: Int): Int {
    fin total = 0
    for n in nums { total += n }
    return total
}

func main() {
    std::println(sumAll(1, 2, 3, 4))
    fin rest = [5, 6]
    std::println(sumAll(...rest))
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.11 Specs & traits                                               */
/* ------------------------------------------------------------------ */

export function SpecsAndTraits() {
  return (
    <Section id="wip-specs" title="1.11 Specs & traits">
      <Lead>
        A <code>spec</code> is a trait - a named capability. A spec with a callback body generates a named member
        on implementers via the <code>use as</code> template.
      </Lead>
      <CodeBlock>{`spec Comparable {
    func lessThan(other: ref self): Bool
}

spec Into<T>: T { ref self } use as "to\${T.typeName}"

impl Comparable for Int {
    func lessThan(other: ref self): Bool { return self < other }
}

impl Into<String> for Int { ref self ->
    return cast self as String
}

func main() {
    fin n = 7
    std::println(n.toString)   // "7" - generated by Into<String>
}`}</CodeBlock>
      <Note>
        Because Int implements <code>Into&lt;String&gt;</code>, it gets a <code>.toString</code> property. The
        same mechanism gives <code>.fromString</code> from <code>From&lt;String&gt;</code>.
      </Note>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.12 Enums, tuples & slots                                        */
/* ------------------------------------------------------------------ */

export function EnumsTuplesSlots() {
  return (
    <Section id="wip-enums" title="1.12 Enums, tuples & slots">
      <Lead>
        <code>enum</code> is a named set of values; <code>when</code> matches them exhaustively. Tuples are
        fixed-length heterogeneous sequences. A <code>slot</code> is a closed tagged union.
      </Lead>
      <CodeBlock>{`enum Color { Red, Green, Blue }

func name(c: Color): String {
    when c {
        .Red -> "red"
        .Green -> "green"
        .Blue -> "blue"
    }
}

func main() {
    fin pair = std::tupleOf(1, "two")
    std::println(pair.0)     // 1
    std::println(pair.1)     // two
    fin t = std::tupleOf(1, 2.0, "x") // variadic tuple
    std::println(name(Color.Green))
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.13 Errors & failable types                                      */
/* ------------------------------------------------------------------ */

export function ErrorsAndFailables() {
  return (
    <Section id="wip-errors" title="1.13 Errors & failable types">
      <Lead>
        An error set (<code>fail</code>) lists the things that can go wrong. A type written <code>T!E</code> is a
        failable - either a <code>T</code> or one of the errors in <code>E</code>. Errors are values, not exceptions.
      </Lead>
      <CodeBlock>{`fail ParseError {
    Empty
    Invalid
}

func parsePort(text: String): Int!ParseError {
    if text == "" { fail return .Empty }
    if text.any { it < '0' || it > '9' } { fail return .Invalid }
    return 8080
}

func main() {
    fin port = parsePort("8080") catch 80
    std::println(port)
}`}</CodeBlock>
      <ApiTable rows={[
        ['fail return .X', 'Returns an error from a failable function.'],
        ['expr catch fallback', 'If the failable expr holds an error, use fallback instead.'],
        ['try { } catch { e -> }', 'Escape-hatch exception form for throw.'],
        ['rescue { }', 'Catch and suppress - turns a thrown into a no-op.'],
      ]} />
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.14 Nullable types                                               */
/* ------------------------------------------------------------------ */

export function NullableTypes() {
  return (
    <Section id="wip-nullable" title="1.14 Nullable types">
      <Lead>
        A trailing <code>?</code> marks a nullable type. Use <code>?.</code> for safe access and <code>?:</code>
        for a fallback.
      </Lead>
      <CodeBlock>{`func findName(id: Int): String? {
    if id == 0 { return null }
    return "Ada"
}

func main() {
    fin name = findName(1)
    fin length = name?.length        // Int?
    fin safe = name ?: "anonymous"   // String
    std::println(safe)
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.15 Ownership & references                                       */
/* ------------------------------------------------------------------ */

export function OwnershipAndReferences() {
  return (
    <Section id="wip-ownership" title="1.15 Ownership & references">
      <Lead>
        Values are owned by default. Borrowing is spelled with words - <code>ref</code>, <code>mut ref</code>,
        <code>shared ref</code>, <code>weak ref</code> - so ownership reads at the call site.
      </Lead>
      <ApiTable rows={[
        ['Buffer', 'An owned value; its lifetime is the owner’s.'],
        ['ref Buffer', 'A shared borrow - callee cannot mutate.'],
        ['mut ref Buffer', 'An exclusive mutable borrow.'],
        ['shared ref Buffer', 'Thread-safe shared reference.'],
        ['weak ref Buffer', 'A non-owning reference that does not keep the target alive.'],
        ['zone { … }', 'A bounded allocation / lifetime region.'],
      ]} />
      <CodeBlock>{`pack Buffer { var size: Int }

func inspect(b: ref Buffer): Int { return b.size }
func resize(b: mut ref Buffer, size: Int) { b.size = size }

func main() {
    var buf = Buffer(32)
    resize(mut ref buf, 64)
    std::println(inspect(ref buf))
}`}</CodeBlock>
      <Note>
        Extension methods can request <code>mut ref self</code> only when the pack has <code>expose</code>d mutable
        state. A pack with no exposed fields is mutation-shielded outside its file.
      </Note>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.16 The memory model                                             */
/* ------------------------------------------------------------------ */

export function MemoryModel() {
  return (
    <Section id="wip-memory" title="1.16 The memory model">
      <Lead>
        For systems work, Azora exposes explicit allocation, pointers, and an <code>unsafe</code> escape hatch.
        Smart pointers (<code>Unique</code>, <code>Arc</code>, <code>Weak</code>, <code>Ptr</code>,
        <code>Slice</code>) live in the standard library.
      </Lead>
      <CodeBlock>{`func main() {
    var p = alloc 5
    std::println(*p)     // 5
    *p = 99
    std::println(*p)     // 99
    drop p

    unsafe {
        fin raw: Int* = alloc 42
        std::println(*raw)
    }
}`}</CodeBlock>
      <ApiTable rows={[
        ['alloc expr', 'Heap-allocate a value.'],
        ['alloc T[N]', 'Allocate a buffer of N Ts.'],
        ['*ptr', 'Dereference a pointer.'],
        ['*ptr = v', 'Store through a pointer.'],
        ['drop expr', 'Deterministic release.'],
        ['unsafe { … }', 'A block that opts out of safety checks.'],
        ['isolated(expr)', 'A defensive deep copy.'],
      ]} />
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.17 Compile-time execution                                       */
/* ------------------------------------------------------------------ */

export function CompileTimeExecution() {
  return (
    <Section id="wip-ctce" title="1.17 Compile-time execution">
      <Lead>
        <code>inline</code>, <code>deepinline</code>, and <code>noinline</code> control how the compiler folds
        code at build time. <code>inline fin</code> declares a compile-time constant; contracts check pre/post
        conditions.
      </Lead>
      <CodeBlock>{`inline fin DEBUG = true

inline func square(n: Int): Int { return n * n }

deepinline if DEBUG {
    func banner() { std::println("== debug ==") }
}

func clamp(x: Int, lo: Int, hi: Int): Int
in {
    assert lo <= hi { "lo must be <= hi" }
} out {
    assert it >= lo && it <= hi
} zone {
    if x < lo { return lo }
    if x > hi { return hi }
    return x
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.18 Concurrency & tasks                                          */
/* ------------------------------------------------------------------ */

export function ConcurrencyAndTasks() {
  return (
    <Section id="wip-concurrency" title="1.18 Concurrency & tasks">
      <Lead>
        A <code>task</code> is a suspending function. <code>async</code> starts work that you <code>await</code>
        later; children are owned by their parent task and cancellation flows through that tree.
      </Lead>
      <CodeBlock>{`task loadUser(): User { /* … */ return User() }
task loadPosts(): List { /* … */ return std::listOf() }

task main() {
    fin u = async { loadUser() }
    fin p = async { loadPosts() }
    render(await u, await p)
}`}</CodeBlock>
      <ApiTable rows={[
        ['task name() { }', 'A suspending function.'],
        ['async { … }', 'Start a child task; returns a handle.'],
        ['await handle', 'Suspend until the handle completes.'],
        ['launch { … }', 'Fire-and-forget child, joined at scope exit.'],
        ['channel()', 'A buffered channel for task-to-task messages (stdlib).'],
        ['cancel(handle)', 'Request cancellation of a task.'],
      ]} />
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.19 Reactivity & components                                      */
/* ------------------------------------------------------------------ */

export function ReactivityAndComponents() {
  return (
    <Section id="wip-reactivity" title="1.19 Reactivity & components">
      <Lead>
        A <code>view</code> is a stateful component. <code>rem</code> / <code>mem</code> / <code>ret</code>
        remember state with different lifecycles; <code>effect</code> runs side effects.
      </Lead>
      <CodeBlock>{`view Counter() {
    mem count: Int = 0
    effect {
        std::println("count=\${count}")
    }
}

func main() {
    Counter()
}`}</CodeBlock>
      <ApiTable rows={[
        ['view Name() { … }', 'A reactive component.'],
        ['mem', 'Remember state for the current composition lifetime.'],
        ['rem', 'Remember state in a saveable/serializable form.'],
        ['ret', 'Retain state across a longer host-defined lifecycle.'],
        ['effect { … }', 'Run a side effect.'],
      ]} />
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.20 Inheritance                                                  */
/* ------------------------------------------------------------------ */

export function Inheritance() {
  return (
    <Section id="wip-inheritance" title="1.20 Inheritance (node / leaf)">
      <Lead>
        Inheritance uses <code>node</code> (an inheritable type) and <code>leaf</code> (a sealed subclass).
        Override with <code>repl func</code>; mark virtual dispatch with <code>virt</code>.
      </Lead>
      <CodeBlock>{`node Animal(name: String) {
    virt func speak(): String { return "..." }
}

leaf Dog(name: String) : Animal(name) {
    repl func speak(): String { return "Woof" }
}

func main() {
    fin a: Animal = Dog("Rex")
    std::println(a.speak())   // Woof
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.21 Dependency injection & FFI                                   */
/* ------------------------------------------------------------------ */

export function DiAndFfi() {
  return (
    <Section id="wip-di-ffi" title="1.21 Dependency injection & FFI">
      <Lead>
        <code>solo</code> declares a singleton resolved by the DI container; <code>bridge</code> declares foreign
        functions for a specific backend target.
      </Lead>
      <CodeBlock>{`solo Config {
    var value: Int = 42
    func get(): Int { return self.value }
}

func main() {
    fin c = inject Config
    std::println(c.get())
}`}</CodeBlock>
      <Subheading>Foreign functions</Subheading>
      <CodeBlock>{`@target(.Native)
bridge .C {
    func sin use as az_sin(x: Real): Real
    func cos use as az_cos(x: Real): Real
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.22 Testing & tracing                                            */
/* ------------------------------------------------------------------ */

export function TestingAndTracing() {
  return (
    <Section id="wip-testing" title="1.22 Testing & tracing">
      <Lead>
        Tests and trace output are built in - no test framework to install. <code>assert</code> checks a
        condition with a message; <code>trace</code> prints for debugging.
      </Lead>
      <CodeBlock>{`test "clamp stays inside the interval" {
    assert clamp(20, 0, 10) == 10 { "should clamp high" }
    assert clamp(-2, 0, 10) == 0  { "should clamp low" }
}

func main() {
    fin x = 5
    trace { "x is \${x}" }
}`}</CodeBlock>
      <ApiTable rows={[
        ['test "name" { }', 'A built-in unit test.'],
        ['assert cond { "msg" }', 'Assert with a message.'],
        ['trace { "msg" }', 'Debug trace output.'],
        ['panic expr', 'Unrecoverable abort.'],
      ]} />
    </Section>
  )
}
