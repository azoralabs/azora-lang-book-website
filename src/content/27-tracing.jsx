import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Table from '../components/Table.jsx'

export default function Tracing() {
  return (
    <Section id="tracing" title="Tracing">
      <p>
        Tracing is Azora's built-in structured logging system. Unlike ad-hoc{' '}
        <code className="text-az-primary">println</code> calls, trace statements carry explicit severity
        levels, are lazily evaluated, and can be filtered by the runtime. Leave them in your code
        permanently.
      </p>

      <h3 className="text-lg font-semibold mt-2 mb-2 text-az-25">Trace Statement</h3>
      <p>
        A trace consists of the <code className="text-az-primary">trace</code> keyword, an optional{' '}
        <code className="text-az-primary">LogTrace</code> severity level (short dot syntax or fully
        qualified), and a trailing lambda that produces the message string.
      </p>
      <CodeBlock>{`trace .Info { "informational message" }
trace .Warning { "something concerning" }
trace .Error { "something failed" }
trace .Todo { "implement this" }
trace .Debug { "debug info" }

// Full enum access also works:
trace LogTrace.Warning { "watch out" }`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Trace Levels</h3>
      <p>
        The built-in <code className="text-az-primary">LogTrace</code> enum defines five severity levels:
      </p>
      <Table
        headers={['Level', 'Purpose']}
        rows={[
          [<code>.Info</code>, 'Routine operational messages (startup, lifecycle events)'],
          [<code>.Warning</code>, 'Unexpected but recoverable conditions'],
          [<code>.Error</code>, 'Genuine failures and violated invariants'],
          [<code>.Todo</code>, 'Runtime markers for unfinished work (visible when the code path is hit)'],
          [<code>.Debug</code>, 'Verbose diagnostic info, typically suppressed outside development'],
        ]}
      />
      <p className="mt-4">
        The message lambda is lazily evaluated, so expensive operations like string interpolation
        or collection formatting incur zero cost when the trace level is filtered out.
      </p>
      <CodeBlock>{`// Lazy evaluation means this is free when Debug is filtered:
trace .Debug { "Matrix state: " + matrix.toString() }`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Bare Trace</h3>
      <p>
        Omit the severity level for quick, temporary diagnostic output. Bare traces still benefit from
        lazy evaluation but are not filterable by level.
      </p>
      <CodeBlock>{`trace { "message without level" }`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Practical Patterns</h3>
      <p>
        Bracket expensive operations with trace statements to observe timing and state:
      </p>
      <CodeBlock>{`func loadAssets(path: String): AssetBundle {
    trace .Info { "Loading assets from: " + path }
    fin bundle = readBundle(path)
    trace .Debug { "Loaded " + bundle.count.toString() + " assets" }
    return bundle
}`}</CodeBlock>
      <p>
        Use <code className="text-az-primary">.Todo</code> traces as runtime reminders that surface
        when the code is actually reached:
      </p>
      <CodeBlock>{`func handleEvent(event: Event) {
    trace .Todo { "handle resize events" }
}`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: Prefer <code className="text-az-primary">trace</code> over{' '}
        <code className="text-az-primary">println</code> for all diagnostic output. Trace statements are
        structured, levelled, and lazily evaluated.
      </p>
    </Section>
  )
}
