import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Table from '../components/Table.jsx'

export default function OperatorOverloading() {
  return (
    <Section id="operator-overloading" title="Operator Overloading">
      <p>
        Azora supports bracket-based operator overloading through <code className="text-az-primary">oper</code> declarations
        inside <code className="text-az-primary">impl</code> blocks. These let you define custom
        indexing, set-indexing, and key-access behavior for your types.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Available Operators</h3>
      <Table
        headers={['Operator', 'Syntax', 'Description']}
        rows={[
          [<code>oper[]</code>, <code>obj[index]</code>, 'Index read'],
          [<code>oper[]=</code>, <code>obj[index] = val</code>, 'Index write'],
          [<code>oper![]</code>, <code>obj![index]</code>, 'Bang index (alternate access)'],
          [<code>oper[:]</code>, <code>{'obj[:key]'}</code>, 'Key read (map-style)'],
          [<code>oper[:]=</code>, <code>{'obj[:key] = val'}</code>, 'Key write (map-style)'],
        ]}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Index Operators</h3>
      <p>
        Define <code className="text-az-primary">oper[]</code> and <code className="text-az-primary">oper[]=</code> to
        enable bracket-based access on your types.
      </p>
      <CodeBlock>{`pack Grid<T> {
    data: T[]
    width: Int
}

impl Grid<T> {
    oper[](x: Int, y: Int): T {
        return data[y * width + x]
    }

    oper[]=(x: Int, y: Int, value: T) {
        data[y * width + x] = value
    }
}

var g = Grid(data: [1, 2, 3, 4], width: 2)
var val = g[1, 0]     // reads data[1]
g[0, 1] = 99          // writes data[2]`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Key Operators</h3>
      <p>
        The <code className="text-az-primary">oper[:]</code> and <code className="text-az-primary">oper[:]=</code> operators
        provide map-style key access. The <code className="text-az-primary">[:key]</code> syntax is
        visually distinct from array indexing.
      </p>
      <CodeBlock>{`impl Map<K, V> {
    oper[:](key: K): V { ... }
    oper[:](key: K, value: V) { ... }
}

var m: [String:Int] = ["x": 1, "y": 2]
var v = m[:"x"]       // key read
m[:"z"] = 3           // key write`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Bang Index</h3>
      <p>
        The <code className="text-az-primary">oper![]</code> operator provides an alternate
        index access, typically used for unchecked or unsafe access patterns.
      </p>
      <CodeBlock>{`impl SafeArray<T> {
    oper[](i: Int): T? {
        // bounds-checked, returns null if out of range
    }

    oper![](i: Int): T {
        // unchecked direct access
    }
}`}</CodeBlock>
    </Section>
  )
}
