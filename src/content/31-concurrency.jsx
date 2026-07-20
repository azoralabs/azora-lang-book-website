import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Concurrency() {
  return (
    <Section id="concurrency" title="31. Concurrency">
      <p className="mt-2 text-az-35">
        Azora has first-class concurrency built on coroutines with <strong>real parallelism</strong>.
        Four primitives cover the common patterns: lazy <code className="text-az-primary">flow</code>{' '}
        generators, <code className="text-az-primary">task</code>/<code className="text-az-primary">await</code>{' '}
        for async work, <code className="text-az-primary">channel</code>s to connect them, and{' '}
        <code className="text-az-primary">launch</code> for fire-and-forget jobs.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">31.1 Flows - lazy generators</h3>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">flow</code> produces values one at a time with{' '}
        <code className="text-az-primary">yield</code>. Its body runs <em>lazily</em> - only as far as
        the consumer pulls - so even an infinite flow is fine, and breaking early stops the producer.
      </p>
      <CodeBlock>{`flow squares(n: Int): Int {
    for i in 0..<n {
        yield i * i
    }
}

func main() {
    for x in squares(4) {
        println(x)            // 0, 1, 4, 9
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">31.2 Channels - task-to-task queues</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">channel()</code> creates a queue with{' '}
        <code className="text-az-primary">.send(v)</code>,{' '}
        <code className="text-az-primary">.receive()</code>, and{' '}
        <code className="text-az-primary">.close()</code>. A producer task fills it; the consumer
        drains it.
      </p>
      <CodeBlock>{`func produce(ch: Channel): Int {
    ch.send(10)
    ch.send(20)
    ch.close()
    return 0
}

func main() {
    var ch = channel()
    var p = task {
        produce(ch)
    }
    await p
    println(ch.receive())     // 10
    println(ch.receive())     // 20
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">31.3 launch - fire and forget</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">launch {`{ }`}</code> starts a background job whose side
        effects complete before the program exits. Because tasks run on a multi-threaded pool with
        isolated state, they never share mutable execution state - but their ordering is
        nondeterministic, so write order-independent code.
      </p>
      <CodeBlock>{`func main() {
    launch {
        println("running in the background")
    }
    println("main continues")
}`}</CodeBlock>
    </Section>
  )
}
