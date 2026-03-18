import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Table from '../components/Table.jsx'

export default function Functions() {
  return (
    <Section id="functions" title="Functions">
      <p>
        Functions are declared at the top level with the <code className="text-az-primary">func</code>{' '}
        keyword. They accept typed parameters, optionally return a value, and support recursion. A
        function must be declared before it is called.
      </p>

      <h3 className="text-lg font-semibold mt-2 mb-2 text-az-25">Declaration</h3>
      <p>
        Each parameter requires a type annotation. Omitting the return type means the function
        returns <code className="text-az-primary">Unit</code>. The expression body form
        (<code className="text-az-primary">= expr</code>) is shorthand for single-expression functions.
      </p>
      <CodeBlock>{`func add(a: Int, b: Int): Int {
    return a + b
}

// No return type (void):
func doSomething() {
    sideEffect = 42
}

// Expression body:
func double(x: Int): Int = x * 2`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Calling Functions</h3>
      <p>
        Arguments are positional and type-checked at compile time. Recursion is fully supported.
        Function calls can appear anywhere an expression is expected.
      </p>
      <CodeBlock>{`add(3, 4)        // 7
double(5)        // 10
factorial(n - 1) // recursion supported`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Exposed Functions</h3>
      <p>
        Functions are private to their file by default. Prefix with{' '}
        <code className="text-az-primary">expose</code> to make them visible to other files.
      </p>
      <CodeBlock>{`expose func myFunc(x: Int): Int {
    return x * 2
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Built-In Functions</h3>
      <p>
        These are available globally without any import.
      </p>

      <Table
        headers={['Function', 'Description']}
        rows={[
          [<code>print(val)</code>, 'Print without newline'],
          [<code>println(val)</code>, 'Print with newline'],
          [<code>toString(val)</code>, 'Convert to String'],
          [<code>toInt(val)</code>, 'Convert to Int (truncates Reals)'],
          [<code>toReal(val)</code>, 'Convert to Real'],
          [<code>delay(ms)</code>, 'Suspend for ms milliseconds'],
          [<code>platform(scope)</code>, 'Get platform info (os, compiler)'],
          [<code>hasDeco(v, d)</code>, 'Check if variable has decorator'],
          [<code>getDeco(v, d, f)</code>, 'Get decorator field value'],
        ]}
      />
    </Section>
  )
}
