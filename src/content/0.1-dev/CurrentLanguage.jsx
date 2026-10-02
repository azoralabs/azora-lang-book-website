import { ApiTable, CodeBlock, Lead, Note, Section, Subheading } from './Shared.jsx'

/**
 * "Current Language" - the whole language as one guided story.
 * Chapters are ordered so each builds on the previous: you can read top to bottom.
 * Every example is a complete program checked against the 0.1-dev compiler.
 */

export function CurrentLanguage() {
  return (
    <Section id="v010dev-language" title="1. Current Language">
      <Lead>
        This development edition tracks Azora 0.1-dev. It is organised as a single story - read from the top,
        or jump to any chapter. Syntax may still change before 0.1 is released.
      </Lead>
      <p>
        Azora is a statically-typed, native-compiled language. It aims for Kotlin-like readability while giving
        you explicit ownership, deterministic cleanup, structured concurrency, and direct control over memory.
        The same program runs on the interpreter or compiles to LLVM and WebAssembly.
      </p>
      <Note tone="yellow">
        Files declare a <code>module</code>. Imports use dotted module paths (<code>import std.io</code>), and
        <code>::</code> reaches inside a module or a scope (<code>import std.math::abs</code>,
        <code>tools::checksum()</code>). The standard library is a real library you import.
      </Note>
      <CodeBlock>{`module playground

import std.io
import std.container.list

func main() {
    fin names: List<String> = ["Mira", "Noah"]
    fin total = names.size
    println("count is \${total}")
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.1 Modules & imports                                              */
/* ------------------------------------------------------------------ */

export function ModulesAndScopes() {
  return (
    <Section id="v010dev-modules" title="1.1 Modules, imports, and scopes">
      <Lead>
        A <b>module</b> locates code: its dotted name matches the file’s path. A <b>scope</b> is a namespace
        that lives inside the code. Keeping the two apart lets libraries organise themselves freely.
      </Lead>

      <Subheading>1.1.1 Modules and imports</Subheading>
      <p>
        Every file begins with a <code>module</code> declaration. An import names a module with dots; a
        <code> ::</code> after the module path selects declarations inside it, singly or as a group.
      </p>
      <ApiTable rows={[
        ['module app.model', 'Declares the file’s module.'],
        ['import std.container.list', 'Imports everything one module exports.'],
        ['import std.container::{list, map}', 'Imports several modules under one root.'],
        ['import std.math::abs', 'Imports a single declaration from a module.'],
      ]} />
      <CodeBlock>{`module playground

import std.io
import std.math::abs
import std.container::{list, map}

func main() {
    println(abs(-3))
    fin xs: List<Int> = [1, 2]
    println(xs.size)
}`}</CodeBlock>

      <Subheading>1.1.2 Scopes and the :: path</Subheading>
      <p>
        <code>scope Name &#123; … &#125;</code> declares a namespace. Its members are reached with
        <code> Name::member</code>. Scopes can be reopened, and every block of the same name merges into one.
      </p>
      <CodeBlock>{`module playground

import std.io

scope tools {
    func checksum(text: String): Int {
        return text.size
    }
}

func main() {
    println(tools::checksum("Azora"))
}`}</CodeBlock>

      <Subheading>1.1.3 Visibility</Subheading>
      <p>
        Declarations are public by default. <code>protected</code> and <code>confined</code> narrow how far
        a declaration reaches; <code>exposed</code> states the default explicitly. On a module header,
        <code> exposed module</code> auto-imports the module, and <code>confined module</code> makes it
        impossible to import - the right choice for an application’s entry point or a test file.
      </p>
      <ApiTable rows={[
        ['exposed', 'Public (the default), stated explicitly.'],
        ['protected', 'Visible only inside the declaring folder.'],
        ['confined', 'Private to the declaring file.'],
        ['exposed module x', 'Auto-imported wherever it is visible - no import needed.'],
        ['confined module x', 'Not importable anywhere.'],
      ]} />
      <CodeBlock>{`module playground

import std.io

confined func helper(): Int {
    return 1
}

exposed func api(): Int {
    return helper() + 1
}

pack Account {
    exposed fin id: Int
    confined var balance: Int = 0
}

func main() {
    println(api())
    fin account = Account(7)
    println(account.id)
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.2 Variables & bindings                                          */
/* ------------------------------------------------------------------ */

export function VariablesAndBindings() {
  return (
    <Section id="v010dev-variables" title="1.2 Variables & bindings">
      <Lead>
        Three binding keywords express three intents: <code>var</code> (mutable), <code>let</code> (an
        immutable binding), and <code>fin</code> (a final value). Types are usually inferred.
      </Lead>

      <Subheading>1.2.1 var, let, and fin</Subheading>
      <ApiTable rows={[
        ['var x = 0', 'A mutable variable.'],
        ['let name = "Ada"', 'An immutable binding.'],
        ['fin pi = 3', 'A final value - foldable at compile time when its initializer is.'],
        ['var count: Int = 0', 'An explicit type annotation.'],
        ['threadlocal var seed = 0', 'A per-thread copy of a mutable global.'],
      ]} />
      <CodeBlock>{`module playground

import std.io

threadlocal var seed = 0

func main() {
    var count = 0
    count = count + 1
    let limit = 100
    fin label = "hits"
    seed += 1
    println("\${label}: \${count} of \${limit} (seed \${seed})")
}`}</CodeBlock>

      <Subheading>1.2.2 Annotations and destructuring</Subheading>
      <p>
        Annotate when the inferred type is not the one you want - a literal takes the width its declaration
        asks for. A tuple can be taken apart into several bindings at once.
      </p>
      <CodeBlock>{`module playground

import std.io

func main() {
    fin big: Long = 5
    var acc: Int = 0
    acc += big as Int
    println(acc)

    fin pair = (1, "two")
    fin (n, label) = pair
    println("\${n} \${label}")
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.3 Primitive types                                               */
/* ------------------------------------------------------------------ */

export function PrimitiveTypes() {
  return (
    <Section id="v010dev-primitive-types" title="1.3 Primitive types">
      <Lead>
        Azora has fixed-width integers, three floating-point widths, and <code>Bool</code>, <code>Char</code>,
        <code> String</code>, and <code>Unit</code>.
      </Lead>

      <Subheading>1.3.1 Numbers</Subheading>
      <ApiTable rows={[
        ['Byte, Short, Int, Long, Cent', '8 / 16 / 32 / 64 / 128-bit signed integers.'],
        ['UByte, UShort, UInt, ULong, UCent', 'The unsigned counterparts.'],
        ['Float, Double, Quad', '32 / 64 / 128-bit floating point.'],
        ['Bool, Char, String, Unit', 'Truth values, one Unicode scalar, UTF-8 text, and “no value”.'],
      ]} />
      <p>
        Literals carry no width suffix. A literal takes the type of the declaration it initialises, or you name
        the width with a conversion such as <code>Byte(5)</code>.
      </p>
      <CodeBlock>{`module playground

import std.io

func main() {
    fin a: Byte = 5
    fin b: UInt = 7
    fin c: Long = 9
    fin d = Byte(5)
    println((a as Int) + (b as Int) + (c as Int) + (d as Int))

    fin ratio: Float = 3.0
    fin precise: Double = 1.5
    fin wide: Quad = 2.5
    println(ratio)
    println(precise)
    println(wide)
}`}</CodeBlock>

      <Subheading>1.3.2 Literal forms and type constants</Subheading>
      <p>
        Integer literals may be written in hex, binary, or octal, and grouped with underscores. Each numeric type
        exposes its limits as constants reached with <code>::</code>.
      </p>
      <CodeBlock>{`module playground

import std.io

func main() {
    fin hex = 0xFF
    fin binary = 0b1010
    fin octal = 0o17
    fin grouped = 1_000_000
    println(hex + binary + octal + grouped)

    println(Byte::maxValue)
    println(Int::minValue)
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.4 Operators & casts                                             */
/* ------------------------------------------------------------------ */

export function OperatorsAndCasts() {
  return (
    <Section id="v010dev-operators" title="1.4 Operators & casts">
      <Lead>
        Azora has the usual arithmetic, comparison, logical, bitwise, and compound-assignment operators, plus
        ranges, user-defined operators, and the <code>as</code> conversion.
      </Lead>

      <Subheading>1.4.1 Arithmetic, logic, and bits</Subheading>
      <ApiTable rows={[
        ['+ - * / %', 'Arithmetic; + and * also work on strings (concatenate / repeat).'],
        ['== != < <= > >=', 'Comparison.'],
        ['&& || !', 'Logical and / or / not.'],
        ['& | ^ ~ << >>', 'Bitwise and / or / xor / not / shifts.'],
        ['= += -= *= /= %= ++ --', 'Assignment, compound assignment, increment, decrement.'],
      ]} />
      <CodeBlock>{`module playground

import std.io

func main() {
    println(7 % 3)
    println(2 + 3 * 4)
    println("ab" * 3)

    fin flags = 0b1010
    println(flags | 0b0001)
    println(flags << 2)

    var i = 0
    i++
    i += 2
    println(i)
}`}</CodeBlock>

      <Subheading>1.4.2 Ranges</Subheading>
      <ApiTable rows={[
        ['a..b', 'From a to b, including b.'],
        ['a..<b', 'From a up to, but excluding, b.'],
        ['a>..b', 'Counting down from a, excluding a, to b.'],
        ['range by n', 'Steps by n.'],
      ]} />

      <Subheading>1.4.3 Operator overloads</Subheading>
      <p>
        <code>oper</code> declares an operator beside its type. The receiver is written with its borrow:
        <code> Vec2&amp;</code> reads the left operand without taking it.
      </p>
      <CodeBlock>{`module playground

import std.io

pack Vec2 {
    var x: Int
    var y: Int
}

oper+ Vec2&.(rhs: Vec2&): Vec2 {
    return Vec2(self.x + rhs.x, self.y + rhs.y)
}

func main() {
    fin v = Vec2(1, 2) + Vec2(3, 4)
    println("\${v.x}, \${v.y}")
}`}</CodeBlock>

      <Subheading>1.4.4 Conversions with as</Subheading>
      <p>
        <code>x as T</code> converts a value: numeric widening and narrowing, and any value to its
        <code> String</code> form.
      </p>
      <CodeBlock>{`module playground

import std.io

func main() {
    fin n = 42
    fin text = n as String
    fin wide = n as Double
    println(text)
    println(wide)
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.5 Strings                                                       */
/* ------------------------------------------------------------------ */

export function Strings() {
  return (
    <Section id="v010dev-strings" title="1.5 Strings">
      <Lead>
        Strings are double-quoted UTF-8. Interpolation uses <code>{'${}'}</code>; <code>+</code> concatenates and
        <code> *</code> repeats. Text utilities live in <code>std.string</code>.
      </Lead>

      <Subheading>1.5.1 Literals, interpolation, and indexing</Subheading>
      <CodeBlock>{`module playground

import std.io

func main() {
    fin who = "Azora"
    println("Hello, \${who}!")
    fin x = 3
    fin y = 4
    println("\${x} + \${y} = \${x + y}")
    println("line1\\nline2")

    println(who.size)
    println(who[0])
}`}</CodeBlock>

      <Subheading>1.5.2 std.string</Subheading>
      <ApiTable rows={[
        ['s.size', 'Number of characters.'],
        ['s[i]', 'The character at index i (an Int).'],
        ['strIsEmpty(s) / strIsNotEmpty(s)', 'Emptiness checks.'],
        ['strToUpper(s) / strToLower(s) / strTrim(s)', 'Case and whitespace.'],
        ['strContains(s, sub) / strIndexOf(s, sub)', 'Searching.'],
        ['strSplit(s, delim)', 'Splits into an Array<String>.'],
        ['StringBuilder', 'Builds a string piece by piece.'],
      ]} />
      <CodeBlock>{`module playground

import std.io
import std.string

func main() {
    fin s = "  Azora  "
    fin trimmed = strTrim(s)
    println(strToUpper(trimmed))
    println(strIsEmpty(trimmed))
    println(strContains(trimmed, "zo"))

    fin c: Char = 'A'
    println(c < 'z')
    println((c as Int) + 1)
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.6 Arrays & collection literals                                  */
/* ------------------------------------------------------------------ */

export function ArraysAndCollections() {
  return (
    <Section id="v010dev-arrays" title="1.6 Arrays & collection literals">
      <Lead>
        One literal builds every collection. <code>[1, 2, 3]</code> becomes the array, <code>List</code>, or
        <code> Set</code> its context asks for, and <code>[key: value]</code> builds a map.
      </Lead>

      <Subheading>1.6.1 Arrays</Subheading>
      <p>
        Without a context, a list literal is a growable array. Indexing is zero-based and bounds-checked.
        <code> .() * n</code> builds <code>n</code> slots holding the element’s zero value.
      </p>
      <CodeBlock>{`module playground

import std.io
import std.container.array

func main() {
    var nums = [1, 2, 3]
    nums.add(4)
    println(nums.size)
    println(nums[0])
    println(nums)

    var zeros: Array<Int> = .() * 4
    zeros[1] = 7
    println(zeros)
}`}</CodeBlock>

      <Subheading>1.6.2 Lists, sets, and maps</Subheading>
      <CodeBlock>{`module playground

import std.io
import std.container.list
import std.container.set

func main() {
    fin xs: List<Int> = [10, 20, 30]
    println(xs[0])

    fin flags: Set<Bool> = [true, false, true]
    println(flags.size)

    var roles = ["admin": 1, "user": 2]
    roles["guest"] = 3
    println(roles["admin"])
    println(roles.size)
}`}</CodeBlock>
      <Note>
        For the container hierarchy (read-only <code>List</code>/<code>Set</code>/<code>Map</code>, their
        <code> Mutable…</code> counterparts, and the concrete packs behind them), see
        <b> Standard Library → Containers</b>.
      </Note>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.7 Control flow                                                  */
/* ------------------------------------------------------------------ */

export function ControlFlow() {
  return (
    <Section id="v010dev-control-flow" title="1.7 Control flow">
      <Lead>
        Azora has <code>if</code>/<code>else</code>, <code>when</code>, <code>for</code> over ranges and arrays,
        <code> while</code>, and <code>loop</code>, plus labelled <code>break</code>/<code>continue</code>.
      </Lead>

      <Subheading>1.7.1 if and when</Subheading>
      <p>
        <code>if</code> is an expression. <code>when</code> switches on a value; several targets share an arm
        with commas, and <code>else</code> is the default. Matching on an enum is exhaustive.
      </p>
      <CodeBlock>{`module playground

import std.io

func classify(score: Int): String {
    return if score >= 90 { "A" } else if score >= 80 { "B" } else { "C" }
}

func describe(n: Int): String {
    return when n {
        0 -> "zero"
        1, 2, 3 -> "small"
        else -> "large"
    }
}

func main() {
    println(classify(85))
    println(describe(2))
    println(describe(99))
}`}</CodeBlock>

      <Subheading>1.7.2 for, by, and counting down</Subheading>
      <p>
        A loop variable is immutable. <code>by</code> sets the step; <code>a&gt;..b</code> counts down.
      </p>
      <CodeBlock>{`module playground

import std.io

func main() {
    for i in 1..<5 { print("\${i} ") }
    println("")
    for i in 1..<10 by 3 { print("\${i} ") }
    println("")
    for i in 5>..0 { print("\${i} ") }
    println("")
    for i in 1..3 { print("\${i} ") }
    println("")
}`}</CodeBlock>

      <Subheading>1.7.3 loop, while, labels, and loop else</Subheading>
      <p>
        <code>loop</code> repeats until <code>break</code>; <code>loop &#123; … &#125; while cond</code> checks
        after each pass. Label a loop with <code>name:</code> and leave it with <code>break:name</code>. An
        <code> else</code> after a loop runs only when the loop ended without <code>break</code>.
      </p>
      <CodeBlock>{`module playground

import std.io

func main() {
    var i = 0
    loop {
        i += 1
        if i == 3 { break }
    }
    println(i)

    var n = 0
    loop {
        n += 1
    } while n < 5
    println(n)

    outer: for x in 0..<3 {
        for y in 0..<3 {
            if x + y == 3 { break:outer }
            print("\${x}\${y} ")
        }
    }
    println("")

    for x in 0..<3 {
        if x == 10 { break }
    } else {
        println("no break")
    }

    var w = 0
    while w < 2 { w += 1 }
    println(w)
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.8 Functions & lambdas                                           */
/* ------------------------------------------------------------------ */

export function FunctionsAndLambdas() {
  return (
    <Section id="v010dev-functions" title="1.8 Functions & lambdas">
      <Lead>
        Functions are declared with <code>func</code>. Parameters may have defaults and can be named at the call
        site. Lambdas are first-class; a single-parameter lambda can use the implicit <code>it</code>.
      </Lead>

      <Subheading>1.8.1 Declarations, defaults, and lambdas</Subheading>
      <p>
        A body can be a block or a single expression after <code>=</code>. When the last parameter is a
        function, the lambda can follow the parentheses.
      </p>
      <CodeBlock>{`module playground

import std.io
import std.container.list

func add(a: Int, b: Int): Int { return a + b }
func greet(name: String = "world"): String = "Hello, \${name}"
func twice(f: (Int) -> Int, x: Int): Int { return f(f(x)) }

func main() {
    println(add(2, 3))
    println(greet())
    println(greet(name: "Ada"))
    println(twice({ it * 2 }, 5))

    fin square = { n: Int -> n * n }
    println(square(6))

    fin xs: List<Int> = [1, 2, 3, 4]
    fin doubled = xs.map { it * 2 }
    fin evens = xs.filter { it % 2 == 0 }
    println(doubled[3])
    println(evens.size)
}`}</CodeBlock>

      <Subheading>1.8.2 Parameters and borrows</Subheading>
      <p>
        A parameter’s type says how the argument is passed. A plain type takes the value; <code>T&amp;</code>
        borrows it for reading; <code>T!</code> borrows it exclusively, so the function can change the
        caller’s variable. Ownership is covered in chapter 1.15.
      </p>
      <ApiTable rows={[
        ['x: T', 'Takes the value (copied, or moved with take).'],
        ['x: T&', 'A shared borrow - read only.'],
        ['x: T!', 'An exclusive borrow - may be written.'],
      ]} />
      <CodeBlock>{`module playground

import std.io

func bump(n: Int!) {
    n = n + 1
}

func main() {
    var v = 10
    bump(v)
    println(v)
}`}</CodeBlock>

      <Subheading>1.8.3 Generators</Subheading>
      <p>
        A generator is an ordinary function whose body is a <code>sequence</code> block; <code>yield</code>
        produces each value lazily. <code>.items</code> collects them.
      </p>
      <CodeBlock>{`module playground

import std.io
import std.container.list
import std.concurrency.generators

func squares(n: Int): Sequence<Int> = sequence<Int> [!] s: SequenceScope<Int> {
    for i in 0..<n {
        yield(i * i)
    }
}

func main() {
    fin values = squares(4).items
    for i in 0..<values.size {
        print("\${values[i]} ")
    }
    println("")
}`}</CodeBlock>

      <Subheading>1.8.4 The entry point</Subheading>
      <p>
        <code>func main()</code> is the program entry point. To receive command-line arguments, declare
        <code> main(args: Array&lt;String&gt;)</code>: <code>azora run app.az hello</code> passes
        <code> "hello"</code> as <code>args[0]</code>.
      </p>
      <CodeBlock>{`module playground

import std.io

func main(args: Array<String>) {
    if args.size > 0 {
        println("first argument: \${args[0]}")
    } else {
        println("no arguments")
    }
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.9 Packs, impls & properties                                     */
/* ------------------------------------------------------------------ */

export function PacksAndImpls() {
  return (
    <Section id="v010dev-packs" title="1.9 Packs, impls & properties">
      <Lead>
        A <code>pack</code> is a struct: a bundle of named fields. Behaviour lives in <code>impl</code> blocks.
        A method declares its receiver with a borrow: <code>func &amp;.name()</code> reads,
        <code> func !.name()</code> may change the value.
      </Lead>

      <Subheading>1.9.1 Fields, methods, properties, and constructors</Subheading>
      <ApiTable rows={[
        ['fin / var field', 'Immutable / mutable field; a field may have a default.'],
        ['func &.name()', 'A method that reads its receiver (self).'],
        ['func !.name()', 'A method that may change its receiver.'],
        ['prop &.name: T = expr', 'A computed property.'],
        ['ctor .(params) { … }', 'An extra constructor; the field-wise one is always available.'],
        ['dtor .() { … }', 'Cleanup that runs when the value is purged.'],
      ]} />
      <CodeBlock>{`module playground

import std.io

pack Counter {
    var count: Int
    var label: String
}

impl Counter {
    ctor .(label: String) {
        self.count = 0
        self.label = label
    }

    func !.bump() {
        self.count += 1
    }

    func &.describe(): String {
        return "\${self.label}: \${self.count}"
    }

    prop &.isHigh: Bool = self.count > 10
}

func main() {
    var hits = Counter("hits")
    hits.bump()
    hits.count += 5
    println(hits.describe())
    println(hits.isHigh)

    fin big = Counter(20, "big")
    println(big.isHigh)
}`}</CodeBlock>

      <Subheading>1.9.2 Destructors</Subheading>
      <CodeBlock>{`module playground

import std.io

pack Resource {
    fin name: String
}

impl Resource {
    dtor .() {
        println("released \${self.name}")
    }
}

func main() {
    fin file = Resource("file")
    println("using \${file.name}")
    purge file
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.10 Generics & variadics                                         */
/* ------------------------------------------------------------------ */

export function GenericsAndVariadics() {
  return (
    <Section id="v010dev-generics" title="1.10 Generics & variadics">
      <Lead>
        Type parameters follow <code>func</code> or the pack’s name. <code>...xs: T</code> declares a variadic
        parameter, and <code>...array</code> spreads an array into a call.
      </Lead>

      <Subheading>1.10.1 Type parameters and variadics</Subheading>
      <CodeBlock>{`module playground

import std.io

func<T> identity(x: T): T {
    return x
}

pack Pair<A, B> {
    fin first: A
    fin second: B
}

func sumAll(...nums: Int): Int {
    var total = 0
    for n in nums { total += n }
    return total
}

func main() {
    println(identity(7))
    fin p = Pair<String, Int>("x", 1)
    println("\${p.first} \${p.second}")
    println(sumAll(1, 2, 3, 4))
    fin rest = [5, 6]
    println(sumAll(...rest))
}`}</CodeBlock>

      <Subheading>1.10.2 Variadic generics</Subheading>
      <p>
        <code>func&lt;...T&gt;</code> takes a pack of types, so each trailing argument keeps its own type.
      </p>
      <CodeBlock>{`module playground

import std.io

func<...T> sumAll(first: Int, rest: ...T): Int {
    var total = first
    for x in rest {
        total = total + x
    }
    return total
}

func main() {
    println(sumAll(1, 2, 3))
    println(sumAll(10, 20, 30, 40))
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.11 Specs & traits                                               */
/* ------------------------------------------------------------------ */

export function SpecsAndTraits() {
  return (
    <Section id="v010dev-specs" title="1.11 Specs & traits">
      <Lead>
        A <code>spec</code> is a trait - a named capability. Types implement it with
        <code> impl Spec for Type</code>. A spec method may have a default body that implementers inherit.
      </Lead>

      <Subheading>1.11.1 Declaring and implementing a spec</Subheading>
      <p>
        A parameter typed by a spec accepts any implementer, and calls dispatch on the value’s own type.
      </p>
      <CodeBlock>{`module playground

import std.io

spec Shape {
    func &.area(): Double
    func &.describe(): String {
        return "a shape with area \${self.area()}"
    }
}

pack Circle {
    fin radius: Double
}

pack Square {
    fin side: Double
}

impl Shape for Circle {
    func &.area(): Double = 3.14 * self.radius * self.radius
}

impl Shape for Square {
    func &.area(): Double = self.side * self.side
    func &.describe(): String = "a square"
}

func report(shape: Shape&) {
    println(shape.describe())
}

func main() {
    report(Circle(1.0))
    report(Square(2.0))
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.12 Enums, tuples & variants                                     */
/* ------------------------------------------------------------------ */

export function EnumsTuplesVariants() {
  return (
    <Section id="v010dev-enums" title="1.12 Enums, tuples & variants">
      <Lead>
        <code>enum</code> is a named set of values. Tuples are fixed-length groups of values of any type. A
        <code> variant enum</code> is a tagged union: each case can carry its own payload.
      </Lead>

      <Subheading>1.12.1 Enums and tuples</Subheading>
      <CodeBlock>{`module playground

import std.io

enum Color { Red, Green, Blue }

func name(c: Color): String {
    return when c {
        .Red -> "red"
        .Green -> "green"
        .Blue -> "blue"
    }
}

func main() {
    println(name(Color.Green))

    fin pair = (1, "two")
    println(pair.0)
    println(pair.1)
}`}</CodeBlock>

      <Subheading>1.12.2 Variant enums</Subheading>
      <p>
        A <code>when</code> arm such as <code>.Rect(w, h)</code> matches a case and binds its payload.
      </p>
      <CodeBlock>{`module playground

import std.io

variant enum Shape {
    Circle(radius: Double)
    Rect(width: Double, height: Double)
    Empty
}

func area(shape: Shape): Double {
    when shape {
        .Circle(r) -> { return 3.14 * r * r }
        .Rect(w, h) -> { return w * h }
        .Empty -> { return 0.0 }
    }
}

func main() {
    println(area(Shape.Circle(1.0)))
    println(area(Shape.Rect(2.0, 3.0)))
    println(area(Shape.Empty))
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.13 Errors & failable types                                      */
/* ------------------------------------------------------------------ */

export function ErrorsAndFailables() {
  return (
    <Section id="v010dev-errors" title="1.13 Errors & failable types">
      <Lead>
        An <code>error</code> declaration lists what can go wrong. A return type written <code>T ?! E</code> is
        failable: the function returns a <code>T</code> or fails with one of <code>E</code>’s cases.
      </Lead>

      <Subheading>1.13.1 Failing and recovering</Subheading>
      <ApiTable rows={[
        ['return .Case', 'Fails with a case of the declared error set.'],
        ['expr catch fallback', 'Uses fallback when expr fails.'],
        ['try expr', 'Passes a failure on to the caller.'],
        ['try { … } catch { e -> … }', 'Handles a failure raised inside the block.'],
        ['rescue { … }', 'Runs when the enclosing function fails, and suppresses the failure.'],
      ]} />
      <CodeBlock>{`module playground

import std.io

error ParseError {
    Empty
    Invalid
}

func parsePort(text: String): Int ?! ParseError {
    if text == "" { return .Empty }
    if text == "abc" { return .Invalid }
    return 8080
}

func nextPort(text: String): Int ?! ParseError {
    fin port = try parsePort(text)
    return port + 1
}

func main() {
    println(parsePort("8080") catch 80)
    println(parsePort("") catch 80)
    println(nextPort("x") catch 0)

    try {
        println(nextPort("abc"))
    } catch { e ->
        println("failed with \${e}")
    }
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.14 Nullable types                                               */
/* ------------------------------------------------------------------ */

export function NullableTypes() {
  return (
    <Section id="v010dev-nullable" title="1.14 Nullable types">
      <Lead>
        A trailing <code>?</code> marks a nullable type. <code>?.</code> reads through a value that may be null,
        <code> ??</code> supplies a fallback, and <code>?+=</code> (and its siblings) assign only when the target
        is not null.
      </Lead>
      <CodeBlock>{`module playground

import std.io

func findName(id: Int): String? {
    if id == 0 { return null }
    return "Ada"
}

func main() {
    fin missing = findName(0) ?? "anonymous"
    println(missing)

    fin name = findName(1)
    println(name?.size ?? 0)

    var greeting: String? = "Hi"
    greeting ?+= "!"
    println(greeting ?? "")
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.15 Ownership & borrowing                                        */
/* ------------------------------------------------------------------ */

export function OwnershipAndBorrowing() {
  return (
    <Section id="v010dev-ownership" title="1.15 Ownership & borrowing">
      <Lead>
        Values have one owner. A function borrows with <code>T&amp;</code> (shared, read-only) or
        <code> T!</code> (exclusive), or takes the value itself. Moving a value that is not copyable is written
        <code> take x</code>; <code>x.clone()</code> makes an independent copy.
      </Lead>
      <CodeBlock>{`module playground

import std.io

pack Buffer {
    var size: Int
}

func inspect(b: Buffer&): Int {
    return b.size
}

func resize(b: Buffer!, size: Int) {
    b.size = size
}

func consume(b: Buffer): Int {
    return b.size * 2
}

func main() {
    var buf = Buffer(32)
    resize(buf, 64)
    println(inspect(buf))

    fin copy = buf.clone()
    println(consume(take buf))
    println(copy.size)
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.16 The memory model                                             */
/* ------------------------------------------------------------------ */

export function MemoryModel() {
  return (
    <Section id="v010dev-memory" title="1.16 The memory model">
      <Lead>
        For systems work Azora exposes explicit heap allocation and pointers. <code>alloc</code> returns a
        read-only <code>T*</code>; <code>alloc^</code> returns a writable <code>T^</code>; <code>purge</code>
        releases it.
      </Lead>
      <ApiTable rows={[
        ['alloc expr', 'Heap-allocates a value; the pointer is read-only (T*).'],
        ['alloc^ expr', 'Heap-allocates a value behind a writable pointer (T^).'],
        ['*p / *p = v', 'Reads / writes through a pointer.'],
        ['purge p', 'Releases a value deterministically.'],
        ['unsafe { … }', 'A block that opts out of safety checks.'],
        ['x.clone()', 'A deep, independent copy.'],
      ]} />
      <CodeBlock>{`module playground

import std.io

func main() {
    fin p = alloc 5
    println(*p)

    var q: Int^ = alloc^ 5
    *q = 99
    println(*q)
    purge q

    unsafe {
        fin raw: Int* = alloc 42
        println(*raw)
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
    <Section id="v010dev-ctce" title="1.17 Compile-time execution">
      <Lead>
        <code>inline</code>, <code>deepinline</code>, and <code>noinline</code> control what the compiler
        evaluates while it builds. <code>inline fin</code> is a compile-time constant, <code>inline for</code>
        unrolls a loop, and <code>deepinline if</code> decides which declarations exist at all.
      </Lead>
      <CodeBlock>{`module playground

import std.io

inline fin DEBUG = true

inline func square(n: Int): Int {
    return n * n
}

deepinline if DEBUG {
    func banner() {
        println("== debug ==")
    }
}

func main() {
    inline fin SIZE = square(8)
    println(SIZE)
    banner()
    inline for i in 0..<3 {
        println("unrolled \${i}")
    }
}`}</CodeBlock>
      <Note>
        Compile-time reflection - <code>{'reflect<T>.hasAnnot<A>'}</code> and
        <code>{' reflect<T>.annotMeta<A>'}</code> - is covered with annotations in the Standard Library
        chapter on reflection.
      </Note>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.18 Contracts                                                   */
/* ------------------------------------------------------------------ */

export function Contracts() {
  return (
    <Section id="v010dev-contracts" title="1.18 Contracts">
      <Lead>
        Contracts state pre- and post-conditions on a function: <code>in</code> runs before the body,
        <code> out</code> after it with the result bound to <code>it</code>, and <code>scope</code> holds the
        body itself. Each <code>assert</code> names the message it panics with.
      </Lead>
      <CodeBlock>{`module playground

import std.io
import std.math

func sqrtChecked(x: Double): Double
in {
    assert x >= 0.0 panic "sqrt requires a non-negative input"
} scope {
    return sqrt(x)
}

func clamp(x: Int, lo: Int, hi: Int): Int
in {
    assert lo <= hi panic "lo must be <= hi"
} out {
    assert it >= lo && it <= hi panic "result out of range"
} scope {
    if x < lo { return lo }
    if x > hi { return hi }
    return x
}

func main() {
    println(sqrtChecked(16.0))
    println(clamp(20, 0, 10))

    fin n = 5
    assert n > 0 panic "n must be positive"
    println(n)
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.19 Concurrency                                                  */
/* ------------------------------------------------------------------ */

export function Concurrency() {
  return (
    <Section id="v010dev-concurrency" title="1.19 Concurrency">
      <Lead>
        An <code>async func</code> runs as a task. Calling one starts it and returns a handle;
        <code> await</code> suspends until the result is ready. <code>async &#123; … &#125;</code> starts a block
        as a child task, and <code>delay ms</code> suspends without blocking other tasks.
      </Lead>
      <CodeBlock>{`module playground

import std.io

pack User {
    fin name: String
}

async func loadUser(): User {
    delay 10
    return User("Ada")
}

async func loadScore(): Int {
    return 42
}

async func main() {
    fin user = loadUser()
    fin score = loadScore()
    fin u = await user
    println("\${u.name} scored \${await score}")

    fin doubled = async { 21 * 2 }
    println(await doubled)
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.20 Reactivity                                                   */
/* ------------------------------------------------------------------ */

export function Reactivity() {
  return (
    <Section id="v010dev-reactivity" title="1.20 Reactivity">
      <Lead>
        A <code>react func</code> is a reactive owner. Its state survives reruns with different lifetimes, and
        <code> effect</code> blocks run side effects that track what they read.
      </Lead>
      <ApiTable rows={[
        ['react func name() { … }', 'A reactive owner.'],
        ['remember var x = …', 'Survives reruns of the owner, but not the owner being recreated.'],
        ['retain fin x = …', 'Survives the owner being recreated, within the process.'],
        ['preserve var x = …', 'Can be snapshotted and restored by a host.'],
        ['effect { … }', 'Runs when anything it reads changes.'],
        ['effect name { … }', 'Runs when name changes.'],
        ['effect defer { … }', 'Runs when the owner is torn down.'],
      ]} />
      <CodeBlock>{`module playground

import std.io

pack Draft {
    var body: String
}

react func counter() {
    remember var count: Int = 0
    retain fin started = "session"
    preserve var draft = Draft("")
    count = count + 1
    draft = Draft("text \${count}")

    effect {
        println("\${started}: count=\${count}, draft='\${draft.body}'")
    }

    effect count {
        println("count changed to \${count}")
    }

    effect defer {
        println("cleanup")
    }
}

react func main() {
    counter()
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.21 Polymorphism                                                 */
/* ------------------------------------------------------------------ */

export function Polymorphism() {
  return (
    <Section id="v010dev-polymorphism" title="1.21 Polymorphism">
      <Lead>
        Azora has no class inheritance. Shared behaviour is a <code>spec</code>, and a value of any implementer
        can stand where the spec is expected; calls dispatch on the value’s own type. Closed sets of shapes are
        a <code>variant enum</code> (chapter 1.12).
      </Lead>
      <CodeBlock>{`module playground

import std.io

spec Animal {
    func &.name(): String
    func &.speak(): String {
        return "..."
    }
}

pack Dog {
    fin called: String
}

pack Fish {
    fin called: String
}

impl Animal for Dog {
    func &.name(): String = self.called
    func &.speak(): String = "Woof"
}

impl Animal for Fish {
    func &.name(): String = self.called
}

func introduce(animal: Animal&) {
    println("\${animal.name()} says \${animal.speak()}")
}

func main() {
    introduce(Dog("Rex"))
    introduce(Fish("Nemo"))
}`}</CodeBlock>
      <Note>
        Earlier drafts had <code>node</code>/<code>leaf</code> inheritance with <code>virt</code> and
        <code> repl</code>. They are gone; specs cover the same ground without a class hierarchy.
      </Note>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.22 Dependency injection & FFI                                   */
/* ------------------------------------------------------------------ */

export function DiAndFfi() {
  return (
    <Section id="v010dev-di-ffi" title="1.22 Dependency injection & FFI">
      <Lead>
        A <code>solo pack</code> is a type there is exactly one of. A <code>graph</code> declares how each
        service is built, and <code>inject</code> resolves it. <code>bridge</code> declares foreign functions.
      </Lead>

      <Subheading>1.22.1 Solos, graphs, and injection</Subheading>
      <ApiTable rows={[
        ['solo pack Name { … }', 'A singleton type.'],
        ['graph G { solo Type(args) }', 'Registers how a service is built.'],
        ['solo Type(args) binds Spec', 'Also answers inject Spec with this service.'],
        ['inject Type', 'Resolves the shared instance.'],
        ['lazy fin x = inject Type', 'Resolves it on first read.'],
      ]} />
      <CodeBlock>{`module playground

import std.io

spec Clock {
    func &.now(): Int
}

pack SystemClock {
    fin offset: Int = 0
}

impl Clock for SystemClock {
    func &.now(): Int = 1000 + self.offset
}

solo pack Config {
    var retries: Int = 3
}

graph AppGraph {
    solo Config()
    solo SystemClock(5) binds Clock
}

func main() {
    fin config = inject Config
    println(config.retries)

    lazy fin clock = inject Clock
    println(clock.now())
}`}</CodeBlock>

      <Subheading>1.22.2 Foreign functions</Subheading>
      <p>
        <code>bridge .C &#123; … &#125;</code> declares C functions by signature; the interpreter, LLVM, and
        WebAssembly backends each bind them to their own implementation.
      </p>
      <CodeBlock>{`module playground

import std.io

bridge .C {
    func sqrt(x: Double): Double
    func cos(x: Double): Double
}

func main() {
    println(sqrt(16.0))
    println(cos(0.0))
}`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 1.23 Testing & tracing                                            */
/* ------------------------------------------------------------------ */

export function TestingAndTracing() {
  return (
    <Section id="v010dev-testing" title="1.23 Testing & tracing">
      <Lead>
        Tests and trace output are built in. <code>test "name" &#123; … &#125;</code> declares a test that
        <code> azora test</code> runs; <code>assert … panic "message"</code> checks a condition; <code>trace</code>
        prints for debugging.
      </Lead>
      <ApiTable rows={[
        ['test "name" { … }', 'A built-in unit test.'],
        ['assert cond panic "msg"', 'Fails with msg when cond is false.'],
        ['inline assert cond panic "msg"', 'Checked at compile time.'],
        ['trace "msg" / trace .Info "msg"', 'Debug output, optionally with a level.'],
        ['panic "msg"', 'Unrecoverable abort.'],
      ]} />
      <CodeBlock>{`module playground

import std.io

annot @Audited for .Pack

@Audited
pack Ledger {
    var total: Int = 0
}

func clamp(x: Int, lo: Int, hi: Int): Int {
    if x < lo { return lo }
    if x > hi { return hi }
    return x
}

test "clamp stays inside the interval" {
    assert clamp(20, 0, 10) == 10 panic "should clamp high"
    assert clamp(-2, 0, 10) == 0 panic "should clamp low"
}

test "Ledger is audited" {
    inline assert reflect<Ledger>.hasAnnot<Audited> panic "Ledger must carry @Audited"
}

func main() {
    fin x = 5
    trace "x is \${x}"
    trace .Info "ready"
}`}</CodeBlock>
    </Section>
  )
}
