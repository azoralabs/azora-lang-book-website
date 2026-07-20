import { ApiTable, CodeBlock, Lead, Note, Section, Subheading } from './Shared.jsx'

/**
 * "Current Language" - the whole language as one guided story.
 * Chapters are ordered so each builds on the previous: you can read top to bottom.
 * Every chapter is split into numbered subchapters (1.x.1, 1.x.2, …).
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
    fin total = names.size
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

      <Subheading>1.1.1 Modules and imports</Subheading>
      <p>
        Every file begins with a <code>module</code> declaration whose dotted path matches the file’s location
        under the source root. There is no <code>package</code> keyword. Imports are dotted paths; a single
        declaration, a brace group, or a wildcard can be pulled from one module.
      </p>
      <ApiTable rows={[
        ['module app.model', 'Declares the file’s module. There is no package declaration.'],
        ['import std.container.list', 'Imports everything exported by one module.'],
        ['import std.container.{list, map}', 'Imports several children of the same root.'],
        ['import std.math.abs', 'Imports a single name from a module.'],
      ]} />
      <CodeBlock>{`module app.metrics

import std.time

func sample(): Int {
    return now()
}

func qualified(): Int {
    return std::now()
}`}</CodeBlock>

      <Subheading>1.1.2 Zones and the :: path</Subheading>
      <p>
        Dots are only for module/import paths. Reaching a declaration <i>through</i> a zone uses <code>::</code>.
        A plain <code>zone</code> owns its namespace and is declared once; <code>friend zone</code> lets several
        files contribute to the same shared namespace - members are reachable by their zone path and bare access
        is rejected from outside the zone.
      </p>
      <ApiTable rows={[
        ['std::math::abs(x)', 'Reaches a declaration through its zone path. Dots are not namespace access.'],
        ['zone Name { … }', 'Owns a namespace, declared once.'],
        ['friend zone std::math { … }', 'Contributes declarations to a zone shared across files.'],
      ]} />
      <CodeBlock>{`module tools.checksum

friend zone tools::hash {
    func checksum(text: String): Int {
        return 0
    }
}

func main() {
    std::println(tools::hash::checksum("Azora"))
}`}</CodeBlock>

      <Subheading>1.1.3 Module visibility</Subheading>
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

      <Subheading>1.1.4 Comptime-conditional export (export if)</Subheading>
      <p>
        Prefix <code>module</code>/<code>import</code> with <code>export if COND</code> to publish them only
        when a compile-time flag is true. The flag comes from <code>config.az</code> (or a CLI
        <code>-D NAME=true</code> override). A <b>mandatory newline</b> separates the condition from the
        <code>module</code>/<code>import</code> line.
      </p>
      <CodeBlock>{`export if AUTO_IMPORT_MACROS
module std.macro

export if AUTO_IMPORT_MACROS
import std.container.{list, set, tuple, array}`}</CodeBlock>
      <p>
        The standard library drives this with CLI flags: <code>azora run app.az -D AUTO_IMPORT_MACROS=true</code>
        (or <code>--auto-import-macros</code>) turns the condition true and exports the module.
      </p>

      <Subheading>1.1.5 Labeled zones &amp; zone reflection</Subheading>
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

      <Subheading>1.2.1 var, let, and fin</Subheading>
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

      <Subheading>1.2.2 Type annotations and inference</Subheading>
      <p>
        Most bindings infer their type from the initializer. Annotate when the inferred type is too narrow (an
        integer literal that must be a wider type) or when there is no initializer (a field or an uninitialized
        local later assigned in every branch).
      </p>
      <CodeBlock>{`func main() {
    fin big: Long = 5          // 5 defaults to Int; annotate to widen
    var acc: Int = 0
    acc += big as Int
    std::println(acc)
}`}</CodeBlock>

      <Subheading>1.2.3 Destructuring</Subheading>
      <CodeBlock>{`func main() {
    fin pair = std::tupleOf(1, "two")
    fin (n, label) = pair
    std::println(label)
}`}</CodeBlock>
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

      <Subheading>1.3.1 Integers</Subheading>
      <ApiTable rows={[
        ['Int, UInt', 'Default signed/unsigned 32-bit integer.'],
        ['Byte, Short, Long, Cent', '8 / 16 / 64 / 128-bit integers; U-prefixed for unsigned.'],
      ]} />
      <CodeBlock>{`func main() {
    fin a: Byte = 5b
    fin b: UInt = 7u
    fin c: Long = 9L
    std::println((a as Int) + (b as Int) + (c as Int))
}`}</CodeBlock>

      <Subheading>1.3.2 Floating-point and decimal</Subheading>
      <ApiTable rows={[
        ['Real', 'Default 64-bit float.'],
        ['Float', '32-bit float.'],
        ['Decimal', 'Fixed-point 128-bit decimal (currency-grade).'],
      ]} />
      <CodeBlock>{`func main() {
    fin price: Decimal = 1.5D
    fin ratio: Float = 3.0f
    std::println(price)
    std::println(ratio)
}`}</CodeBlock>

      <Subheading>1.3.3 Bool, Char, String, Unit</Subheading>
      <ApiTable rows={[
        ['Bool', 'true / false.'],
        ['Char', 'A single Unicode scalar (single quotes).'],
        ['String', 'A UTF-8 sequence (double quotes).'],
        ['Unit', 'The type of “no meaningful value”.'],
        ['Any', 'The top type - every value is compatible with Any.'],
      ]} />

      <Subheading>1.3.4 Numeric literal forms</Subheading>
      <CodeBlock>{`fin hex = 0xFF
fin binary = 0b1010
fin octal = 0o17
fin grouped = 1_000_000`}</CodeBlock>

      <Subheading>1.3.5 Type constants</Subheading>
      <p>
        Each numeric type exposes its limits as compile-time constants through its <code>impl zone</code>, reached
        with <code>::</code>.
      </p>
      <CodeBlock>{`func main() {
    std::println(Int::MAX_VALUE)
    std::println(UInt::MIN_VALUE)
    std::println(Real::EPSILON)
}`}</CodeBlock>
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

      <Subheading>1.4.1 Arithmetic and comparison</Subheading>
      <ApiTable rows={[
        ['+ - * / %', 'Arithmetic; + and * also work on strings (concat / repeat).'],
        ['== != < <= > >=', 'Comparison, returns Bool.'],
        ['= += -= *= /= %=', 'Assignment and compound assignment.'],
        ['++ --', 'Increment / decrement.'],
      ]} />
      <CodeBlock>{`func main() {
    std::println(7 % 3)        // 1
    std::println(2 + 3 * 4)    // 14
    std::println("ab" * 3)     // ababab
}`}</CodeBlock>

      <Subheading>1.4.2 Logical and bitwise</Subheading>
      <ApiTable rows={[
        ['&& || !', 'Logical and / or / not.'],
        ['& | ^ ~ << >>', 'Bitwise and / or / xor / not / shifts.'],
      ]} />
      <CodeBlock>{`func main() {
    fin flags = 0b1010
    std::println(flags | 0b0001)   // 11
    std::println(flags << 2)       // 40
}`}</CodeBlock>

      <Subheading>1.4.3 Ranges</Subheading>
      <p>
        <code>a..b</code> is inclusive of <code>b</code>; <code>a..&lt;b</code> excludes it. Ranges are primarily
        for-loop iterables; a type must declare the range operator before its values can be iterated (the standard
        library declares it for every numeric type).
      </p>
      <CodeBlock>{`func main() {
    fin xs = arr![10, 20, 30]
    for i in 0..<xs.size { std::println(xs[i]) }
}`}</CodeBlock>

      <Subheading>1.4.4 Operator overloads</Subheading>
      <p>
        Name a method <code>oper</code> plus the symbol to overload it on your own type. The receiver is declared
        explicitly (<code>ref self</code> to read, <code>mut ref self</code> to mutate).
      </p>
      <CodeBlock>{`pack Vec2 { var x: Int; var y: Int }

impl oper+ for Vec2 { ref self, rhs ->
    return Vec2(self.x + rhs.x, self.y + rhs.y)
}`}</CodeBlock>

      <Subheading>1.4.5 Casts: as, as?, as*</Subheading>
      <ApiTable rows={[
        ['x as T   ≡ std::cast<T>(x)', 'Converting/static cast - Int→String, numeric widening/narrowing, up/down casts.'],
        ['x as? T  ≡ std::dyncast<T>(x)', 'Runtime-checked downcast; result is T? (null on mismatch).'],
        ['x as* T  ≡ std::bitcast<T>(x)', 'Bit reinterpretation (representation-preserving).'],
      ]} />
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

      <Subheading>1.4.6 Null-conditional operators</Subheading>
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
        Strings are double-quoted UTF-8. Interpolation uses <code>{'${}'}</code>; <code>+</code> concatenates and
        <code>*</code> repeats.
      </Lead>

      <Subheading>1.5.1 Literals and interpolation</Subheading>
      <CodeBlock>{`func main() {
    fin who = "Azora"
    std::println("Hello, \${who}!")
    fin x = 3
    fin y = 4
    std::println("\${x} + \${y} = \${x + y}")
    std::println("line1\\nline2")
}`}</CodeBlock>

      <Subheading>1.5.2 Operations</Subheading>
      <ApiTable rows={[
        ['s.size', 'Number of scalar values.'],
        ['s.isEmpty / s.isNotEmpty', 'Boolean checks.'],
        ['s + t', 'Concatenation.'],
        ['s * n', 'Repetition.'],
      ]} />
      <CodeBlock>{`func main() {
    fin s = "Azora"
    std::println(s.size)        // 5
    std::println(s.isEmpty)     // false
    std::println("ab" * 3)      // ababab
}`}</CodeBlock>

      <Subheading>1.5.3 Char</Subheading>
      <p>
        <code>Char</code> is a single Unicode scalar written with single quotes. Comparison and arithmetic on chars
        follow their scalar values.
      </p>
      <CodeBlock>{`func main() {
    fin c: Char = 'A'
    std::println(c < 'z')
    std::println((c as Int) + 1)   // 66
}`}</CodeBlock>
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
        Square brackets are <b>not</b> array literals in Azora. <code>[T]</code> is a <i>type</i> spelling (it
        resolves to <code>List&lt;T&gt;</code>), and <code>[T, U]</code> can describe a tuple type. To build an
        array <b>value</b>, use the <code>arr![…]</code> macro. Sets and maps come from standard-library factories.
      </Lead>

      <Subheading>1.6.1 arr![…] makes an Array</Subheading>
      <p>
        <code>arr![a, b, c]</code> expands to <code>std::arrayOf(a, b, c)</code> and produces a fixed-size
        <code>Array&lt;T&gt;</code>. Index access is zero-based and bounds-checked; <code>.size</code> and
        <code>.length</code> both report the element count.
      </p>
      <CodeBlock>{`import std.array
import std.io

func main() {
    fin nums = arr![1, 2, 3]
    std::println(nums.size)     // 3
    std::println(nums[0])       // 1
    std::println(nums.data[2])  // 3  (.data is the contiguous storage pointer)
}`}</CodeBlock>

      <Subheading>1.6.2 The [T] type</Subheading>
      <p>
        When you write a type, <code>[T]</code> resolves to <code>List&lt;T&gt;</code> through a compile-time macro
        in <code>std.macro</code>. It is a convenient shorthand for parameter and return types; it does <i>not</i>
        construct a value.
      </p>
      <CodeBlock>{`import std.container.list
import std.io

func first(xs: [Int]): Int {
    return xs.get(0)
}

func main() {
    fin xs = std::listOf(10, 20, 30)
    std::println(first(xs))     // 10
}`}</CodeBlock>

      <Subheading>1.6.3 Sets and maps via factories</Subheading>
      <p>
        There is no set or map literal. Use the standard-library constructors and mutate through the mutable
        interfaces.
      </p>
      <CodeBlock>{`import std.container.{set, map}
import std.io

func main() {
    fin flags = std::setOf(true, false, true)
    std::println(flags.size)            // 2

    var roles = std::mutableMapOf<String, Int>()
    roles.put("admin", 1)
    roles.put("user", 2)
    std::println(roles["admin"])        // 1
}`}</CodeBlock>
      <Note>
        For the full container hierarchy (read-only <code>List</code>/<code>Set</code>/<code>Map</code> specs,
        their <code>Mutable*</code> counterparts, and the concrete packs behind them), see the
        <b> Standard Library → Containers</b> chapter.
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
        Azora has <code>if</code>/<code>else</code>, <code>when</code> (pattern switch), counted <code>for</code>,
        <code>reverse for</code>, and <code>loop</code>, plus labelled <code>break</code>/<code>continue</code>.
        Counted ranges require the range operator to be declared for the operand type (the standard library does
        this for every numeric type).
      </Lead>

      <Subheading>1.7.1 if / else</Subheading>
      <p>
        <code>if</code> is an expression: a branch with a final value can be assigned. <code>else if</code> chains
        as usual.
      </p>
      <CodeBlock>{`func classify(score: Int): String {
    return if score >= 90 { "A" }
           else if score >= 80 { "B" }
           else { "C" }
}

func main() {
    std::println(classify(85))   // B
}`}</CodeBlock>

      <Subheading>1.7.2 when</Subheading>
      <p>
        <code>when</code> switches on a value. List multiple targets with commas; <code>else</code> is the default.
        Matching is exhaustive over enums.
      </p>
      <CodeBlock>{`func describe(n: Int): String {
    return when n {
        0 -> "zero"
        1, 2, 3 -> "small"
        else -> "large"
    }
}

func main() {
    std::println(describe(2))    // small
    std::println(describe(99))   // large
}`}</CodeBlock>

      <Subheading>1.7.3 for and for by</Subheading>
      <p>
        <code>for i in a..b</code> iterates <i>inclusive</i> of <code>b</code>; <code>a..&lt;b</code> excludes it.
        Add <code>by N</code> to step by <code>N</code> (default step is 1). The bound type must support the range
        operator.
      </p>
      <CodeBlock>{`func main() {
    for i in 1..<5 { std::println(i) }       // 1 2 3 4
    for i in 1..<5 by 2 { std::println(i) }  // 1 3
    fin xs = arr![10, 20, 30]
    for i in 0..<xs.size { std::println(xs[i]) }
}`}</CodeBlock>

      <Subheading>1.7.4 reverse for and reverse for by</Subheading>
      <p>
        Prefix <code>reverse</code> to walk the range backwards. <code>by</code> still sets the step magnitude.
        Reverse iteration needs the reverse range operator declared for the type.
      </p>
      <CodeBlock>{`func main() {
    reverse for i in 0..<5 { std::println(i) }      // 4 3 2 1 0
    reverse for i in 0..<10 by 3 { std::println(i) } // 9 6 3 0
}`}</CodeBlock>

      <Subheading>1.7.5 loop and loop if</Subheading>
      <p>
        <code>loop</code> is an unconditional infinite loop — <code>break</code> to exit. <code>loop if cond &#123; … &#125;</code>
        is sugar for <code>if cond &#123; loop &#123; … &#125; &#125;</code>: it enters an infinite loop only when the
        condition holds, and does nothing otherwise. Both support an optional <code>else</code> that runs if the loop
        completes without <code>break</code>.
      </p>
      <CodeBlock>{`func poll(until ready: () -> Bool): Int {
    var tries = 0
    loop {
        if ready() { break }
        tries += 1
    }
    return tries
}

func main() {
    var i = 0
    loop if i < 3 {
        std::println(i)   // 0 1 2
        i += 1
        if i == 3 { break }
    }
}`}</CodeBlock>

      <Subheading>Labelled break and continue</Subheading>
      <p>
        Prefix a loop with <code>@label</code> to break or continue an outer loop from inside a nested one.
      </p>
      <CodeBlock>{`@outer for x in 0..<xs.size {
    for y in 0..<ys.size {
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

      <Subheading>1.8.1 Declarations and parameters</Subheading>
      <CodeBlock>{`func add(a: Int, b: Int): Int { return a + b }
func greet(name: String = "world"): String { return "Hello, \${name}" }

func main() {
    std::println(add(2, 3))
    std::println(greet())
}`}</CodeBlock>

      <Subheading>1.8.2 Parameter modifiers</Subheading>
      <ApiTable rows={[
        ['value', 'Passed by value (the default).'],
        ['ref', 'Borrowed for the call; callee cannot mutate.'],
        ['mut ref', 'Borrowed exclusively; callee may mutate.'],
        ['out', 'Initialized inside the call and returned to the caller.'],
      ]} />

      <Subheading>1.8.3 Lambdas and the implicit it</Subheading>
      <CodeBlock>{`func twice(f: (Int) -> Int, x: Int): Int { return f(f(x)) }

func main() {
    std::println(twice({ it * 2 }, 5))   // 20
    fin sq = { n: Int -> n * n }
    std::println(sq(6))
}`}</CodeBlock>

      <Subheading>1.8.4 Trailing lambdas</Subheading>
      <p>
        When the last parameter is a function type, a lambda literal can be placed outside the parentheses — the
        common shape of the collection combinators.
      </p>
      <CodeBlock>{`func main() {
    fin xs = std::listOf(1, 2, 3, 4)
    fin doubled = xs.map { it * 2 }
    fin evens = xs.filter { it % 2 == 0 }
    std::println(doubled.size)
    std::println(evens.size)
}`}</CodeBlock>

      <Subheading>1.8.5 Generators: flow</Subheading>
      <p>
        A <code>flow</code> is a function that yields a sequence of values, lazily consumed by <code>for</code>.
      </p>
      <CodeBlock>{`flow squares(n: Int): Int {
    for i in 0..<n { yield i * i }
}

func main() {
    for v in squares(4) { std::println(v) }  // 0 1 4 9
}`}</CodeBlock>

      <Subheading>1.8.6 Entry point: func main and CLI args</Subheading>
      <p>
        <code>func main</code> is the program entry point. Its return type defaults to <code>Unit</code>;
        declare <code>: Int</code> to return an exit code. To receive command-line arguments, open the body
        with <code>...args[: Type] -&gt;</code> — the args bind to a synthetic variadic parameter the runtime
        fills from the CLI.
      </p>
      <CodeBlock>{`func main() {
    ...args: String ->
    if args.size > 0 { std::println(args[0]) }
}

// or, returning an exit code:
func main(): Int {
    ...args: String ->
    return 0
}`}</CodeBlock>
      <p>
        Run with <code>azora run app.az hello</code> — <code>args[0]</code> is <code>"hello"</code>. CLI flags
        are parsed first: <code>-D NAME=VAL</code> / <code>--define NAME=VAL</code> override <code>config.az</code>
        constants (and <code>export if COND</code> conditions); <code>--debug</code>/<code>--release</code>,
        <code>--test</code>, and <code>--auto-import-macros</code> map to the standard config flags.
      </p>
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

      <Subheading>1.9.1 Fields and visibility</Subheading>
      <ApiTable rows={[
        ['expose / confine / protect', 'Field visibility modifiers (public / private / protected).'],
        ['shield', 'Externally read-only, internally mutable.'],
        ['fin / var', 'Immutable / mutable field.'],
        ['opaque pack X { … }', 'Forces every field to confine; no field visibility modifier may be written.'],
      ]} />
      <CodeBlock>{`pack Counter {
    var count: Int
    fin label: String
    shield var cache: Int = 0
}

opaque pack Handle {
    // every field here is confine automatically; writing a modifier is an error
    fin fd: Int
}`}</CodeBlock>
      <Note>
        <code>opaque pack</code> makes the pack’s fields an implementation detail invisible outside the
        declaring file — the public surface is only its methods.
      </Note>

      <Subheading>1.9.2 impl blocks and methods</Subheading>
      <CodeBlock>{`impl Counter {
    func bump(): Unit { mut ref self -> self.count += 1 }
    func describe(): String { ref self -> return "\${self.label}: \${self.count}" }
}

func main() {
    var c = Counter(0, "hits")
    c.bump()
    c.count += 5
    std::println(c.describe())
}`}</CodeBlock>

      <Subheading>1.9.3 Computed properties</Subheading>
      <CodeBlock>{`impl Counter {
    prop isHigh: Bool = self.count > 10
}`}</CodeBlock>

      <Subheading>1.9.4 Constructors and destructors</Subheading>
      <ApiTable rows={[
        ['ctor(params) { … }', 'A custom constructor inside an impl.'],
        ['dtor { … }', 'A deterministic destructor.'],
      ]} />
      <CodeBlock>{`impl ctor(label: String) for Counter { mut ref self ->
    self.count = 0
    self.label = label
}`}</CodeBlock>
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

      <Subheading>1.10.1 Type parameters</Subheading>
      <CodeBlock>{`func identity<T>(x: T): T { return x }
func first<T>(xs: [T]): T { return xs.get(0) }

pack<A, B> Pair {
    fin a: A
    fin b: B
}`}</CodeBlock>

      <Subheading>1.10.2 Variadics and spread</Subheading>
      <CodeBlock>{`func sumAll(...nums: Int): Int {
    fin total = 0
    for n in nums { total += n }
    return total
}

func main() {
    std::println(sumAll(1, 2, 3, 4))
    fin rest = arr![5, 6]
    std::println(sumAll(...rest))
}`}</CodeBlock>

      <Subheading>1.10.3 Type functions</Subheading>
      <p>
        Type functions compute types at compile time (e.g. <code>type promote(T: ...Type)</code>). They are
        parameterised by <code>Type</code> values and are folded away before runtime.
      </p>
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

      <Subheading>1.11.1 Declaring and implementing a spec</Subheading>
      <CodeBlock>{`spec Comparable {
    func lessThan(other: ref self): Bool
}

impl Comparable for Int {
    func lessThan(other: ref self): Bool { return self < other }
}`}</CodeBlock>

      <Subheading>1.11.2 Callback specs and use as</Subheading>
      <p>
        A callback spec like <code>Into&lt;T&gt;</code> has no body in the spec; implementers supply one callback
        that is published under a generated name.
      </p>
      <CodeBlock>{`spec Into<T>: T (ref self) use as "to\${T.typeName}"

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

      <Subheading>1.11.3 Default methods</Subheading>
      <p>
        A spec may include default method bodies that implementers inherit unless they override them.
      </p>
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

      <Subheading>1.12.1 Enums and when</Subheading>
      <CodeBlock>{`enum Color { Red, Green, Blue }

func name(c: Color): String {
    return when c {
        .Red -> "red"
        .Green -> "green"
        .Blue -> "blue"
    }
}

func main() {
    std::println(name(Color.Green))
}`}</CodeBlock>

      <Subheading>1.12.2 Tuples</Subheading>
      <CodeBlock>{`func main() {
    fin pair = std::tupleOf(1, "two")
    std::println(pair.0)     // 1
    std::println(pair.1)     // two
    fin t = std::tupleOf(1, 2.0, "x") // variadic tuple
    std::println(t.2)
}`}</CodeBlock>

      <Subheading>1.12.3 Slots</Subheading>
      <p>
        A <code>slot</code> is a closed tagged union: a value of one of several named shapes, distinguished at
        runtime by a tag.
      </p>
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

      <Subheading>1.13.1 Error sets and failable return types</Subheading>
      <CodeBlock>{`fail ParseError {
    Empty
    Invalid
}

func parsePort(text: String): Int!ParseError {
    if text == "" { fail return .Empty }
    if text.any { it < '0' || it > '9' } { fail return .Invalid }
    return 8080
}`}</CodeBlock>

      <Subheading>1.13.2 Handling failables</Subheading>
      <ApiTable rows={[
        ['fail return .X', 'Returns an error from a failable function.'],
        ['expr catch fallback', 'If the failable expr holds an error, use fallback instead.'],
        ['try { } catch { e -> }', 'Escape-hatch exception form for throw.'],
        ['rescue { }', 'Catch and suppress - turns a thrown into a no-op.'],
      ]} />
      <CodeBlock>{`func main() {
    fin port = parsePort("8080") catch 80
    std::println(port)
}`}</CodeBlock>
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

      <Subheading>1.14.1 Declaring and unwrapping</Subheading>
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

      <Subheading>1.14.2 Null-conditional chains</Subheading>
      <p>
        <code>?.</code> short-circuits the whole chain to <code>null</code> as soon as any receiver is null.
        <code>?:</code> supplies a fallback; <code>?+=</code> mutates only when non-null.
      </p>
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

      <Subheading>1.15.1 The reference kinds</Subheading>
      <ApiTable rows={[
        ['Buffer', 'An owned value; its lifetime is the owner’s.'],
        ['ref Buffer', 'A shared borrow - callee cannot mutate.'],
        ['mut ref Buffer', 'An exclusive mutable borrow.'],
        ['shared ref Buffer', 'Thread-safe shared reference.'],
        ['weak ref Buffer', 'A non-owning reference that does not keep the target alive.'],
        ['zone { … }', 'A bounded allocation / lifetime region.'],
      ]} />

      <Subheading>1.15.2 Borrowing at the call site</Subheading>
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

      <Subheading>1.16.1 Allocation and drop</Subheading>
      <ApiTable rows={[
        ['alloc expr', 'Heap-allocate a value.'],
        ['alloc T[N]', 'Allocate a buffer of N Ts.'],
        ['*ptr', 'Dereference a pointer.'],
        ['*ptr = v', 'Store through a pointer.'],
        ['drop expr', 'Deterministic release.'],
        ['unsafe { … }', 'A block that opts out of safety checks.'],
        ['isolated(expr)', 'A defensive deep copy.'],
      ]} />
      <CodeBlock>{`func main() {
    var p = alloc 5
    std::println(*p)     // 5
    *p = 99
    std::println(*p)     // 99
    drop p
}`}</CodeBlock>

      <Subheading>1.16.2 Zones and arenas</Subheading>
      <p>
        A <code>zone</code> bounds a lifetime region; allocations inside it are released together when the zone
        ends, which is how scoped arenas and batch cleanup are expressed.
      </p>

      <Subheading>1.16.3 Pointers and unsafe</Subheading>
      <CodeBlock>{`func main() {
    unsafe {
        fin raw: Int* = alloc 42
        std::println(*raw)
    }
}`}</CodeBlock>
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
        code at build time. <code>inline fin</code> declares a compile-time constant; <code>inline for</code>
        generates declarations by iterating a compile-time list. Contracts (pre/post conditions) live in their own
        chapter.
      </Lead>

      <Subheading>1.17.1 Compile-time constants</Subheading>
      <CodeBlock>{`inline fin DEBUG = true`}</CodeBlock>

      <Subheading>1.17.2 Inline functions</Subheading>
      <CodeBlock>{`inline func square(n: Int): Int { return n * n }`}</CodeBlock>

      <Subheading>1.17.3 deepinline blocks</Subheading>
      <p>
        <code>deepinline</code> folds a whole block — including conditionals — at compile time, so build
        configuration can shape which declarations even exist.
      </p>
      <CodeBlock>{`deepinline if DEBUG {
    func banner() { std::println("== debug ==") }
}`}</CodeBlock>

      <Subheading>1.17.4 inline for — declaration generation</Subheading>
      <p>
        <code>inline for</code> expands its body once per element of a compile-time list (an int range, a list
        literal of type names, or a named list bound with <code>let X: [Type] = …</code>). It is how the standard
        library generates per-type operator impls.
      </p>
      <CodeBlock>{`inline for Ty in [Byte, Short, Int, Long] {
    bridge impl oper + for Ty
}`}</CodeBlock>

      <Subheading>1.17.5 Source splicing and metaprogramming</Subheading>
      <p>
        <code>inline "…"</code> splices generated source into the current scope at compile time (the string is
        parsed as Azora and inlined); combined with <code>inline for … with index</code> it drives variadic pack
        generation. See the <b>Macro</b> chapter in the Standard Library for the <code>arr!</code>/
        <code>vec!</code>/<code>set!</code> macros.
      </p>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.18 Contracts                                                   */
