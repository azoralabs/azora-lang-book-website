import { ApiTable, CodeBlock, Lead, Note, Section, Subheading } from './Shared.jsx'

export default function SerializerChapter() {
  return (
    <Section id="v010dev-serializer" title="2.15 Serializer">
      <Lead><code>std.serializer</code> separates typed serialization from text encoding.
        <code> Serializer&lt;T&gt;</code> converts a value to and from a <code>SerialValue</code> tree;
        the built-in text format is AZON.</Lead>
      <Subheading>Deriving a serializer</Subheading>
      <p>Annotate a pack with <code>@Serializable</code> to request generated serialization support.</p>
      <CodeBlock>{`module playground

import std.serializer

@Serializable
pack User {
    fin name: String
    fin age: Int
}`}</CodeBlock>
      <Subheading>The value tree</Subheading>
      <ApiTable rows={[
        ['SerialValue.Null / Bool(value)', 'Null and boolean values.'],
        ['SerialValue.Number(text)', 'A numeric token preserved as text to avoid precision loss.'],
        ['SerialValue.Text(value)', 'Text.'],
        ['SerialValue.Array(values)', 'An ordered List<SerialValue>.'],
        ['SerialValue.Object(fields)', 'An ordered List<SerialField>.'],
      ]} />
      <Subheading>Encoding and decoding AZON</Subheading>
      <p><code>encodeSerialValue(value, options)</code> and <code>decodeSerialValue(text, options)</code>
        are failable. AZON quotes object keys and uses a colon between each key and its value.</p>
      <CodeBlock>{`module playground

import std.io
import std.serializer
import std.container.list

func encode(): String ?! SerializationError {
    fin fields = listOf<SerialField>(
        SerialField("host", SerialValue.Text("127.0.0.1")),
        SerialField("port", try serialNumber("8080"))
    )
    return try encodeSerialValue(SerialValue.Object(fields), serializerOptions())
}

func main() {
    println(encode() catch "error")
}`}</CodeBlock>
      <ApiTable rows={[
        ['maxDepth', 'Maximum nesting depth; default 64.'],
        ['maxInputLength', 'Maximum input size; default 16 MiB.'],
        ['allowDuplicateFields', 'Defaults to false.'],
        ['pretty / indent', 'Control presentation.'],
        ['encodeNulls', 'Control optional null encoding.'],
      ]} />
      <CodeBlock>{`module playground

import std.io
import std.serializer

func read(): Long ?! SerializationError {
    var options = serializerOptions()
    options.maxDepth = 24
    options.maxInputLength = 1024 * 1024
    fin value = try decodeSerialValue("8080", options)
    return try serialAsLong(value)
}

func main() {
    println(read() catch -1)
}`}</CodeBlock>
      <Subheading>Custom serializers</Subheading>
      <p>Implement the two read-only receiver methods of <code>Serializer&lt;T&gt;</code> to choose a custom
        wire representation. Declare error sets using <code>?!</code> and use <code>try</code> to propagate failures.</p>
      <CodeBlock>{`module playground

import std.io
import std.serializer

pack UserId {
    fin value: Long
}

pack UserIdSerializer

impl Serializer<UserId> for UserIdSerializer {
    func &.toSerialValue(value: UserId&): SerialValue ?! SerializationError {
        return try serialNumber(value.value as String)
    }

    func &.fromSerialValue(value: SerialValue&): UserId ?! SerializationError {
        return UserId(try serialAsLong(value))
    }
}

func main() {
    fin codec = UserIdSerializer()
    fin tree = codec.toSerialValue(UserId(42)) catch SerialValue.Null
    fin restored = codec.fromSerialValue(tree) catch UserId(-1)
    println(restored.value)
}`}</CodeBlock>
      <Subheading>Field annotations</Subheading>
      <ApiTable rows={[
        ['@Serializable', 'Request generated serialization.'],
        ['@SerialName("wire_name")', 'Override a wire name.'],
        ['@SerialIgnore', 'Exclude a field.'],
        ['@SerialRequired', 'Require a field even if its declaration has a default.'],
      ]} />
      <CodeBlock>{`module playground

import std.serializer

@Serializable
pack Profile {
    @SerialName("display_name")
    var displayName: String
    @SerialRequired
    var revision: Int
    @SerialIgnore
    var cachedLabel: String = ""
}`}</CodeBlock>
      <Note>The library no longer takes a <code>SerializationFormat</code> parameter. For another text
        format, build a separate encoder/decoder around the value tree.</Note>
    </Section>
  )
}
