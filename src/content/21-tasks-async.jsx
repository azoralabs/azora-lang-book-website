import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function TasksAsync() {
  return (
    <Section id="tasks-async" title="Tasks & Async">
      <p>
        Azora provides coroutine-based concurrency
        with <code className="text-az-primary">task</code>, <code className="text-az-primary">async</code>/<code className="text-az-primary">await</code>,
        and <code className="text-az-primary">launch</code>. Tasks are lightweight coroutines that can suspend
        and resume without blocking the underlying thread.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Task Declaration</h3>
      <p>
        A <code className="text-az-primary">task</code> is like a function but runs in a suspendable context,
        enabling <code className="text-az-primary">suspend</code>, <code className="text-az-primary">async</code>,
        <code className="text-az-primary"> await</code>, and <code className="text-az-primary">launch</code>.
        These operations are not allowed inside regular <code className="text-az-primary">func</code> bodies.
        Tasks can also be generic.
      </p>

      <CodeBlock>{`task simpleTask(): Int {
    suspend 10     // suspend for 10ms
    return 42
}

task addAsync(a: Int, b: Int): Int {
    suspend 5
    return a + b
}

// Generic task:
task<T> identity(x: T): T {
    suspend 1
    return x
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25"><code className="text-az-primary">suspend</code></h3>
      <p>
        Pauses the current coroutine for a given number of milliseconds, yielding control to the
        scheduler. Valid inside <code className="text-az-primary">task</code>, <code className="text-az-primary">hook</code>,
        and <code className="text-az-primary">test</code> bodies.
      </p>
      <CodeBlock>{`suspend 50`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25"><code className="text-az-primary">async</code> / <code className="text-az-primary">await</code></h3>
      <p>
        <code className="text-az-primary">async</code> launches a block as a concurrent coroutine and returns
        a handle. <code className="text-az-primary">await(handle)</code> suspends the caller until the async
        block completes and returns its value.
      </p>

      <CodeBlock>{`test "Async and await" {
    fin t = async { 100 }
    fin r = await(t)
    assert r == 100
}

test "Multiple async tasks" {
    fin t1 = async { 1 }
    fin t2 = async { 2 }
    assert await(t1) + await(t2) == 3
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25"><code className="text-az-primary">launch</code> (fire-and-forget)</h3>
      <p>
        Starts a coroutine that runs independently with no handle returned. The calling code
        continues immediately.
      </p>

      <CodeBlock>{`test "Launch executes" {
    var x = 0
    launch { x = 99 }
    suspend 50
    assert x == 99
}`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: Use <code className="text-az-primary">async</code>/<code className="text-az-primary">await</code> when
        you need the result. Use <code className="text-az-primary">launch</code> for side effects you do not
        need to wait on. A task that never suspends is equivalent to a regular function but with
        coroutine overhead; prefer <code className="text-az-primary">func</code> in that case.
      </p>
    </Section>
  )
}
