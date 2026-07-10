import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function DependencyInjection() {
  return (
    <Section id="dependency-injection" title="32. Dependency Injection">
      <p className="mt-2 text-az-35">
        Azora has a small, explicit dependency-injection system for singletons. Declare one with{' '}
        <code className="text-az-primary">solo</code>, resolve it anywhere with{' '}
        <code className="text-az-primary">inject</code>, and wire several together in a{' '}
        <code className="text-az-primary">wrap</code> container.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">32.1 A solo singleton</h3>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">solo</code> is a struct with a single lazily-created
        shared instance. Methods take <code className="text-az-primary">self</code> just like an{' '}
        <code className="text-az-primary">impl</code>.
      </p>
      <CodeBlock>{`solo Config {
    var value: Int = 42
    func get(): Int {
        return self.value
    }
}

func main() {
    println(inject Config.get())   // 42
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">32.2 The same instance every time</h3>
      <p className="mt-2 text-az-35">
        Every <code className="text-az-primary">inject</code> of the same{' '}
        <code className="text-az-primary">solo</code> returns the identical object, so state persists
        across calls (and stays thread-safe under parallelism).
      </p>
      <CodeBlock>{`solo Counter {
    var n: Int = 0
    func inc(): Int {
        self.n = self.n + 1
        return self.n
    }
}

func main() {
    var c1 = inject Counter
    println(c1.inc())          // 1
    println(c1.inc())          // 2
    var c2 = inject Counter
    println(c2.inc())          // 3   — same instance
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">32.3 Fields, and wiring with wrap</h3>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">solo</code>'s fields are accessible directly. When a
        singleton needs construction arguments, declare them in a{' '}
        <code className="text-az-primary">wrap</code>{' '}
        <code className="text-az-primary">Name {`{ solo Type(args); … }`}</code> container, then{' '}
        <code className="text-az-primary">inject</code> resolves the wired instance.
      </p>
      <CodeBlock>{`solo Greeting {
    var msg: String = "hello"
}

func main() {
    var g = inject Greeting
    println(g.msg)             // hello
}`}</CodeBlock>
    </Section>
  )
}
