import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function FlipFlop() {
  return (
    <Section id="flip-flop" title="Flip/Flop">
      <p>
        <code className="text-az-primary">flip</code>/<code className="text-az-primary">flop</code> alternates
        execution between two blocks on successive calls. The first time execution reaches the construct,
        the <code className="text-az-primary">flip</code> block runs; the second time,
        the <code className="text-az-primary">flop</code> block runs; then it flips back, and so on.
        The alternation state is internal and managed automatically.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Syntax</h3>
      <p>
        Place the two blocks side by side with <code className="text-az-primary">flip</code> before the
        first and <code className="text-az-primary">flop</code> before the second. Both blocks can contain
        any valid statements.
      </p>
      <CodeBlock>{`func toggle(): String {
    flip {
        return "flip"
    } flop {
        return "flop"
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Behavior</h3>
      <p>
        The first call executes <code className="text-az-primary">flip</code>, the second
        executes <code className="text-az-primary">flop</code>, alternating indefinitely:
      </p>
      <CodeBlock>{`assert toggle() == "flip"
assert toggle() == "flop"
assert toggle() == "flip"
assert toggle() == "flop"`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Comparison with Boolean Flags</h3>
      <p>
        Without flip/flop, you would need a mutable boolean and explicit toggling:
      </p>
      <CodeBlock>{`// Without flip/flop (manual approach):
var isFlip = true
func toggleManual(): String {
    if isFlip {
        isFlip = false
        return "flip"
    } else {
        isFlip = true
        return "flop"
    }
}`}</CodeBlock>
      <p>
        Flip/flop eliminates the external mutable variable, the branching, and the toggling logic.
        The state is fully encapsulated.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Multiple Flip/Flop</h3>
      <p>
        Each <code className="text-az-primary">flip</code>/<code className="text-az-primary">flop</code> pair
        tracks its alternation independently:
      </p>
      <CodeBlock>{`func multi() {
    flip { log = log + "A" } flop { log = log + "B" }
    flip { log = log + "1" } flop { log = log + "2" }
}
multi()    // log == "A1"
multi()    // log == "A1B2"
multi()    // log == "A1B2A1"`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Limitations</h3>
      <p>
        Flip/flop supports exactly two states. For three or more, use an enum with a match expression.
        The construct is limited to function bodies. Because state is tracked per call site, a flip/flop
        inside a loop alternates on each iteration, not on each call to the enclosing function.
      </p>

      <p className="mt-4 text-sm text-az-50">
        <code className="text-az-primary">flip</code>/<code className="text-az-primary">flop</code> can
        only be used inside function bodies. State is tracked per call site. For more than two states,
        prefer an enum with a match expression.
      </p>
    </Section>
  )
}
