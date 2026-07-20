import { ApiTable, CodeBlock, Lead, Note, Section, Subheading } from './Shared.jsx'

export default function SerializerChapter() {
  return (
    <Section id="wip-serializer" title="2.15 Serializer">
      <Lead>
        <code>std.serializer</code> separates typed serialization from textual encoding. A
        <code>Serializer&lt;T&gt;</code> converts between <code>T</code> and a lossless <code>SerialValue</code> tree;
        JSON or AZON then encode that tree to text. The same typed serializer therefore serves both formats.
      </Lead>

      <Subheading>Deriving a serializer</Subheading>
      <p>
        Annotate a pack with <code>@Serializable</code> and the compiler generates a <code>Serializer&lt;T&gt;</code>
        for it. The same thing can be written explicitly with <code>impl Serializable for T</code>.
      </p>
      <CodeBlock>{`module app.user

import std.serializer

@Serializable
pack User {
    fin name: String
    fin age: Int
}

// Equivalently, without the decorator:
// impl Serializable for User`}</CodeBlock>
      <CodeBlock>{`import std.serializer

impl Serializable for Product {
    // generated: Serializer<Product> with toSerialValue / fromSerialValue
}`}</CodeBlock>

      <Subheading>The structured value model</Subheading>
      <p>
        Every typed serializer funnels through <code>SerialValue</code> - a lossless, format-independent tree.
        Encoding and decoding text never touches your types directly.
      </p>
      <ApiTable rows={[
        ['SerialValue.Null', 'A format-independent null value.'],
        ['SerialValue.Bool(value)', 'A boolean scalar.'],
        ['SerialValue.Number(text)', 'A validated number token retained as text to prevent precision loss.'],
        ['SerialValue.Text(value)', 'Unicode text. JSON escapes are validated during decoding.'],
        ['SerialValue.Array(values)', 'An ordered List<SerialValue>.'],
        ['SerialValue.Object(fields)', 'Ordered SerialField entries with deterministic duplicate handling.'],
      ]} />
      <Note>
        Numbers are not immediately converted to <code>Real</code>. Keeping the original token lets a custom
        serializer safely decode 64-bit integers, arbitrary-precision values, and exact decimals.
      </Note>

      <Subheading>JSON and AZON text</Subheading>
      <p>
        <code>std::encodeSerialValue</code> and <code>std::decodeSerialValue</code> move between a
        <code>SerialValue</code> tree and text. JSON follows RFC 8259. AZON shares JSON's scalar and collection
        grammar and also uses <code>:</code> between object keys and values. Both formats quote object keys,
        preserve field order, reject malformed number grammar, and support Unicode escape pairs.
      </p>
      <CodeBlock>{`import std.serializer

func main() {
    fin options = std::serializerOptions()
    fin fields = List<SerialField>()
    fields.add(SerialField("host", SerialValue.Text("127.0.0.1")))
    fields.add(SerialField("port", std::serialNumber("8080")))

    fin value = SerialValue.Object(fields)
    fin json = std::encodeSerialValue(value, SerializationFormat.Json, options) catch "error"
    fin azon = std::encodeSerialValue(value, SerializationFormat.Azon, options) catch "error"

    // JSON: {"host":"127.0.0.1","port":8080}
    // AZON: {"host":"127.0.0.1","port":8080}
}`}</CodeBlock>

      <Subheading>Decoding and resource limits</Subheading>
      <ApiTable rows={[
        ['maxDepth', 'Stops recursively nested input from exhausting the call stack. Default: 64.'],
        ['maxInputLength', 'Rejects oversized input before parsing. Default: 16 MiB.'],
        ['allowDuplicateFields', 'Defaults to false. Duplicate keys are rejected deterministically.'],
        ['pretty / indent', 'Controls human-readable output without changing value semantics.'],
        ['encodeNulls', 'Allows generated serializers to omit optional null fields.'],
      ]} />
      <CodeBlock>{`import std.serializer

func main() {
    var options = std::serializerOptions()
    options.maxDepth = 24
    options.maxInputLength = 1024 * 1024
    options.allowDuplicateFields = false

    fin parsed = std::decodeSerialValue(payload, SerializationFormat.Json, options) catch SerialValue.Null
}`}</CodeBlock>

      <Subheading>Custom serializers</Subheading>
      <p>
        Implement <code>Serializer&lt;T&gt;</code> directly when the wire representation should differ from the
        pack layout, or when the type belongs to another library. The two methods convert between <code>T</code>
        and the <code>SerialValue</code> tree; both are failable.
      </p>
      <CodeBlock>{`pack UserId {
    shield fin value: Long
}

pack UserIdSerializer

impl Serializer<UserId> for UserIdSerializer {
    func toSerialValue(value: ref UserId): SerialValue!SerializationError { ref self ->
        return SerialValue.Number(std::serialNumber(value.value.toString))
    }

    func fromSerialValue(value: ref SerialValue): UserId!SerializationError { ref self ->
        when value {
            SerialValue.Number(text) -> {
                return UserId(parseUserId(text))
            }
            else -> { fail return .UnexpectedType }
        }
    }
}`}</CodeBlock>

      <Subheading>Field annotations</Subheading>
      <ApiTable rows={[
        ['@Serializable', 'Requests a compiler-generated Serializer<T>.'],
        ['@SerialName("wire_name")', 'Overrides a generated field or type name.'],
        ['@SerialIgnore', 'Excludes a field from generated encoding and decoding.'],
        ['@SerialRequired', 'Requires a field even when the Azora declaration has a default.'],
      ]} />
      <CodeBlock>{`@Serializable
pack Profile {
    @SerialName("display_name")
    var displayName: String

    @SerialRequired
    var revision: Int

    @SerialIgnore
    var cachedLabel: String = ""
}`}</CodeBlock>
      <Note>
        <code>@Serializable</code> optionally takes <code>ignoreUnknownFields</code> and <code>encodeDefaults</code>
        as named arguments: <code>@Serializable(ignoreUnknownFields: true, encodeDefaults: false)</code>. The bare
        form uses the defaults (reject unknown fields, encode defaults).
      </Note>
    </Section>
  )
}
