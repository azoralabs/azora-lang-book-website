import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Testing() {
  return (
    <Section id="testing" title="Testing">
      <p>
        Azora has a built-in test framework. No external dependencies, no configuration. Tests can live
        inline alongside production code or in dedicated files. They participate in the same compilation
        pipeline, so type errors in tests are caught at compile time.
      </p>

      <h3 className="text-lg font-semibold mt-2 mb-2 text-az-25">Test Declaration</h3>
      <p>
        Use the <code className="text-az-primary">test</code> keyword followed by a name string and a body
        block. The compiler discovers all test blocks automatically.
      </p>
      <CodeBlock>{`test "test name here" {
    assert 1 + 1 == 2 { "addition should work" }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Assert</h3>
      <p>
        The <code className="text-az-primary">assert</code> keyword evaluates a boolean condition.
        On failure, it halts the test. The trailing block is a <strong>lazy lambda</strong> that produces
        the failure message, evaluated only when the assertion fails.
      </p>
      <CodeBlock>{`assert condition { "failure message" }
assert true { "this passes" }
assert 1 == 1 { "equality check" }`}</CodeBlock>
      <p>
        A test stops at the first failing assertion. For independent checks that should all be reported,
        use separate tests.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Multiple Tests</h3>
      <p>
        Declare as many tests as you like per file. Each runs in its own isolated context with no
        shared state.
      </p>
      <CodeBlock>{`test "first" { assert 1 == 1 { "one" } }
test "second" { assert 2 == 2 { "two" } }
test "third" { assert 3 == 3 { "three" } }`}</CodeBlock>
      <p>
        The framework prints a summary after all tests run. Failed tests
        show <code className="text-az-primary">FAIL</code> with the lazy failure message.
      </p>
      <CodeBlock title="Output">{`PASS: first
PASS: second
PASS: third
Tests: 3 passed, 0 failed, 3 total`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Suspendable Tests</h3>
      <p>
        Every test body runs inside a suspendable context.
        You can use <code className="text-az-primary">suspend</code>, <code className="text-az-primary">async</code>,{' '}
        <code className="text-az-primary">await</code>, and <code className="text-az-primary">launch</code>{' '}
        directly in tests without special wrappers.
      </p>
      <CodeBlock>{`test "Suspend in test" {
    suspend 10
    assert true { "works after suspend" }
}`}</CodeBlock>
      <p>
        You can launch concurrent tasks and await their results:
      </p>
      <CodeBlock>{`test "Async addition in test" {
    fin a = async { 10 }
    fin b = async { 20 }
    assert await(a) + await(b) == 30 { "async sum should be 30" }
}`}</CodeBlock>

      <p className="mt-2 text-sm text-az-50">
        Tip: Keep each test focused on a single behaviour. When a focused test fails, the name plus
        the failure message usually tell you exactly what broke.
      </p>
    </Section>
  )
}
