import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function AdvancedTypes() {
  return (
    <Section id="advanced-types" title="35. Advanced Types & Modifiers">
      <p className="mt-2 text-az-35">
        A round-up of features that round out larger programs: variadic generics, decorators,
        visibility, and per-thread storage.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">35.1 Variadic generics</h3>
      <p className="mt-2 text-az-35">
        The last type parameter can be variadic (<code className="text-az-primary">&lt;...T&gt;</code>);
        a parameter spelled <code className="text-az-primary">rest: ...T</code> collects the remaining
        call arguments into an array you can iterate.
      </p>
      <CodeBlock>{`func<...T> variadicSum(first: Int, rest: ...T): Int {
    var total = first
    for x in rest {
        total = total + x
    }
    return total
}

func main() {
    println(variadicSum(1, 2))          // 3
    println(variadicSum(1, 2, 3, 4))    // 10
}`}</CodeBlock>

      <p className="mt-2 text-az-35">
        Going the other way, the <strong>spread</strong> operator{' '}
        <code className="text-az-primary">f(arr...)</code> splats an array's elements out as
        individual arguments.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">35.2 Decorators</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">deco Name {`{ fields }`}</code> declares an annotation type;
        apply it with <code className="text-az-primary">@Name</code> or{' '}
        <code className="text-az-primary">@Name(args)</code>. Annotations are parsed and stored on the
        declaration.
      </p>
      <CodeBlock>{`deco Log {
    msg: String
}

@Log("entry")
func greet(): String {
    return "hi"
}

func main() {
    println(greet())        // hi
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">35.3 Visibility</h3>
      <p className="mt-2 text-az-35">
        Prefix a declaration with <code className="text-az-primary">expose</code> (public),{' '}
        <code className="text-az-primary">confine</code> (private), or{' '}
        <code className="text-az-primary">protect</code> (protected).
      </p>
      <CodeBlock>{`expose func helper(): String {
    return "ok"
}

confine func secret(): String {
    return "private"
}

func main() {
    println(helper())       // ok
    println(secret())       // private
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">35.4 Thread-local storage</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">threadlocal</code> gives each coroutine its own independent
        copy of a binding — handy for per-task counters or caches.
      </p>
      <CodeBlock>{`threadlocal fin answer = 42

func main() {
    println(answer)         // 42
}`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Two more scoping tools: <code className="text-az-primary">zone Name {`{ }`}</code> creates a
        named namespace whose members you reach as <code className="text-az-primary">Name::member</code>,
        and the <code className="text-az-primary">use</code> import brings in standard-library modules
        on demand (e.g. <code className="text-az-primary">use std.math</code>).
      </p>
    </Section>
  )
}
