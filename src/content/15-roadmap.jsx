import Section from '../components/Section.jsx'

export default function Roadmap() {
  const groups = [
    {
      title: 'Type system',
      items: [
        
        'Slots (tagged unions with payloads)',
        'Variadic generics',
      ],
    },
    {
      title: 'Functions & closures',
      items: [
        'Trailing-lambda call syntax and an implicit `it`',
        'Named arguments',
        'Operator overloading and infix functions',
      ],
    },
    {
      title: 'Errors & control',
      items: [
        'Error sets and error unions (T!E)',
        'guard and defer',
      ],
    },
    {
      title: 'Systems',
      items: [
        'Pointers and manual memory (alloc, deref, drop, regions)',
        'Concurrency: tasks, async/await, flows, channels',
        'Decorators and compile-time reflection',
        'Foreign function interface (bridge)',
        'Dependency injection (solo / wrap / inject)',
        'Inheritance trees (node / leaf)',
      ],
    },
    {
      title: 'Platform',
      items: [
        'Modules, packages, and use imports',
        'A standard library (containers, math, strings, algorithms)',
        'Reactive UI components (view / rem / effect)',
        'A project build tool and the full CLI',
      ],
    },
  ]

  return (
    <Section id="roadmap" title="22. Roadmap">
      <p className="mt-2 text-az-35">
        Azora is under active development. This chapter lists what is designed but not yet
        implemented by the compiler. Each item is part of the language's intended shape; the
        chapters above document only what compiles and runs <em>today</em>.
      </p>
      <div className="space-y-6 mt-4">
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
      <p className="mt-6 text-az-50">
        <strong>Note:</strong> the language design draws on an earlier interpreter-based compiler.
        As features land in the new IR-based compiler, they will graduate into their own chapters
        with runnable examples.
      </p>
    </Section>
  )
}
