import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Hooks() {
  return (
    <Section id="hooks" title="Hooks">
      <p>
        Hooks are lifecycle entry points in Azora scripts. They run in a suspendable context,
        meaning they can use <code className="text-az-primary">suspend</code>, <code className="text-az-primary">async</code>/<code className="text-az-primary">await</code>,
        and <code className="text-az-primary">launch</code> directly. Hooks require
        the <code className="text-az-primary">@file:script(hooks = true)</code> decorator at the top of the file.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Declaration</h3>
      <p>
        Declare with the <code className="text-az-primary">hook</code> keyword. The two primary hooks
        are <code className="text-az-primary">onStart</code> (runs once at application launch)
        and <code className="text-az-primary">onUpdate</code> (runs every frame/tick). Hooks are invoked
        automatically by the engine, not called from user code.
      </p>

      <CodeBlock>{`hook onStart() {
    println("Application started")
}

hook onUpdate() {
    println("tick")
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Behavior</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li><code className="text-az-primary">onStart</code> is the main entry point (equivalent to <code>main</code>)</li>
        <li><code className="text-az-primary">onStart</code> completes fully before the first <code className="text-az-primary">onUpdate</code> call</li>
        <li>Hooks support <code className="text-az-primary">suspend</code> and other async operations</li>
        <li>Hooks cannot have <code className="text-az-primary">expose</code> applied to them</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Kotlin Code Generation</h3>
      <p>When targeting Kotlin:</p>
      <CodeBlock>{`// hook onStart() -> fun main()
// hook onUpdate() -> fun onUpdate()`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Example</h3>
      <CodeBlock>{`@file:script(hooks = true)
package mygame

hook onStart() {
    // Load assets, initialize state
    println("Game starting...")
}

hook onUpdate() {
    // Read input, update world, render frame
    println("Frame update")
}`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: Keep hooks concise. Factor complex initialization into separate tasks
        that you <code className="text-az-primary">await</code> inside <code className="text-az-primary">onStart</code>, and
        factor frame logic into focused functions called from <code className="text-az-primary">onUpdate</code>.
      </p>
    </Section>
  )
}
