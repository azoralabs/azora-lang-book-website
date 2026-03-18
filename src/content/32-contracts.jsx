import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Contracts() {
  return (
    <Section id="contracts" title="Contracts">
      <p>
        Contracts are precondition and postcondition blocks attached to functions, inspired
        by D. They let you declare what must be true before a function runs and what must be
        true after it returns, separating validation logic from the function body.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Syntax</h3>
      <p>
        Contracts are placed between the return type and the function body. The <code className="text-az-primary">in</code> block
        runs before the body (precondition). The <code className="text-az-primary">out</code> block
        runs after the body (postcondition) and can name the return value. When contracts are
        present, the body must be preceded by the <code className="text-az-primary">scope</code> keyword.
      </p>
      <CodeBlock>{`func clamp(x: Int, lo: Int, hi: Int): Int
in {
    assert lo <= hi
}
out { result ->
    assert result >= lo
    assert result <= hi
}
scope {
    if x < lo { return lo }
    if x > hi { return hi }
    return x
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Rules</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Either order is allowed: <code className="text-az-primary">in</code> before <code className="text-az-primary">out</code> or vice versa</li>
        <li>Both are optional. You can use just <code className="text-az-primary">in</code> or just <code className="text-az-primary">out</code></li>
        <li>The <code className="text-az-primary">out</code> block without a named parameter uses implicit <code className="text-az-primary">it</code></li>
        <li>The <code className="text-az-primary">scope</code> keyword is required before the body when contracts are present</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Implicit <code className="text-az-primary">it</code> in Out</h3>
      <CodeBlock>{`func abs(x: Int): Int
out { assert it >= 0 }
scope {
    if x < 0 { return -x }
    return x
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Supported Declarations</h3>
      <p>
        Contracts work on <code className="text-az-primary">func</code>,{' '}
        <code className="text-az-primary">task</code>, <code className="text-az-primary">impl</code> methods,{' '}
        <code className="text-az-primary">infx</code> methods, and <code className="text-az-primary">solo</code> methods.
      </p>
      <CodeBlock>{`task fetchData(url: String): String
in { assert url != "" }
scope {
    suspend 10
    return "data"
}

impl Rect {
    func area(): Real
    out { assert it >= 0.0 }
    scope {
        return width * height
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Precondition Only</h3>
      <CodeBlock>{`func divide(a: Int, b: Int): Int
in { assert b != 0 }
scope {
    return a / b
}`}</CodeBlock>
    </Section>
  )
}
