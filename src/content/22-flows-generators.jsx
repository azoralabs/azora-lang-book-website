import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function FlowsGenerators() {
  return (
    <Section id="flows-generators" title="Flows & Generators">
      <p>
        Flows are Azora&rsquo;s mechanism for lazy, on-demand iteration. A flow produces values one at
        a time using <code className="text-az-primary">yield</code>. Values are computed only as requested
        by the consumer, making flows ideal for large or infinite sequences.
      </p>

      <h3 className="text-lg font-semibold mt-2 mb-2 text-az-25">Flow Declaration</h3>
      <p>
        Declare a flow with the <code className="text-az-primary">flow</code> keyword. Each <code className="text-az-primary">yield</code> is
        a suspension point: execution pauses there and resumes on the next iteration. Flows can
        be generic.
      </p>

      <CodeBlock>{`flow range(n: Int): Int {
    for i in 0..n {
        yield i
    }
}

flow fibonacci(n: Int): Int {
    var a = 0
    var b = 1
    for i in 0..n {
        yield a
        fin temp = a + b
        a = b
        b = temp
    }
}

// Generic flow:
flow<T> identity(items: T[]): T {
    for x in items {
        yield x
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Consuming Flows</h3>

      <h4 className="text-base font-semibold mt-4 mb-2 text-az-35">For-In Iteration</h4>
      <p>Pull one value at a time. The loop runs until the flow has no more values to yield.</p>
      <CodeBlock>{`for x in range(3) {
    sum += x
}`}</CodeBlock>

      <h4 className="text-base font-semibold mt-4 mb-2 text-az-35">With Index</h4>
      <p>Bind an index variable that starts at 0 and increments each iteration.</p>
      <CodeBlock>{`for x in range(2) with idx {
    indices += idx
}`}</CodeBlock>

      <h4 className="text-base font-semibold mt-4 mb-2 text-az-35"><code className="text-az-primary">.collect()</code></h4>
      <p>Materialize the entire flow into an array.</p>
      <CodeBlock>{`fin arr = range(3).collect()
assert arr.length == 4     // [0, 1, 2, 3]
assert arr[0] == 0`}</CodeBlock>

      <h4 className="text-base font-semibold mt-4 mb-2 text-az-35">Early Break</h4>
      <p>
        Using <code className="text-az-primary">break</code> inside a for-in loop over a flow stops
        consumption immediately. No further values are produced.
      </p>
      <CodeBlock>{`for x in range(100) {
    if x == 2 { break }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Empty Flows</h3>
      <p>
        A flow with no <code className="text-az-primary">yield</code> statements produces zero values.
        Iterating over it does nothing.
      </p>
      <CodeBlock>{`flow empty(): Int { }

for x in empty() {
    count += 1
}
assert count == 0`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: Flows and tasks serve complementary roles. Tasks handle concurrency (doing multiple
        things at once), while flows handle lazy sequences (producing values on demand). You can
        combine them by consuming a flow inside a task.
      </p>
    </Section>
  )
}
