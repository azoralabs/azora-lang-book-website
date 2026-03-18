import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function ScopesPackages() {
  return (
    <Section id="scopes-packages" title="Scopes & Packages">
      <p>
        Azora provides <code className="text-az-primary">package</code> declarations for grouping files into
        modules, and <code className="text-az-primary">scope</code> blocks for grouping related declarations
        within a file. Together they form a hierarchical namespace system that prevents naming
        collisions and makes dependencies explicit.
      </p>

      <h3 className="text-lg font-semibold mt-2 mb-2 text-az-25">Package Declaration</h3>
      <p>
        Every source file begins with a <code className="text-az-primary">package</code> declaration. The
        name is a dot-separated identifier establishing the file&rsquo;s place in the module hierarchy.
      </p>
      <CodeBlock>{`package demo
package std.math`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Scope Declaration</h3>
      <p>
        A <code className="text-az-primary">scope</code> is a named namespace that groups related declarations.
        Scopes are not types and cannot be instantiated.
      </p>
      <CodeBlock>{`scope media {
    var a: Real = 3.14
    fin PI = 3.14159265358979
    func square(x: Int): Int = x * x
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Nested Scopes</h3>
      <p>
        Scopes can be nested. Access nested members by chaining
        with <code className="text-az-primary">::</code>.
      </p>
      <CodeBlock>{`expose scope std {
    scope math {
        fin PI = 3.14159265358979
        fin E = 2.71828182845905
    }
    func lerp(a: Real, b: Real, t: Real): Real = a + (b - a) * t
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Scope Access (<code className="text-az-primary">::</code>)</h3>
      <p>
        The double-colon operator accesses members of a scope. It works at any depth and is resolved
        entirely at compile time with no runtime overhead.
      </p>
      <CodeBlock>{`var x = media::a
var pi = std::math::PI`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25"><code className="text-az-primary">use</code> and <code className="text-az-primary">use scope</code></h3>
      <p>
        <code className="text-az-primary">use</code> imports a package by its dot-separated name.
        <code className="text-az-primary"> use scope</code> imports the members of a specific scope into the
        current namespace. Grouped imports are supported with curly braces.
      </p>
      <CodeBlock>{`use std.math                         // package import
use scope std                        // import scope members
use scope std::math                  // import nested scope
use scope std::{math, container}     // grouped import`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Exposed Scopes</h3>
      <p>
        By default, scopes are private to their file. Prefix
        with <code className="text-az-primary">expose</code> to make a scope visible to other files and
        importers.
      </p>
      <CodeBlock>{`expose scope std {
    // All contents become available to other files
}`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: Use qualified <code className="text-az-primary">::</code> access for clarity when referencing
        scoped symbols occasionally. Reserve <code className="text-az-primary">use scope</code> for scopes
        you reference frequently.
      </p>
    </Section>
  )
}