/* ------------------------------------------------------------------ */

export function Contracts() {
  return (
    <Section id="wip-contracts" title="1.18 Contracts">
      <Lead>
        Contracts state pre- and post-conditions directly on a function. They are checked (in debug builds) at the
        boundaries they describe: <code>in</code> before the body, <code>out</code> after it, with <code>zone</code>
        naming the body block. Contracts are separate from compile-time execution.
      </Lead>

      <Subheading>1.18.1 Preconditions with in</Subheading>
      <p>
        The <code>in</code> block runs before the function body; each <code>assert</code> takes an optional message.
      </p>
      <CodeBlock>{`func sqrtChecked(x: Real): Real
in {
    assert x >= 0 { "sqrt requires a non-negative input" }
} zone {
    return std::math::sqrt(x)
}`}</CodeBlock>

      <Subheading>1.18.2 Postconditions with out</Subheading>
      <p>
        The <code>out</code> block runs after the body returns. The return value is bound to <code>it</code>.
      </p>
      <CodeBlock>{`func clamp(x: Int, lo: Int, hi: Int): Int
in {
    assert lo <= hi { "lo must be <= hi" }
} out {
    assert it >= lo && it <= hi
} zone {
    if x < lo { return lo }
    if x > hi { return hi }
    return x
}`}</CodeBlock>

      <Subheading>1.18.3 assert</Subheading>
      <p>
        <code>assert</code> is also a statement inside any block. A failing assertion aborts with its message (or a
        generic one if omitted). Assertions are elided in release builds unless annotated otherwise.
      </p>
      <CodeBlock>{`func main() {
    fin n = 5
    assert n > 0 { "n must be positive" }
    std::println(n)
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.19 Concurrency & tasks                                          */
/* ------------------------------------------------------------------ */

export function ConcurrencyAndTasks() {
  return (
    <Section id="wip-concurrency" title="1.19 Concurrency & tasks">
      <Lead>
        A <code>task</code> is a suspending function. <code>async</code> starts work that you <code>await</code>
        later; children are owned by their parent task and cancellation flows through that tree.
      </Lead>

      <Subheading>1.19.1 Tasks, async, and await</Subheading>
      <CodeBlock>{`task loadUser(): User { /* … */ return User() }
task loadPosts(): List { /* … */ return std::listOf() }

task main() {
    fin u = async { loadUser() }
    fin p = async { loadPosts() }
    render(await u, await p)
}`}</CodeBlock>

      <Subheading>1.19.2 Structuring child work</Subheading>
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
/* 1.20 Reactivity & components                                      */
/* ------------------------------------------------------------------ */

export function ReactivityAndComponents() {
  return (
    <Section id="wip-reactivity" title="1.20 Reactivity & components">
      <Lead>
        A <code>view</code> is a stateful component. <code>rem</code> / <code>mem</code> / <code>ret</code>
        remember state with different lifecycles; <code>effect</code> runs side effects.
      </Lead>

      <Subheading>1.20.1 Views and remembered state</Subheading>
      <CodeBlock>{`view Counter() {
    mem count: Int = 0
    effect {
        std::println("count=\${count}")
    }
}

func main() {
    Counter()
}`}</CodeBlock>

      <Subheading>1.20.2 Memory hooks</Subheading>
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
/* 1.21 Inheritance                                                  */
/* ------------------------------------------------------------------ */

export function Inheritance() {
  return (
    <Section id="wip-inheritance" title="1.21 Inheritance (node / leaf)">
      <Lead>
        Inheritance uses <code>node</code> (an inheritable type) and <code>leaf</code> (a sealed subclass).
        Override with <code>repl func</code>; mark virtual dispatch with <code>virt</code>.
      </Lead>

      <Subheading>1.21.1 node and leaf</Subheading>
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

      <Subheading>1.21.2 Virtual dispatch</Subheading>
      <p>
        Only methods marked <code>virt</code> dispatch on the runtime type; <code>repl func</code> in a leaf
        overrides the matching virtual. Leaves are sealed — no further subclassing.
      </p>

      <Subheading>1.21.3 abstract node</Subheading>
      <p>
        Prefix a <code>node</code> with <code>abstract</code> to forbid direct instantiation — it can only be
        subclassed by a <code>leaf</code>. Constructing an abstract node directly is a compile error.
      </p>
      <CodeBlock>{`abstract node Shape {
    virt func area(): Real
}

leaf Circle(radius: Real) : Shape(radius) {
    repl func area(): Real { return 3.14 * self.radius * self.radius }
}

func main() {
    fin s: Shape = Circle(2.0)
    std::println(s.area())
    // fin bad = Shape()   // error: abstract node 'Shape' cannot be instantiated directly
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.22 Dependency injection & FFI                                   */
/* ------------------------------------------------------------------ */

export function DiAndFfi() {
  return (
    <Section id="wip-di-ffi" title="1.22 Dependency injection & FFI">
      <Lead>
        <code>solo</code> declares a singleton resolved by the DI container; <code>bridge</code> declares foreign
        functions for a specific backend target.
      </Lead>

      <Subheading>1.22.1 Solos and injection</Subheading>
      <CodeBlock>{`solo Config {
    var value: Int = 42
    func get(): Int { return self.value }
}

func main() {
    fin c = inject Config
    std::println(c.get())
}`}</CodeBlock>

      <Subheading>1.22.2 Foreign functions</Subheading>
      <CodeBlock>{`@target(.Native)
bridge .C {
    func sin use as az_sin(x: Real): Real
    func cos use as az_cos(x: Real): Real
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.23 Testing & tracing                                            */
/* ------------------------------------------------------------------ */

export function TestingAndTracing() {
  return (
    <Section id="wip-testing" title="1.23 Testing & tracing">
      <Lead>
        Tests and trace output are built in - no test framework to install. <code>assert</code> checks a
        condition with a message; <code>trace</code> prints for debugging.
      </Lead>

      <Subheading>1.23.1 Built-in tests</Subheading>
      <CodeBlock>{`test "clamp stays inside the interval" {
    assert clamp(20, 0, 10) == 10 { "should clamp high" }
    assert clamp(-2, 0, 10) == 0  { "should clamp low" }
}`}</CodeBlock>

      <Subheading>1.23.2 assert, trace, and panic</Subheading>
      <ApiTable rows={[
        ['test "name" { }', 'A built-in unit test.'],
        ['assert cond { "msg" }', 'Assert with a message.'],
        ['trace { "msg" }', 'Debug trace output.'],
        ['panic expr', 'Unrecoverable abort.'],
      ]} />
      <CodeBlock>{`func main() {
    fin x = 5
    trace { "x is \${x}" }
}`}</CodeBlock>

      <Subheading>1.23.3 Reflection-backed test asserts</Subheading>
      <p>
        Compile-time reflection lets a test assert that a type carries a decorator or conforms to a spec.
      </p>
      <CodeBlock>{`test "List carries Serializable metadata" {
    inline assert (std::reflect<List>).hasDeco<Serializable>
}`}</CodeBlock>
    </Section>
  )
}
