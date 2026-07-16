import { ApiTable, CodeBlock, Lead, Note, Section, Subheading } from './Shared.jsx'

export default function SerializerChapter() {
  return (
    <Section id="wip-serializer" title="2.2 Serializer">
      <Lead>
        <code>std.serializer</code> separates typed serialization from textual encoding. A
        <code>Serializer&lt;T&gt;</code> converts between <code>T</code> and a lossless <code>SerialValue</code> tree;
        JSON or AZON then encode that tree. The same custom serializer can therefore serve both formats.
      </Lead>
      <CodeBlock>{`module app.config

use std.serializer

@Serializable(json: true, azon: true)
pack ServerConfig {
    var host: String
    var port: Int
    var tls: Bool = true
}`}</CodeBlock>

      <Subheading>The structured value model</Subheading>
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

      <Subheading>JSON and AZON</Subheading>
      <p>
        JSON follows RFC 8259 and uses a colon between an object key and value. Canonical AZON uses the same
        scalar and collection grammar but uses <code>=</code>. Both formats quote object keys, preserve field
        order, reject malformed number grammar, and support Unicode escape pairs.
      </p>
      <CodeBlock>{`fin options = serializerOptions()
fin fields = List<SerialField>()
fields.add(SerialField("host", SerialValue.Text("127.0.0.1")))
fields.add(SerialField("port", try serialNumber("8080")))

fin value = SerialValue.Object(fields)
fin json = try encodeSerialValue(value, SerializationFormat.Json, options)
fin azon = try encodeSerialValue(value, SerializationFormat.Azon, options)

// JSON: {"host":"127.0.0.1","port":8080}
// AZON: {"host"="127.0.0.1","port"=8080}`}</CodeBlock>

      <Subheading>Strict decoding and resource limits</Subheading>
      <ApiTable rows={[
        ['maxDepth', 'Stops recursively nested input from exhausting the call stack. Default: 64.'],
        ['maxInputLength', 'Rejects oversized input before parsing. Default: 16 MiB.'],
        ['allowDuplicateFields', 'Defaults to false. Duplicate keys are rejected deterministically.'],
        ['pretty / indent', 'Controls human-readable output without changing value semantics.'],
        ['encodeNulls', 'Allows generated serializers to omit optional null fields.'],
      ]} />
      <CodeBlock>{`var options = serializerOptions()
options.maxDepth = 24
options.maxInputLength = 1024 * 1024
options.allowDuplicateFields = false

fin parsed = try decodeSerialValue(payload, SerializationFormat.Json, options)`}</CodeBlock>

      <Subheading>Custom serializers</Subheading>
      <p>
        Use a custom serializer when the wire representation should differ from the pack layout, or when the
        type belongs to another library. The serializer is a normal value and can carry configuration.
      </p>
      <CodeBlock>{`pack UserId {
    shield fin value: Long
}

pack UserIdSerializer

impl Serializer<UserId> for UserIdSerializer {
    func toSerialValue(value: ref UserId): SerialValue!SerializationError { ref self ->
        return serialNumber(value.value.toString)
    }

    func fromSerialValue(value: ref SerialValue): UserId!SerializationError { ref self ->
        when value {
            SerialValue.Number(text) -> {
                // validate range, parse Long, then construct
                return UserId(parseUserId(text))
            }
            else -> { fail return .UnexpectedType }
        }
    }
}`}</CodeBlock>

      <Subheading>Field annotations</Subheading>
      <ApiTable rows={[
        ['@Serializable', 'Requests a compiler-generated Serializer<T>; format and unknown-field policy are explicit.'],
        ['@SerialName("wire_name")', 'Overrides a generated field or type name.'],
        ['@SerialIgnore', 'Excludes a field from generated encoding and decoding.'],
        ['@SerialRequired', 'Requires a field even when the Azora declaration has a default.'],
      ]} />
      <CodeBlock>{`@Serializable(ignoreUnknownFields: false, encodeDefaults: false)
pack Profile {
    @SerialName("display_name")
    var displayName: String

    @SerialRequired
    var revision: Int

    @SerialIgnore
    var cachedLabel: String = ""
}`}</CodeBlock>
    </Section>
  )
}

