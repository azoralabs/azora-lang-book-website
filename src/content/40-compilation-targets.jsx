import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function CompilationTargets() {
  return (
    <Section id="compilation-targets" title="Compilation Targets">
      <p className="mt-2 text-az-35">
        Azora is a multi-target language. The same source code can compile to ten different
        backends, plus a tree-walking interpreter for development and testing. Each target
        translates Azora constructs into idiomatic code for its platform. The{' '}
        <code className="text-az-primary">@target</code> annotation lets you restrict
        declarations to specific platforms when needed.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.1 Overview</h3>
      <p className="mt-2 text-az-35">
        Azora supports the following compilation targets:
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li><strong>JavaScript</strong> (.WebJs), ES6 classes and modules</li>
        <li><strong>Kotlin/JVM</strong> (.KotlinJvm), runs on the Java Virtual Machine</li>
        <li><strong>Kotlin Multiplatform</strong> (.Kmp), shared Kotlin code across platforms</li>
        <li><strong>C#</strong> (.Csharp), .NET classes and methods</li>
        <li><strong>Python</strong> (.Python), Python 3 classes and functions</li>
        <li><strong>Swift</strong> (.Swift), Swift 6.2 classes and protocols</li>
        <li><strong>Dart</strong> (.Dart), Dart 3 with sealed classes and sound null safety</li>
        <li><strong>Rust</strong> (.Rust), Rust structs, traits, and enum variants</li>
        <li><strong>LLVM IR</strong> (.Native), compiles to native machine code via LLVM</li>
        <li><strong>WebAssembly</strong> (.WebWasm), runs in browsers alongside JS</li>
        <li><strong>Interpreter</strong>, tree-walking execution for development and testing</li>
      </ul>
      <p className="mt-2 text-az-35">
        Without a <code className="text-az-primary">@target</code> annotation, declarations are
        available on all targets. This means most of your code compiles everywhere with no
        extra effort.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.2 The @target Annotation</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">@target</code> annotation restricts a declaration
        to one or more compilation targets. Place it directly before the declaration it applies to.
      </p>
      <CodeBlock>{`// Only available when compiling to LLVM IR (native)
@target(.Native)
func readFile(path: String): String {
    // native file I/O implementation
}

// Available on both JS targets
@target(.WebJs, .WebWasm)
func fetchUrl(url: String): String {
    // browser-based fetch implementation
}

// Available on JVM-based targets
@target(.KotlinJvm, .Kmp)
func connectDatabase(url: String): Connection {
    // JDBC-based implementation
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        All valid target values:
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li><code className="text-az-primary">.Native</code>, LLVM IR / native compilation</li>
        <li><code className="text-az-primary">.KotlinJvm</code>, Kotlin on JVM</li>
        <li><code className="text-az-primary">.Kmp</code>, Kotlin Multiplatform</li>
        <li><code className="text-az-primary">.Python</code>, Python 3</li>
        <li><code className="text-az-primary">.WebJs</code>, JavaScript</li>
        <li><code className="text-az-primary">.WebWasm</code>, WebAssembly</li>
        <li><code className="text-az-primary">.Csharp</code>, C#</li>
        <li><code className="text-az-primary">.Swift</code>, Swift 6.2</li>
        <li><code className="text-az-primary">.Dart</code>, Dart 3</li>
        <li><code className="text-az-primary">.Rust</code>, Rust</li>
      </ul>
      <p className="mt-2 text-az-35">
        Without <code className="text-az-primary">@target</code>, a declaration is compiled for
        every target.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.3 JavaScript Target</h3>
      <p className="mt-2 text-az-35">
        The JavaScript target generates ES6-compatible code. Azora constructs map naturally
        to JavaScript equivalents.
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li>Packs become ES6 classes with constructor parameters</li>
        <li>String interpolation uses JS template literals</li>
        <li>Arrays map directly to JavaScript arrays</li>
        <li>Tests output PASS/FAIL messages to the console</li>
        <li>Enums become frozen object literals</li>
      </ul>
      <CodeBlock language="azora">{`// Azora source
pack User {
    var name: String
    var age: Int
}

fin u = User(name: "Alice", age: 30)
println("Hello, " + u.name + "!")`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Generated JavaScript (simplified):
      </p>
      <CodeBlock language="javascript">{`class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

const u = new User("Alice", 30);
console.log("Hello, " + u.name + "!");`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.4 Kotlin Target</h3>
      <p className="mt-2 text-az-35">
        The Kotlin target generates idiomatic Kotlin code. There are two variants:
        KotlinJvm (targeting the JVM directly) and Kmp (Kotlin Multiplatform for shared code).
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li>Packs become Kotlin data classes</li>
        <li>Specs map to Kotlin interfaces</li>
        <li>Bridge .JVM maps to direct Kotlin/Java function calls</li>
        <li>fin becomes val, var stays var</li>
      </ul>
      <CodeBlock language="azora">{`// Azora source
pack Point {
    var x: Real
    var y: Real
}

fin p = Point(x: 1.0, y: 2.0)
println("Point: " + p.x as String + ", " + p.y as String)`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Generated Kotlin (simplified):
      </p>
      <CodeBlock language="kotlin">{`data class Point(val x: Double, val y: Double)

val p = Point(1.0, 2.0)
println("Point: " + p.x.toString() + ", " + p.y.toString())`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.5 C# Target</h3>
      <p className="mt-2 text-az-35">
        The C# target generates .NET-compatible C# code.
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li>Packs become C# classes with properties</li>
        <li>Specs map to C# interfaces</li>
        <li>Bridge .CS maps to static method calls</li>
        <li>fin becomes readonly fields</li>
      </ul>
      <CodeBlock language="azora">{`// Azora source
pack Item {
    var name: String
    var price: Real
}

fin item = Item(name: "Widget", price: 9.99)
println(item.name + ": " + item.price as String)`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Generated C# (simplified):
      </p>
      <CodeBlock language="csharp">{`public class Item {
    public string Name { get; }
    public double Price { get; }
    public Item(string name, double price) {
        Name = name;
        Price = price;
    }
}

var item = new Item("Widget", 9.99);
Console.WriteLine(item.Name + ": " + item.Price.ToString());`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.6 Python Target</h3>
      <p className="mt-2 text-az-35">
        The Python target generates Python 3 code.
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li>Packs become Python classes with <code className="text-az-primary">__init__</code></li>
        <li>Integer division uses <code className="text-az-primary">//</code> for int operands</li>
        <li>Bridge .PY maps to Python function calls</li>
        <li>Operator overloading maps to Python dunder methods</li>
      </ul>
      <CodeBlock language="azora">{`// Azora source
pack Rect {
    var width: Int
    var height: Int
}

impl Rect {
    func area(): Int { ref self ->
        self.width * self.height
    }
}

fin r = Rect(width: 10, height: 5)
println(r.area() as String)`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Generated Python (simplified):
      </p>
      <CodeBlock language="python">{`class Rect:
    def __init__(self, width, height):
        self.width = width
        self.height = height

def _impl_area(self):
    return self.width * self.height
Rect.area = _impl_area

r = Rect(10, 5)
print(str(r.area()))`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.7 Swift Target</h3>
      <p className="mt-2 text-az-35">
        The Swift target generates Swift 6.2 code.
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li>Packs become Swift classes</li>
        <li>Specs become Swift protocols</li>
        <li>Tree inheritance maps to class inheritance</li>
        <li>Bridge .SWIFT maps to Foundation and native Swift calls</li>
      </ul>
      <CodeBlock language="azora">{`// Azora source
spec Drawable {
    func draw(): String
}

pack Circle {
    var radius: Real
}

impl Drawable for Circle {
    func draw(): String { ref self ->
        return "Circle with radius " + self.radius as String
    }
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Generated Swift (simplified):
      </p>
      <CodeBlock language="swift">{`protocol Drawable {
    func draw() -> String
}

class Circle: Drawable {
    let radius: Double
    init(radius: Double) { self.radius = radius }
    func draw() -> String {
        return "Circle with radius " + String(describing: self.radius)
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.8 Dart Target</h3>
      <p className="mt-2 text-az-35">
        The Dart target generates idiomatic Dart 3 code with sound null safety, sealed classes,
        and pattern matching. It integrates with Flutter for cross-platform mobile, desktop, and
        web applications.
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li>Packs become Dart classes with named constructor parameters and copyWith()</li>
        <li>Slots map to Dart <code className="text-az-primary">sealed class</code> with subtype variants</li>
        <li>Nullable types map directly to Dart null safety (<code className="text-az-primary">Type?</code> syntax)</li>
        <li><code className="text-az-primary">fin</code> becomes <code className="text-az-primary">final</code>, <code className="text-az-primary">var</code> stays <code className="text-az-primary">var</code></li>
        <li>Enums use Dart enhanced enum syntax with methods</li>
        <li>Views generate Flutter <code className="text-az-primary">StatefulWidget</code> classes</li>
        <li>Match/when maps to Dart 3 <code className="text-az-primary">switch</code> expressions with patterns</li>
      </ul>
      <CodeBlock language="azora">{`// Azora source
slot Shape {
    Circle(radius: Real),
    Rectangle(width: Real, height: Real)
}

func describe(s: Shape): String {
    return when s {
        .Circle -> "Circle"
        .Rectangle -> "Rectangle"
    }
}

pack User {
    name: String
    age: Int
}

fin u = User(name: "Alice", age: 30)
println(u.name)`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Generated Dart (simplified):
      </p>
      <CodeBlock language="dartlang">{`sealed class Shape {}

class Circle extends Shape {
  final double radius;
  Circle({required this.radius});
}

class Rectangle extends Shape {
  final double width;
  final double height;
  Rectangle({required this.width, required this.height});
}

String describe(Shape s) {
  return switch (s) {
    Circle() => 'Circle',
    Rectangle() => 'Rectangle',
  };
}

class User {
  String name;
  int age;
  User({this.name = '', this.age = 0});
}

void main() {
  final u = User(name: 'Alice', age: 30);
  print(u.name);
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Compile with: <code className="text-az-primary">azora compile dart my_script.az</code>
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.9 Rust Target</h3>
      <p className="mt-2 text-az-35">
        The Rust target generates idiomatic Rust code. Azora's type system maps closely to
        Rust's ownership model, pattern matching, and trait system, making this target well
        suited for systems programming and performance-critical applications.
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li>Packs become structs with <code className="text-az-primary">#[derive(Debug, Clone, PartialEq)]</code></li>
        <li>Specs map to Rust <code className="text-az-primary">trait</code> definitions</li>
        <li>Slots map to Rust <code className="text-az-primary">enum</code> with variant data (tagged unions)</li>
        <li>Nullable types map to <code className="text-az-primary">Option&lt;T&gt;</code></li>
        <li>Operator overloading via <code className="text-az-primary">impl std::ops</code> traits</li>
        <li>Destructors via <code className="text-az-primary">impl Drop</code></li>
        <li><code className="text-az-primary">fin</code> becomes <code className="text-az-primary">let</code>, <code className="text-az-primary">var</code> becomes <code className="text-az-primary">let mut</code></li>
        <li>Match/when maps to Rust <code className="text-az-primary">match</code> expressions</li>
      </ul>
      <CodeBlock language="azora">{`// Azora source
spec Drawable {
    func draw(): String
}

pack Circle {
    var radius: Real
}

impl Drawable for Circle {
    func draw(): String { ref self ->
        return "Circle r=" + self.radius as String
    }
}

slot Color {
    Red,
    Green,
    Blue,
    Custom(r: Int, g: Int, b: Int)
}

func colorName(c: Color): String {
    return when c {
        .Red -> "red"
        .Green -> "green"
        .Blue -> "blue"
        .Custom -> "custom"
    }
}

fin c = Circle(radius: 5.0)
println(c.draw())`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Generated Rust (simplified):
      </p>
      <CodeBlock language="rust">{`use std::collections::HashMap;

trait Drawable {
    fn draw(&self) -> String;
}

#[derive(Debug, Clone, PartialEq)]
struct Circle {
    pub radius: f64,
}
impl Circle {
    fn new(radius: f64) -> Self { Self { radius } }
}

impl Drawable for Circle {
    fn draw(&self) -> String {
        format!("Circle r={}", self.radius)
    }
}

#[derive(Debug, Clone, PartialEq)]
enum Color {
    Red,
    Green,
    Blue,
    Custom { r: i32, g: i32, b: i32 },
}

fn color_name(c: &Color) -> String {
    match c {
        Color::Red => "red".to_string(),
        Color::Green => "green".to_string(),
        Color::Blue => "blue".to_string(),
        Color::Custom { .. } => "custom".to_string(),
    }
}

fn main() {
    let c = Circle::new(5.0);
    println!("{}", c.draw());
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Compile with: <code className="text-az-primary">azora compile rust my_script.az</code>
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.10 WebAssembly Target</h3>
      <p className="mt-2 text-az-35">
        The WebAssembly target compiles Azora to WASI-compatible WebAssembly Text format (WAT).
        The generated WAT is compiled to a binary WASM module using <code className="text-az-primary">wat2wasm</code> and
        executed with <code className="text-az-primary">wasmtime</code> or any WASI-compatible runtime. WebAssembly
        runs in browsers, edge runtimes, and standalone environments with near-native performance.
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li>Integers map to <code className="text-az-primary">i32</code>, reals to <code className="text-az-primary">f64</code>, strings to memory pointers</li>
        <li>A built-in bump allocator manages linear memory for arrays, packs, and strings</li>
        <li>Static strings are pooled in a data segment with length-prefixed encoding</li>
        <li>WASI <code className="text-az-primary">fd_write</code> provides I/O (println, print)</li>
        <li>Packs compile to struct-like memory layouts with field-offset access</li>
        <li>Functions compile directly to WASM <code className="text-az-primary">(func ...)</code> definitions</li>
        <li>Tests use a global flag pattern since WASM MVP has no exceptions</li>
      </ul>
      <CodeBlock language="azora">{`// Azora source
func factorial(n: Int): Int {
    if n <= 1 { return 1 }
    return n * factorial(n - 1)
}

test "factorial of 5" {
    assert factorial(5) == 120
}

test "factorial of 0" {
    assert factorial(0) == 1
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Generated WAT (simplified):
      </p>
      <CodeBlock language="wasm">{`(module
  (import "wasi_snapshot_preview1" "fd_write"
    (func $fd_write (param i32 i32 i32 i32) (result i32)))
  (memory (export "memory") 1)

  (func $factorial (param $n i32) (result i32)
    (if (result i32) (i32.le_s (local.get $n) (i32.const 1))
      (then (i32.const 1))
      (else
        (i32.mul (local.get $n)
          (call $factorial
            (i32.sub (local.get $n) (i32.const 1)))))))

  (func $_start (export "_start")
    ;; test "factorial of 5"
    (if (i32.ne (call $factorial (i32.const 5)) (i32.const 120))
      (then (call $__az_println_str (i32.const 1024))))  ;; FAIL
    (call $__az_println_str (i32.const 1048))             ;; PASS
    ;; ...
  )
)`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Build and run:
      </p>
      <CodeBlock language="bash">{`azora compile wasm my_script.az    # generates my_script.wat
wat2wasm my_script.wat -o my_script.wasm
wasmtime my_script.wasm`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.11 LLVM IR Target</h3>
      <p className="mt-2 text-az-35">
        The LLVM IR target compiles Azora to LLVM Intermediate Representation in text format.
        This is then compiled to native machine code by LLVM. The native target supports the
        full memory management model (alloc, drop, pointers, unsafe blocks, regions).
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li>Bridge .C maps to C function declarations (extern)</li>
        <li>Low-level pointer operations are fully supported</li>
        <li>Memory management primitives compile to direct LLVM instructions</li>
        <li>Optimized via LLVM optimization passes</li>
      </ul>
      <CodeBlock>{`// Azora source targeting native
@target(.Native)
bridge .C {
    func malloc as az_malloc(size: Int): Int
    func free as az_free(ptr: Int)
    func puts as az_puts(s: String): Int
}

@target(.Native)
func main() {
    var buffer: [Int]* = alloc [Int](32)
    (*buffer)[0] = 42
    drop buffer
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.12 The Interpreter</h3>
      <p className="mt-2 text-az-35">
        Azora includes a tree-walking interpreter that runs your code directly without
        compilation. The interpreter supports all language features and is used for
        development, testing, and the REPL.
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li>Runs all language features without a compilation step</li>
        <li>Executes <code className="text-az-primary">test</code> blocks for the test framework</li>
        <li>Powers the interactive REPL for experimentation</li>
        <li>Useful for rapid iteration during development</li>
      </ul>
      <CodeBlock>{`// Run directly with the interpreter, no build step needed
pack Counter {
    var count: Int = 0
}

impl Counter {
    func increment() { mut self ->
        self.count = self.count + 1
    }
}

test "counter increments correctly" {
    var c = Counter()
    c.increment()
    c.increment()
    assert c.count == 2 { "count should be 2" }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.13 Writing Cross-Platform Code</h3>
      <p className="mt-2 text-az-35">
        The typical pattern for cross-platform code is to keep shared logic without
        any <code className="text-az-primary">@target</code> annotation, and provide
        platform-specific implementations using <code className="text-az-primary">@target</code> paired
        with the appropriate <code className="text-az-primary">bridge</code> block. A shared
        public API then wraps the platform-specific calls so that consumers do not need to
        know which backend is in use.
      </p>
      <CodeBlock>{`// Platform-specific bridges
@target(.Native)
bridge .C {
    func clock as az_clock(): Int
}

@target(.WebJs)
bridge .JS {
    func Date.now as az_clock(): Int
}

@target(.KotlinJvm, .Kmp)
bridge .JVM {
    func System.currentTimeMillis as az_clock(): Int
}

@target(.Python)
bridge .PY {
    func time.time_ns as az_clock(): Int
}

@target(.Swift)
bridge .SWIFT {
    func Foundation.Date.timeIntervalSince1970 as az_clock(): Int
}

// Shared API, no @target needed
expose scope std {
    scope time {
        func now(): Int {
            return az_clock()
        }
    }
}

// Consumer code, works on every target
fin timestamp = std.time.now()
println("Current time: " + timestamp as String)`}</CodeBlock>
      <p className="mt-2 text-az-35">
        This layered approach keeps platform details isolated. The bridge declarations
        handle the FFI mapping, the <code className="text-az-primary">@target</code> annotations
        control which bridge compiles on which platform, and the shared scope provides
        a single API that works everywhere.
      </p>

      <p className="mt-4 text-sm text-az-50">
        <strong>Tip:</strong> Start by writing your logic without any <code className="text-az-primary">@target</code> annotations.
        Only add platform-specific code when you need to call into a foreign API. This maximizes
        code reuse across all backends.
      </p>
    </Section>
  )
}
