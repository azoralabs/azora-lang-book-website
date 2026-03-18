import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Collections() {
  return (
    <Section id="collections" title="Collections">
      <p>
        Azora provides built-in literal syntax for sets and maps alongside arrays. Collection
        literals can also be coerced into their corresponding standard library container types
        when assigned to a typed variable.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Set Literals</h3>
      <p>
        A set literal is written with <code className="text-az-primary">![</code> and <code className="text-az-primary">]</code>.
        Sets contain unique elements with no guaranteed order. The type annotation
        uses <code className="text-az-primary">![Type]</code>.
      </p>
      <CodeBlock>{`var s: ![Int] = ![1, 2, 3]
var empty: ![String] = ![]

// Duplicates are ignored:
var unique: ![Int] = ![1, 1, 2, 2, 3]   // ![1, 2, 3]`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Map Literals</h3>
      <p>
        A map literal uses <code className="text-az-primary">[key: value]</code> syntax. The empty
        map is <code className="text-az-primary">[:]</code>. Type annotations
        use <code className="text-az-primary">[KeyType:ValueType]</code>.
      </p>
      <CodeBlock>{`var m: [String:Int] = ["a": 1, "b": 2, "c": 3]
var empty: [String:Int] = [:]

// Access by key:
var val = m[:key]

// Set by key:
m[:key] = value`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Map key access uses the <code className="text-az-primary">[:key]</code> postfix syntax,
        which is distinct from array indexing (<code className="text-az-primary">[index]</code>).
        This keeps the two operations visually distinguishable.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Literal-to-Container Coercion</h3>
      <p>
        When you assign an array, set, or map literal to a variable typed as the corresponding
        standard library container pack (<code className="text-az-primary">List</code>,{' '}
        <code className="text-az-primary">Set</code>, <code className="text-az-primary">Map</code>),
        Azora automatically coerces the literal into a container instance.
      </p>
      <CodeBlock>{`var list: List<Int> = [1, 2, 3]       // array literal -> List
var set: Set<Int> = ![1, 2, 3]        // set literal -> Set
var map: Map<String, Int> = ["a": 1]  // map literal -> Map`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Mutability</h3>
      <p>
        Collection values carry a <code className="text-az-primary">isMutable</code> flag.
        Collections assigned to <code className="text-az-primary">var</code> bindings are mutable;
        those assigned to <code className="text-az-primary">fin</code> are immutable.
      </p>
      <CodeBlock>{`var mutable: ![Int] = ![1, 2]    // mutable set
fin frozen: ![Int] = ![1, 2]    // immutable set`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Map Operators</h3>
      <p>
        Maps support operator overloading through <code className="text-az-primary">oper[:]</code> (read)
        and <code className="text-az-primary">oper[:]=</code> (write). These are the bracket-based
        operator forms used for key-value access on any type that defines them.
      </p>
      <CodeBlock>{`impl Map<K, V> {
    oper[:](key: K): V { ... }
    oper[:](key: K, value: V) { ... }
}`}</CodeBlock>
    </Section>
  )
}
