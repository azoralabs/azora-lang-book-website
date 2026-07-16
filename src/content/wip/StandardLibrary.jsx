import { ApiTable, CodeBlock, Lead, Note, Section, Subheading } from './Shared.jsx'

export function StandardLibrary() {
  return (
    <Section id="wip-stdlib" title="2. Standard Library">
      <Lead>
        The Azora standard library is ordinary source code installed with the toolchain. The compiler does not
        hardcode a <code>std</code> module: imports are resolved from available library modules exactly like any
        other dependency.
      </Lead>
      <p>
        WIP APIs are documented from the files under <code>Internal/Std</code>. Most carry
        <code>@experimental</code>; the annotation communicates compatibility, not quality. Contracts, ownership,
        deterministic cleanup, and input limits still matter for experimental APIs.
      </p>
      <ApiTable rows={[
        ['std.serializer', 'Lossless value trees, JSON/AZON text formats, and custom typed serializers.'],
        ['std.time', 'Durations, instants, monotonic clocks, civil dates, UTC offsets, and ISO-8601.'],
        ['std.container.*', 'Read-only and mutable collections, queues, stacks, deques, sets, maps, and tuples.'],
        ['std.memory.*', 'Pointers and smart ownership types such as Ptr, Unique, Arc, Weak, and Slice.'],
        ['std.concurrency.*', 'Structured asynchronous utilities.'],
        ['std.parallelism.*', 'Threads, channels, and synchronization primitives.'],
      ]} />
      <CodeBlock>{`module app

use std.serializer
use std.time
use std.container.{list, map}

func main() {
    fin createdAt = now()
    fin tags = listOf("azora", "wip")
    println(formatIsoInstant(createdAt))
    println(tags.toString)
}`}</CodeBlock>
    </Section>
  )
}

export function ImportsAndConventions() {
  return (
    <Section id="wip-stdlib-conventions" title="2.1 Imports and conventions">
      <Lead>
        Import the narrowest module that owns the API. This keeps dependencies visible and avoids accidental
        coupling to unrelated declarations contributed to a larger zone.
      </Lead>
      <Subheading>Module paths use dots; calls through zones use ::</Subheading>
      <CodeBlock>{`use std.container.list
use std.time

func main() {
    fin values = listOf(1, 2, 3)
    fin current = std::time::now()
    println(values.size)
    println(std::time::formatIsoInstant(current))
}`}</CodeBlock>
      <Subheading>Experimental and stable metadata</Subheading>
      <p>
        <code>@experimental(since: "0.0.4")</code> means the API may change. <code>@stable</code> promises the
        stated compatibility boundary. <code>@deprecated</code> communicates a migration path. These annotations
        appear as documentation badges and are not prose descriptions.
      </p>
      <Note>
        Names marked <code>confine</code> are implementation details and are intentionally omitted from generated
        public documentation. Do not depend on them even if you see them in the stdlib source.
      </Note>
      <Subheading>Ownership in standard APIs</Subheading>
      <p>
        A <code>ref T</code> input is borrowed for the call. A returned owned <code>T</code> is the caller's value.
        Mutable collections use <code>mut ref self</code> internally; read-only operations use <code>ref self</code>.
        String conversion uses <code>Into&lt;String&gt;</code>, exposing property-style <code>.toString</code> where the
        type implements it.
      </p>
    </Section>
  )
}

