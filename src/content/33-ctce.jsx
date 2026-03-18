import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function CTCE() {
  return (
    <Section id="ctce" title="Compile-Time Code Execution">
      <p>
        Azora supports compile-time code execution (CTCE), similar to D's CTFE. Functions
        declared with <code className="text-az-primary">func</code> are automatically available
        for compile-time evaluation. Use <code className="text-az-primary">fin $name = func(args)</code> to
        execute a function at compile time and bind the result to a compile-time constant.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Basic Usage</h3>
      <CodeBlock>{`func factorial(n: Int): Int {
    if n <= 1 { return 1 }
    return n * factorial(n - 1)
}

fin $result = factorial(10)   // computed at compile time
// $result is 3628800, no runtime computation needed`}</CodeBlock>

      <p className="mt-4 text-az-35">
        The <code className="text-az-primary">$</code> prefix marks a compile-time variable.
        The right-hand side function call is evaluated entirely during preprocessing. The result
        replaces the variable in the emitted code as a literal constant.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Supported Constructs</h3>
      <p>The CTCE evaluator handles:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><code className="text-az-primary">if</code>/<code className="text-az-primary">else</code> conditionals</li>
        <li><code className="text-az-primary">while</code> and <code className="text-az-primary">for</code> loops</li>
        <li><code className="text-az-primary">var</code>/<code className="text-az-primary">fin</code> declarations</li>
        <li><code className="text-az-primary">return</code>, <code className="text-az-primary">break</code>, <code className="text-az-primary">continue</code></li>
        <li>Recursion (depth limit: 100)</li>
        <li>String interpolation (<code className="text-az-primary">"hello $name"</code> and <code className="text-az-primary">{"\"value: ${expr}\""}</code>)</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">String Interpolation at Compile Time</h3>
      <CodeBlock>{`func greet(name: String): String {
    return "Hello, $name!"
}

fin $msg = greet("Azora")   // $msg = "Hello, Azora!"`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Iteration at Compile Time</h3>
      <CodeBlock>{`func sumRange(n: Int): Int {
    var total = 0
    for i in 1..n {
        total += i
    }
    return total
}

fin $sum = sumRange(100)   // $sum = 5050`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Limits</h3>
      <p>
        Recursion is limited to a depth of 100 calls. Loops are limited to 10,000 iterations
        per loop. These limits prevent infinite compile-time computation. Functions that exceed
        these limits produce a preprocessor error.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Using CT Values with Generics</h3>
      <p>
        Compile-time constants can be used as generic arguments, enabling parameterization by
        computed values.
      </p>
      <CodeBlock>{`func computeSize(): Int {
    return 4
}

fin $size = computeSize()
pack Arr<T, N> { data: T[N] }
typealias Vec4 = Arr<Real, $size>
// Creates: pack Vec4 { data: Real[4] }`}</CodeBlock>
    </Section>
  )
}
