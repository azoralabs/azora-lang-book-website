import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Scopes() {
  return (
    <Section id="scopes" title="11. Scopes">
      <p className="mt-2 text-az-35">
        Azora has explicit lexical scoping. A <code className="text-az-primary">zone</code> introduces
        a new variable scope; <code className="text-az-primary">::</code> reaches into an enclosing
        scope.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">11.1 zone</h3>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">zone</code> block creates a nested scope. Variables
        declared inside are not visible outside; variables outside are visible inside.
      </p>
      <CodeBlock>{`func main() {
    var x = 1
    zone {
        var y = 2
        println(x + y)     // 3 - x is visible from the outer scope
    }
    // y is not visible here
    println(x)             // 1
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">11.2 Shadowing and scope resolution</h3>
      <p className="mt-2 text-az-35">
        An inner variable may <em>shadow</em> an outer one with the same name. Reach the shadowed
        outer variable with <code className="text-az-primary">::name</code>. Each extra{' '}
        <code className="text-az-primary">_::</code> skips one more scope level.
      </p>
      <CodeBlock>{`func main() {
    var x = 1
    zone {
        var x = 2          // shadows the outer x
        println(x)         // 2  (inner)
        println(::x)       // 1  (one scope up)
    }
    println(x)             // 1
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">11.3 friend zone</h3>
      <p className="mt-2 text-az-35">
        Multiple <code className="text-az-primary">friend zone</code> blocks in the same parent scope
        share a single persistent scope. Variables declared in one are visible in the others.
      </p>
      <CodeBlock>{`func main() {
    friend zone {
        var total = 0
        total += 10
    }
    friend zone {
        total += 5         // same 'total' as the first friend zone
        println(total)     // 15
    }
}`}</CodeBlock>
    </Section>
  )
}
