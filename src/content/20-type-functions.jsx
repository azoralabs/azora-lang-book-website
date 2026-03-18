import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function TypeFunctions() {
  return (
    <Section id="type-functions" title="Type Functions">
      <p>
        Type functions take types as input and produce types as output at compile time.
        They are declared with the <code className="text-az-primary">type</code> keyword and invoked with
        the <code className="text-az-primary">!</code> suffix syntax (e.g., <code className="text-az-primary">promote!</code>).
        The entire computation happens during preprocessing with zero runtime cost.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Declaration</h3>
      <p>
        Parameters have the type <code className="text-az-primary">Type</code>. The body contains
        compile-time logic that computes and returns a type.
      </p>
      <CodeBlock>{`type promote(t1: Type, t2: Type) {
    return if t1.rank >= t2.rank { t1 } else { t2 }
}`}</CodeBlock>

      <p>
        The <code className="text-az-primary">.rank</code> property represents a type&rsquo;s position in the
        promotion hierarchy. <code className="text-az-primary">Int</code> has a lower rank
        than <code className="text-az-primary">Real</code>, so promoting them yields <code className="text-az-primary">Real</code>.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Variadic Type Function</h3>
      <p>
        Type functions can accept a variable number of type arguments
        using <code className="text-az-primary">Type...</code> syntax:
      </p>
      <CodeBlock>{`type promote(T: Type...) where T.length >= 2 {
    let Result = T.0
    for Ty in T[1...] {
        Result = if Ty.rank > Result.rank { Ty } else { Result }
    }
    return Result
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Usage with <code className="text-az-primary">promote!</code></h3>
      <p>
        Type functions are invoked with the <code className="text-az-primary">!</code> suffix in type
        annotation position:
      </p>
      <CodeBlock>{`func<T1, T2> add(a: T1, b: T2): promote!(T1, T2)
where T1: Numeric, T2: Numeric {
    var sum: ReturnType = _
    return sum
}

// promote!(Int, Real) resolves to Real
// promote!(Int, Int) resolves to Int`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25"><code className="text-az-primary">ReturnType</code> Alias</h3>
      <p>
        Inside a function body, <code className="text-az-primary">ReturnType</code> is automatically
        replaced with the concrete resolved return type:
      </p>
      <CodeBlock>{`var sum: ReturnType = _    // becomes: var sum: Real = 0.0`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25"><code className="text-az-primary">let</code> Keyword</h3>
      <p>
        Used for compile-time variable binding inside type functions.
        Unlike <code className="text-az-primary">var</code> and <code className="text-az-primary">fin</code>,
        <code className="text-az-primary"> let</code> operates at the type level and does not exist at runtime.
        It can be reassigned within a type function, which is useful in loops that iteratively
        compute a type.
      </p>
      <CodeBlock>{`let Result = T.0`}</CodeBlock>
    </Section>
  )
}
