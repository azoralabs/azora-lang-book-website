import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Reactivity() {
  return (
    <Section id="reactivity" title="Reactivity">
      <p>
        Azora includes a built-in reactivity system for building interactive UIs and managing
        application state. It introduces eight keywords:{' '}
        <code className="text-az-primary">solo</code>, <code className="text-az-primary">inject</code>,{' '}
        <code className="text-az-primary">wrap</code>, <code className="text-az-primary">bind</code>,{' '}
        <code className="text-az-primary">lazy</code>, <code className="text-az-primary">rem</code>,{' '}
        <code className="text-az-primary">view</code>, and <code className="text-az-primary">effect</code>.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Solo</h3>
      <p>
        A <code className="text-az-primary">solo</code> is a singleton type. Each wrap creates exactly
        one instance, initialized lazily on first <code className="text-az-primary">inject</code>.
        Methods inside a solo have implicit access to its fields (no <code className="text-az-primary">self.</code> needed).
      </p>
      <CodeBlock>{`solo CounterService {
    var count: Int = 0

    func increment() {
        count += 1
    }

    func getCount(): Int {
        return count
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Inject</h3>
      <p>
        Use <code className="text-az-primary">ref x = inject TypeName</code> to resolve a solo instance
        from the active wrap. The <code className="text-az-primary">ref</code> keyword behaves
        like <code className="text-az-primary">fin</code> (immutable binding).
      </p>
      <CodeBlock>{`ref counter = inject CounterService
counter.increment()
println(counter.getCount())   // 1`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Wrap</h3>
      <p>
        A <code className="text-az-primary">wrap</code> groups solo registrations and bindings into
        a dependency injection container. It defines which solos are available and how they
        relate to each other.
      </p>
      <CodeBlock>{`wrap AppModule {
    solo CounterService
    solo LoggingService
    CounterService bind Logger
}

// Lifecycle
App.initLifecycle()    // activate the wrap
// ... use inject to resolve solos ...
App.endLifecycle()     // destroy the wrap`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Bind</h3>
      <p>
        Bindings connect solos to consumers or specs. There are three forms:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Consumer binding:</strong> <code className="text-az-primary">X bind Y</code></li>
        <li><strong>Spec binding:</strong> <code className="text-az-primary">solo ConcreteType bind SpecName</code></li>
        <li><strong>Lazy binding:</strong> <code className="text-az-primary">X lazy bind Y</code> (breaks circular dependencies)</li>
      </ul>
      <CodeBlock>{`wrap AppModule {
    solo HttpClient
    solo ApiService
    ApiService bind HttpClient           // consumer binding
    solo SqliteDb bind DatabaseSpec      // spec binding
    HttpClient lazy bind ApiService      // lazy binding (circular dep)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Rem (Persistent State)</h3>
      <p>
        The <code className="text-az-primary">rem</code> keyword declares persistent state that
        survives re-executions. Unlike <code className="text-az-primary">var</code>, a{' '}
        <code className="text-az-primary">rem</code> variable retains its value across view re-renders.
      </p>
      <CodeBlock>{`rem count: Int = 0
rem name: String = "default"`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">View</h3>
      <p>
        A <code className="text-az-primary">view</code> declares a reactive UI component. Views
        can accept parameters and contain any Azora code in their body.
      </p>
      <CodeBlock>{`view Counter(initial: Int) {
    rem count: Int = initial

    println("Count: $count")
    count += 1
}

view App() {
    Counter(0)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Effect</h3>
      <p>
        An <code className="text-az-primary">effect</code> declares a side effect that runs when
        its dependencies change. The effect body can return a cleanup lambda that runs before
        the next execution or on disposal.
      </p>
      <CodeBlock>{`effect deps {
    println("effect triggered")

    // cleanup: return a lambda
    return {
        println("cleanup")
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Complete Example</h3>
      <CodeBlock>{`solo TimerService {
    var elapsed: Int = 0

    func tick() {
        elapsed += 1
    }
}

wrap GameModule {
    solo TimerService
}

view GameHUD() {
    ref timer = inject TimerService

    rem frames: Int = 0
    frames += 1

    effect timer.elapsed {
        println("Elapsed: $timer.elapsed")
        return { }
    }
}`}</CodeBlock>
    </Section>
  )
}
