import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function VariadicLambdas() {
  return (
    <Section id="variadic-lambdas" title="Variadic Lambdas">
      <p>
        Variadic lambdas use the <code className="text-az-primary">{'<T...>'}</code> syntax to accept
        a variable number of arguments, all accessible through the implicit{' '}
        <code className="text-az-primary">it</code> parameter. The compiler resolves concrete types
        and argument count at compile time.
      </p>
      <CodeBlock>{`var sum = <T...>{
    var total = 0
    for x in it {
        total += x
    }
    total
}
assert sum(1, 2, 3) == 6
assert sum(10, 20, 30, 40) == 100`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Properties</h3>
      <p>
        The <code className="text-az-primary">it</code> parameter exposes{' '}
        <code className="text-az-primary">it.length</code> for the argument count and bracket
        notation (<code className="text-az-primary">it[0]</code>) for indexed access. Both are
        resolved at compile time.
      </p>
      <CodeBlock>{`var len = <T...>{ it.length }
assert len() == 0
assert len(1, 2, 3) == 3

var first = <T...>{ it[0] }
assert first(42) == 42`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">With Index</h3>
      <p>
        Use <code className="text-az-primary">with</code> to get a zero-based index when looping
        over variadic arguments:
      </p>
      <CodeBlock>{`var indexSum = <T...>{
    var total = 0
    for x in it with i {
        total += i
    }
    total
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Inline Variadic For</h3>
      <p>
        Prefix a <code className="text-az-primary">for</code> loop with{' '}
        <code className="text-az-primary">inline</code> for compile-time unrolling. Use{' '}
        <code className="text-az-primary">$</code>-prefixed names for compile-time values:{' '}
        <code className="text-az-primary">$it</code> (argument pack),{' '}
        <code className="text-az-primary">$i</code> (index), and{' '}
        <code className="text-az-primary">inline var</code> for accumulators.
      </p>
      <CodeBlock>{`var indexSum = <T...>{
    inline var $total = 0
    inline for _ in $it with $i {
        $total += $i
    }
    $total
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Where Constraints</h3>
      <p>
        Enforce minimum argument counts with <code className="text-az-primary">where</code> on{' '}
        <code className="text-az-primary">T.length</code>. Violations are caught at compile time.
      </p>
      <CodeBlock>{`var needsThree = <T...> where T.length >= 3 {
    it[0] + it[1] + it[2]
}
assert needsThree(1, 2, 3) == 6`}</CodeBlock>
    </Section>
  )
}
