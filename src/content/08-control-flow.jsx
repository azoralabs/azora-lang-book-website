import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function ControlFlow() {
  return (
    <Section id="control-flow" title="Control Flow">
      <p>
        Azora provides conditionals, loops, pattern matching, and loop control. No parentheses are
        required around conditions. <code className="text-az-primary">if</code> and{' '}
        <code className="text-az-primary">when</code> can be used as expressions,{' '}
        <code className="text-az-primary">for</code> and <code className="text-az-primary">while</code>{' '}
        support an <code className="text-az-primary">else</code> branch that runs when the loop body
        never executes, and <code className="text-az-primary">loop by</code> introduces timed interval
        iteration.
      </p>

      <h3 className="text-lg font-semibold mt-2 mb-2 text-az-25">If / Else</h3>
      <p>
        Standard conditional with optional <code className="text-az-primary">else if</code> and{' '}
        <code className="text-az-primary">else</code>. Can also be used as an expression (the{' '}
        <code className="text-az-primary">else</code> branch is required when used as an expression).
        There is no ternary operator.
      </p>
      <CodeBlock>{`if x < 5 {
    result = 1
} else if x < 15 {
    result = 2
} else {
    result = 3
}

// if as expression:
var x = if true { 42 } else { 0 }`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">For Loop (range)</h3>
      <p>
        Iterates over an inclusive range with <code className="text-az-primary">..</code>. The loop
        variable is scoped to the body and implicitly typed as <code className="text-az-primary">Int</code>.
      </p>
      <CodeBlock>{`for i in 1..5 {
    sum += i
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">For Loop (array)</h3>
      <p>
        The same <code className="text-az-primary">for...in</code> syntax works with arrays. The
        variable takes on each element value in order.
      </p>
      <CodeBlock>{`for item in myArray {
    println(item)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">For Loop with Index (<code className="text-az-primary">with</code>)</h3>
      <p>
        The <code className="text-az-primary">with</code> clause provides a zero-based iteration
        counter alongside each element. Works with both array and range iteration.
      </p>
      <CodeBlock>{`for item in items with idx {
    println("$idx: $item")
}

for i in 1..3 with idx {
    sumIdx += idx    // idx is 0-based iteration index
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">For/Else</h3>
      <p>
        The <code className="text-az-primary">else</code> branch runs only when the iterable is empty
        and the loop body never executes. If the loop runs at least once (even with a{' '}
        <code className="text-az-primary">break</code>), the else branch is skipped.
      </p>
      <CodeBlock>{`for e in items {
    result = "has elements"
} else {
    result = "no elements"
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">While Loop</h3>
      <p>
        Repeats its body while the condition is <code className="text-az-primary">true</code>.
        The condition is checked before each iteration.
      </p>
      <CodeBlock>{`while x < 5 {
    x += 1
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">While/Else</h3>
      <p>
        Like <code className="text-az-primary">for/else</code>, the else branch executes when the
        condition is <code className="text-az-primary">false</code> from the first evaluation (loop
        body never runs).
      </p>
      <CodeBlock>{`while false {
    result = "entered"
} else {
    result = "never entered"
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Loop (infinite)</h3>
      <p>
        The <code className="text-az-primary">loop</code> keyword creates an unconditional infinite
        loop. Use <code className="text-az-primary">break</code> to exit.
      </p>
      <CodeBlock>{`loop {
    x += 1
    if x == 10 { break }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Loop Do-While</h3>
      <p>
        A <code className="text-az-primary">while</code> clause after the{' '}
        <code className="text-az-primary">loop</code> body guarantees at least one execution before
        the condition is checked.
      </p>
      <CodeBlock>{`loop {
    x += 1
} while x < 5`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Loop By (timed interval)</h3>
      <p>
        Creates a loop that pauses for a specified number of milliseconds between iterations. Can be
        combined with infinite loops and the do-while pattern.
      </p>
      <CodeBlock>{`loop by 10 {       // executes with 10ms interval
    x += 1
    if x == 3 { break }
}

loop by 10 {
    x += 1
} while x < 5     // do-while with interval`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">When (pattern matching)</h3>
      <p>
        Matches a value against branches using <code className="text-az-primary">-&gt;</code> arrows.
        No fall-through. Can be used as a statement or expression. Multi-statement branches use curly
        braces.
      </p>
      <CodeBlock>{`// as statement:
when x {
    1 -> result = 10
    2 -> result = 20
    3 -> { var temp = 10; result = temp + 5 }
}

// as expression:
var result = when x {
    1 -> 10
    2 -> 20
    3 -> 30
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Break / Continue</h3>
      <p>
        <code className="text-az-primary">break</code> exits the innermost loop.{' '}
        <code className="text-az-primary">continue</code> skips to the next iteration. Both work
        in <code className="text-az-primary">for</code>, <code className="text-az-primary">while</code>,
        and <code className="text-az-primary">loop</code> (including{' '}
        <code className="text-az-primary">loop by</code>).
      </p>
      <CodeBlock>{`for i in 1..10 {
    if i == 4 { break }
    if i == 3 { continue }
    sum += i
}`}</CodeBlock>
    </Section>
  )
}
