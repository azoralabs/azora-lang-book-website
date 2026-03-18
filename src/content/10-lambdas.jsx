import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Lambdas() {
  return (
    <Section id="lambdas" title="Lambdas & Closures">
      <p>
        Lambdas are anonymous, first-class functions. They can be assigned to variables, passed as
        arguments, returned from other lambdas, and stored in data structures. All lambdas have the
        type <code className="text-az-primary">Callback</code>.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Lambda Syntax</h3>
      <p>
        Curly braces with an optional parameter list, an arrow{' '}
        <code className="text-az-primary">-&gt;</code>, and a body. Parameter types are inferred
        from context.
      </p>
      <CodeBlock>{`var add = { a, b -> a + b }
var f = { 42 }                  // no-arg lambda
var identity = { x -> x }`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Implicit <code className="text-az-primary">it</code> Parameter</h3>
      <p>
        Single-parameter lambdas can use the implicit <code className="text-az-primary">it</code> name:
      </p>
      <CodeBlock>{`var result = runCallback(10) { it * 2 }`}</CodeBlock>

      <p className="mt-4">
        For multi-parameter callbacks using <code className="text-az-primary">it</code>, arguments
        are bundled into a Tuple accessed via <code className="text-az-primary">.0</code>,{' '}
        <code className="text-az-primary">.1</code>, etc.:
      </p>
      <CodeBlock>{`var result = applyTwo({ it.0 + it.1 }, 3, 7)    // 10`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Trailing Lambda</h3>
      <p>When the last parameter is a callback, it can be written outside the parentheses:</p>
      <CodeBlock>{`var result = runCallback(10) { v -> v * 2 }
var result = runTwo(3, 7) { it.0 * it.1 }`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Closures</h3>
      <p>
        Lambdas capture variables from their enclosing scope by reference. Changes to captured{' '}
        <code className="text-az-primary">var</code> variables are visible in both directions.
      </p>
      <CodeBlock>{`var base = 100
var addBase = { x -> x + base }
assert addBase(5) == 105`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Nested Lambdas</h3>
      <p>
        Lambdas can nest to any depth. Each inner lambda captures variables from all enclosing scopes.
      </p>
      <CodeBlock>{`var outer = { x ->
    var inner = { y -> x + y }
    inner(10)
}
assert outer(5) == 15`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Lambda Returning Lambda</h3>
      <p>A lambda can return another lambda, enabling currying and factory patterns:</p>
      <CodeBlock>{`var makeAdder = { x ->
    { y -> x + y }
}
var add5 = makeAdder(5)
assert add5(3) == 8`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Multi-Statement Body</h3>
      <p>The last expression is the return value:</p>
      <CodeBlock>{`var compute = { a, b ->
    var sum = a + b
    var doubled = sum * 2
    doubled
}
assert compute(3, 4) == 14`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Lambda typename</h3>
      <p>
        All lambdas share the typename <code className="text-az-primary">"Callback"</code>,
        regardless of parameter count or return type:
      </p>
      <CodeBlock>{`var f = { x -> x }
assert f.typename == "Callback"`}</CodeBlock>
    </Section>
  )
}
