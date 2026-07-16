import { ApiTable, CodeBlock, Lead, Note, Section, Subheading } from './Shared.jsx'

export function CurrentLanguage() {
  return (
    <Section id="wip-language" title="1. Current Language">
      <Lead>
        The WIP edition tracks the language currently implemented in the repository. It is intentionally
        separate from the frozen 0.0.3 book: syntax and APIs here may still change before the next release.
      </Lead>
      <p>
        Azora combines Kotlin-like readability with explicit ownership, deterministic destruction, structured
        concurrency, and low-level native compilation. The active backends are the interpreter, LLVM,
        JavaScript, and WebAssembly.
      </p>
      <Note tone="yellow">
        WIP examples use <code>module</code>, never <code>package</code>. Imports use dots; namespace access uses
        <code>::</code>. A standard-library module is a normal installed library, not compiler magic.
      </Note>
      <CodeBlock>{`module playground

use std.container.list
use std.time

func main() {
    fin names = listOf("Mira", "Noah")
    println(names.first)
    println(std::time::formatIsoInstant(now()))
}`}</CodeBlock>
    </Section>
  )
}

export function ModulesAndZones() {
  return (
    <Section id="wip-modules" title="1.1 Modules, imports, and zones">
      <Lead>
        Every source file may declare one module. A module locates code; a zone provides a shared namespace
        inside that code. These concepts remain separate so libraries can be organized without hardcoded roots.
      </Lead>
      <ApiTable rows={[
        ['module app.model', 'Declares the file module. Azora has no package declaration.'],
        ['use std.container.list', 'Imports declarations exported by one module.'],
        ['use std.{time, serializer}', 'Imports several children of the same module root.'],
        ['use zone std', 'Imports declarations contributed to the shared std zone.'],
        ['std::time::now()', 'Accesses a declaration through its zone path. Dots are not namespace access.'],
        ['friend zone std::math { ... }', 'Contributes declarations to a zone shared by multiple files.'],
      ]} />
      <Subheading>Importing a leaf module</Subheading>
      <CodeBlock>{`module app.metrics

use std.time

func sample(): Instant {
    return now()
}

func qualifiedSample(): Instant {
    return std::time::now()
}`}</CodeBlock>
      <Subheading>Shared namespace contributions</Subheading>
      <p>
        A normal named <code>zone</code> owns its namespace and should have one definition. Use
        <code>friend zone</code> when several files intentionally contribute to the same namespace.
      </p>
      <CodeBlock>{`module tools.checksum

friend zone tools::hash {
    func checksum(text: String): Int {
        // implementation
        return 0
    }
}

func main() {
    println(tools::hash::checksum("Azora"))
}`}</CodeBlock>
    </Section>
  )
}

export function OwnershipAndReferences() {
  return (
    <Section id="wip-ownership" title="1.2 Ownership and references">
      <Lead>
        Values are owned by default. Borrowing is spelled with words rather than punctuation, making ownership
        visible without importing Rust syntax into Azora.
      </Lead>
      <ApiTable rows={[
        ['Buffer', 'An owned value. Its lifetime is controlled by the current owner.'],
        ['ref Buffer', 'A checked shared borrow. The callee cannot mutate through it.'],
        ['mut ref Buffer', 'An exclusive mutable borrow. Aliasing mutable access is rejected.'],
        ['shared ref Buffer', 'A thread-safe shared reference with explicit shared ownership.'],
        ['weak ref Buffer', 'A non-owning reference that does not keep the target alive.'],
        ['alloc / drop', 'Explicit heap allocation and deterministic release.'],
        ['zone { ... }', 'A bounded allocation/lifetime region. scope is not a keyword.'],
      ]} />
      <CodeBlock>{`pack Buffer {
    var size: Int
}

func inspect(input: ref Buffer): Int {
    return input.size
}

func resize(input: mut ref Buffer, size: Int) {
    input.size = size
}

func main() {
    var buffer = Buffer(32)
    resize(mut ref buffer, 64)
    println(inspect(ref buffer))
}`}</CodeBlock>
      <Note>
        Extensions can request <code>mut ref self</code> only when the extended pack exposes mutable state.
        A pack with no <code>expose</code> fields is mutation-shielded outside its defining file.
      </Note>
    </Section>
  )
}

