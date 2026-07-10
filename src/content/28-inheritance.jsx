import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Inheritance() {
  return (
    <Section id="inheritance" title="28. Inheritance">
      <p className="mt-2 text-az-35">
        Azora supports single inheritance with dynamic dispatch. A{' '}
        <code className="text-az-primary">node</code> is an inheritable base type; a{' '}
        <code className="text-az-primary">leaf</code> is a final subclass. Methods are virtual by
        default in a <code className="text-az-primary">node</code>, and a{' '}
        <code className="text-az-primary">repl func</code> overrides a parent method.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">28.1 A node with fields and methods</h3>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">node</code>'s constructor parameters are stored as fields,
        accessible on <code className="text-az-primary">self</code>.
      </p>
      <CodeBlock>{`node Animal(name: String) {
    func speak(): String {
        return "..."
    }
    func describe(): String {
        return self.name
    }
}

func main() {
    var a = Animal("Rex")
    println(a.describe())   // Rex
    println(a.speak())      // ...
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">28.2 Subclassing with leaf and repl</h3>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">leaf</code> declares its parent with{' '}
        <code className="text-az-primary">: Parent(args)</code>, forwarding constructor arguments. It
        inherits the parent's fields.
      </p>
      <CodeBlock>{`node Animal(name: String) {
    func speak(): String {
        return "generic"
    }
}

leaf Dog(name: String) : Animal(name) {
    repl func speak(): String {
        return "Woof"
    }
}

func main() {
    var d = Dog("Rex")
    println(d.name)         // Rex   (inherited field)
    println(d.speak())      // Woof  (overridden method)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">28.3 Dynamic dispatch</h3>
      <p className="mt-2 text-az-35">
        A parent-typed variable calls the <em>runtime</em> type's method. Assigning a{' '}
        <code className="text-az-primary">Dog</code> to an{' '}
        <code className="text-az-primary">Animal</code> and calling{' '}
        <code className="text-az-primary">speak</code> runs the dog's override.
      </p>
      <CodeBlock>{`node Animal(name: String) {
    func speak(): String {
        return "generic"
    }
}

leaf Dog(name: String) : Animal(name) {
    repl func speak(): String {
        return "Woof"
    }
}

func main() {
    var a: Animal = Dog("Rex")
    println(a.speak())      // Woof
}`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Use <code className="text-az-primary">virt func</code> to mark a method virtual explicitly,
        and <code className="text-az-primary">base.method()</code> inside a{' '}
        <code className="text-az-primary">repl</code> to call the parent's implementation.
      </p>
    </Section>
  )
}
