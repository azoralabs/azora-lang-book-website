import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function VariadicGenerics() {
  return (
    <Section id="variadic-generics" title="Variadic Generics">
      <p>
        Variadic generics extend Azora&rsquo;s generic system to support a variable number of type
        parameters. The core syntax is <code className="text-az-primary">T...</code>, which declares a type
        parameter pack. Each element in the pack can have a different type, and the compiler tracks
        all of them individually. Fully monomorphized at compile time with no runtime overhead.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Variadic Pack</h3>
      <p>
        Declare a variadic pack with <code className="text-az-primary">T...</code> in the type parameter list.
        Use <code className="text-az-primary">inline for</code> to iterate over the type pack at compile time.
        The <code className="text-az-primary">with $index</code> clause provides a compile-time index for
        generating unique field names.
      </p>
      <CodeBlock>{`pack Tuple<T...> {
    inline for Ty in T with $index {
        t$index: Ty = _
    }
}

var t: Tuple<Int, String, Bool> = Tuple<Int, String, Bool>(
    t0: 1, t1: "hi", t2: true
)
// Generates:
// pack Tuple__Int__String__Bool {
//     t0: Int = 0
//     t1: String = ""
//     t2: Bool = false
// }`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Variadic Function</h3>
      <p>
        The syntax <code className="text-az-primary">args: T...</code> accepts one argument for each type in
        the pack. The <code className="text-az-primary">promote!</code> type function computes the widest type
        across all pack members for the return type.
      </p>
      <CodeBlock>{`func<T...> add(args: T...): promote!T
where each T: Numeric {
    var sum: ReturnType = _
    for arg in args {
        sum += arg
    }
    return sum
}
var x = add(2, 3.4, 7, 9, 1.2)`}</CodeBlock>

      <p>
        The preprocessor expands <code className="text-az-primary">args: T...</code> to named parameters,
        unrolls the for loop, resolves <code className="text-az-primary">promote!T</code> to the promoted
        return type, and replaces <code className="text-az-primary">ReturnType</code> with the concrete type.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Where Clause on T.length</h3>
      <p>
        Constrain the pack&rsquo;s length with a <code className="text-az-primary">where</code> clause
        using <code className="text-az-primary">T.length</code>:
      </p>
      <CodeBlock>{`pack Tuple<T...> where T.length >= 2 {
    // ...
}
// Instantiating with fewer than 2 type args
// produces a compile-time error`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Where Each</h3>
      <p>
        The <code className="text-az-primary">where each</code> clause applies a spec constraint to every
        individual type in the pack. If any type fails the constraint, the preprocessor reports
        a compile-time error.
      </p>
      <CodeBlock>{`func<T...> add(args: T...): Int
where each T: Numeric {
    return 0
}
var x = add(2, "hello", 7)
// ERROR: String does not implement Numeric`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: <code className="text-az-primary">inline for</code> is a compile-time construct, not a runtime
        loop. It only works with type parameter packs known at compile time.
      </p>
    </Section>
  )
}
