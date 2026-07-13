import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Roadmap() {
  const done = [
    'Variadic generics & the spread operator (ch. 35)',
    'Failable types and error sets, T!E (ch. 30)',
    'Pointers and the memory model — alloc, deref, drop, arenas, pointer arithmetic (ch. 29)',
    'Concurrency — flows, tasks, await, channels, launch, with real parallelism (ch. 31)',
    'Decorators and annotations (ch. 35)',
    'Foreign function interface, bridge (ch. 33)',
    'Dependency injection — solo / wrap / inject (ch. 32)',
    'Inheritance — node / leaf / repl / virt / base (ch. 28)',
    'Reactive components — mem / rem / ret / effect / view (ch. 34)',
    'Active codegen targets — JavaScript, WebAssembly, LLVM, plus the interpreter (ch. 14)',
  ]

  const groups = [
    {
      title: 'Language',
      items: [
        'Full reactivity — automatic dependency tracking so mem/rem/ret/effect re-run when state changes (today they run once).',
        'UI rendering — view components compile and run, but the core compiler has no built-in DOM/Compose renderer (the web target lives in the engine).',
        'Stronger T!E enforcement — failable types are checked on the declaration side; full call-site propagation is future work.',
        'Fixed-size arrays [T; N] and ref reference bindings.',
      ],
    },
    {
      title: 'Backends',
      items: [
        'LLVM IR — placeholders remain for closures, defer, and compound types.',
        'Multi-statement lambda codegen is best-effort in the active source backends.',
        'Generics use type erasure (field types are Any at runtime).',
      ],
    },
    {
      title: 'Tooling',
      items: [
        'Semantic use resolution — imports are currently merged by the CLI rather than resolved by name.',
      ],
    },
  ]

  return (
    <Section id="roadmap" title="36. Roadmap">
      <p className="mt-2 text-az-35">
        Azora is under active development. The chapters above document everything that compiles and
        runs today — and that list has grown considerably. Here is what has recently landed, followed
        by what is still ahead.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Recently shipped</h3>
      <ul className="list-disc pl-6 space-y-1">
        {done.map((item) => (
          <li key={item} className="text-az-35">{item}</li>
        ))}
      </ul>

      <div className="space-y-6 mt-6">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-lg font-semibold mb-2 text-az-25">{group.title}</h3>
            <ul className="list-disc pl-6 space-y-1">
              {group.items.map((item) => (
                <li key={item} className="text-az-35">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