export function FunctionsAndTypes() {
  return (
    <Section id="wip-functions-types" title="1.3 Functions, packs, specs, and conversion">
      <Lead>
        Packs define data, impl blocks define owned behavior, specs define capabilities, and extension functions
        add file-local API to types defined elsewhere.
      </Lead>
      <Subheading>Packs and explicit receivers</Subheading>
      <CodeBlock>{`pack User {
    var name: String
}

impl User {
    prop isNamed: Bool = self.name != ""

    func rename(name: String): Unit { mut ref self ->
        self.name = name
    }

    func greeting(): String { ref self ->
        return "Hello, \${self.name}"
    }
}`}</CodeBlock>
      <p>
        Inside an <code>impl</code>, every function states whether it receives <code>ref self</code> or
        <code>mut ref self</code>. Properties also refer to the receiver explicitly as <code>self</code>.
        Operators live in dedicated declarations such as <code>impl oper[] for X</code>, outside ordinary impl blocks.
      </p>
      <Subheading>Specs and generated member names</Subheading>
      <CodeBlock>{`spec Into<T>: T { ref self } use as "to\${T.typeName}"

impl Into<String> for User { ref self ->
    return self.greeting()
}

func main() {
    fin user = User("Ada")
    println(user.toString)
}`}</CodeBlock>
      <p>
        Parentheses are required only when the spec declares them. A callback spec written
        <code>spec Parse&lt;T&gt;(): T</code> creates a callable member; without <code>()</code>, it creates a
        property-style member.
      </p>
      <Subheading>Extensions</Subheading>
      <CodeBlock>{`func User.initial(): String { ref self ->
    return self.name.substring(0, 1)
}`}</CodeBlock>
    </Section>
  )
}

export function ControlAndSafety() {
  return (
    <Section id="wip-control-safety" title="1.4 Errors, contracts, cleanup, and tests">
      <Lead>
        Error sets, contracts, defer blocks, and tests are language features. They do not depend on a framework
        or exceptions hidden inside a library.
      </Lead>
      <Subheading>Failable values</Subheading>
      <CodeBlock>{`fail ParseFailure {
    Empty
    Invalid
}

func parsePort(text: String): Int!ParseFailure {
    if text == "" { fail return .Empty }
    // validate and parse
    return 8080
}`}</CodeBlock>
      <Subheading>Contracts</Subheading>
      <CodeBlock>{`func clamp(x: Int, lo: Int, hi: Int): Int
in {
    assert lo <= hi { "lo must be <= hi" }
} out { result ->
    assert result >= lo { "result must be >= lo" }
    assert result <= hi { "result must be <= hi" }
} zone {
    if x < lo { return lo }
    if x > hi { return hi }
    return x
}`}</CodeBlock>
      <Subheading>Deterministic cleanup</Subheading>
      <CodeBlock>{`func writeReport(): Unit {
    fin file = openReport()
    defer { file.close() }
    fail defer { file.removePartialOutput() }
    file.write("complete")
}`}</CodeBlock>
      <Subheading>Built-in tests</Subheading>
      <CodeBlock>{`test "clamp keeps values inside the interval" {
    assert clamp(20, 0, 10) == 10
    assert clamp(-2, 0, 10) == 0
}`}</CodeBlock>
    </Section>
  )
}

export function TasksAndReactivity() {
  return (
    <Section id="wip-tasks-reactivity" title="1.5 Tasks, flows, and reactivity">
      <Lead>
        A <code>task</code> is Azora's suspending function. Structured concurrency belongs in the task body;
        there is no <code>suspend func</code> spelling and no task-scope keyword.
      </Lead>
      <CodeBlock>{`task main() {
    fin user = await loadUser()
    fin posts = await loadPosts()
    render(user, posts)
}`}</CodeBlock>
      <p>
        Use <code>async</code> when work should begin before it is awaited. Child work is owned by the surrounding
        task and cancellation propagates through that ownership tree.
      </p>
      <CodeBlock>{`task dashboard() {
    fin user = async { loadUser() }
    fin posts = async { loadPosts() }
    render(await user, await posts)
}`}</CodeBlock>
      <ApiTable rows={[
        ['task', 'A suspending function with structured child work.'],
        ['flow', 'A value-producing asynchronous sequence.'],
        ['mem', 'Remembers reactive state for the current composition lifetime.'],
        ['rem', 'Remembers state in a serializable/saveable form.'],
        ['ret', 'Retains state across a longer host-defined lifecycle.'],
      ]} />
    </Section>
  )
}
