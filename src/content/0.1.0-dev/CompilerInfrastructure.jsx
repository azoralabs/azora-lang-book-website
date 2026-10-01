import { ApiTable, CodeBlock, Lead, Note, Section, Subheading } from './Shared.jsx'

export function CompilerInfrastructure() {
  return <Section id="v010dev-compiler" title="3. Compiler infrastructure">
    <Lead>The Kotlin Multiplatform compiler shares a frontend, semantic pipeline and intermediate
      representation across its hosts. The optimized IR feeds WebAssembly and LLVM code generators or
      executes in the interpreter.</Lead>
    <ApiTable rows={[
      ['frontend/', 'Lexer, Parser, AST validation, macros and callback normalization.'],
      ['semantic/', 'Symbols, types, compile-time execution, ownership, effects and derivation.'],
      ['stdlib/', 'Embedded source indexing and selective import injection.'],
      ['ir/', 'Typed lowering and optimization.'],
      ['backend/', 'WasmCodegen, LlvmCodegen and IrInterpreter.'],
    ]} />
  </Section>
}

export function CompilerOverviewChapter() {
  return <Section id="v010dev-compiler-overview" title="3.1 Overview and orchestration">
    <Lead><code>Compiler.compile</code> returns a success containing the IR, WebAssembly text and LLVM IR,
      or a failure containing diagnostics. Analysis can also run without generating backends.</Lead>
    <CodeBlock language="kotlin">{`val result = Compiler().compile(source)
when (result) {
    is CompilationResult.Success -> result.wasm // or result.llvm
    is CompilationResult.Failure -> result.errors
}`}</CodeBlock>
    <Note>A successful frontend check does not prove backend parity. Target-specific limitations still
      exist; validate execution on the target you intend to ship.</Note>
  </Section>
}

export function FrontendChapter() {
  return <Section id="v010dev-compiler-frontend" title="3.2 Frontend">
    <Lead>The lexer produces tokens, the parser builds the AST, and the validator checks its structure.
      <code> AzoraSyntaxVocabulary.kt</code> is the authority for reserved keywords.</Lead>
    <p>Newlines delimit statements outside grouped expressions. Bracket literals, receiver sigils,
      generic arguments and macros are parsed before type resolution. Editor analysis uses tolerant
      parsing so an unfinished file can still provide diagnostics and symbols.</p>
  </Section>
}

export function PreSemanticChapter() {
  return <Section id="v010dev-compiler-presemantic" title="3.3 Pre-semantic rewrites">
    <Lead>Macro expansion and callback normalization convert surface forms into the declarations and
      expressions the semantic pipeline understands.</Lead>
    <p>Prefix and infix macros start with <code>@</code>. Bracket collection literals are syntax in the
      parser; they no longer depend on a <code>std.macro</code> module.</p>
  </Section>
}

export function SemanticPipelineChapter() {
  return <Section id="v010dev-compiler-semantic" title="3.4 Semantic pipeline">
    <Lead>The compiler collects symbols, resolves types and evaluates compile-time expressions until
      the result settles. It then checks ownership and effects and applies generated implementations.</Lead>
    <ApiTable rows={[
      ['TypeResolver', 'Resolve names, types, calls, generics, receivers and operators.'],
      ['CtfeEvaluator', 'Evaluate compile-time expressions and declaration generation.'],
      ['Alloc / drop analysis', 'Check allocations, borrows and ownership transfers.'],
      ['EffectChecker', 'Check permitted effects.'],
      ['Derivers', 'Generate comparison, display, casts and serialization.'],
    ]} />
    <Note>Generic variant payload substitution and some library abstractions remain incomplete in this
      development release. See the language roadmap for the current release gates.</Note>
  </Section>
}

export function StdlibInjectionChapter() {
  return <Section id="v010dev-compiler-stdlib" title="3.5 Standard-library injection">
    <Lead><code>AzStdlib</code> embeds the library sources. <code>StdlibInjector</code> resolves imports and
      injects declarations used by the program, following their dependencies.</Lead>
    <p>Imports make names available; they do not create a <code>std::</code> namespace. Exposed modules
      provide automatic imports. Website language-server workspaces bundle the same source documents
      for completion, hover and navigation.</p>
  </Section>
}

export function IrGenerationChapter() {
  return <Section id="v010dev-compiler-ir" title="3.6 IR generation">
    <Lead><code>IrGenerator</code> lowers the checked AST into a typed IR. <code>IrOptimizer</code> performs
      constant folding, constant propagation and dead-code elimination.</Lead>
    <p>Primitive values, packs, pointers, calls, branches and loops become backend-independent IR nodes.
      A spec-typed value carries type information for dynamic dispatch. Derivation and compile-time
      expansion happen before this stage.</p>
  </Section>
}

export function BrowserRuntimeChapter() {
  return <Section id="v010dev-compiler-browser" title="3.7 Browser runtime">
    <Lead>The playground loads the compiler built with Kotlin/Wasm and runs Azora through
      <code> IrInterpreter</code>. JavaScript provides the browser integration.</Lead>
    <p>The former JavaScript code-generation backend has been removed. A browser compiler build and an
      Azora program compiled to WebAssembly are separate artifacts. Engine examples use the program's
      generated WebAssembly together with browser rendering and input imports.</p>
  </Section>
}

export function WasmBackendChapter() {
  return <Section id="v010dev-compiler-wasm" title="3.8 WebAssembly backend">
    <Lead><code>WasmCodegen</code> emits WAT. A WAT assembler produces the binary module; host imports
      supply console output, graphics and other external operations.</Lead>
    <p>Values use WebAssembly numeric types and linear memory. <code>Float</code> uses f32 and
      <code>Double</code> uses f64. The host must provide the imports declared by bridge functions.</p>
    <CodeBlock language="bash">{`azora compile wasm app.az`}</CodeBlock>
    <Note>Backend coverage remains partial. Check generated output and execute it with the required
      host imports before treating interpreter behavior as portable.</Note>
  </Section>
}

export function LlvmBackendChapter() {
  return <Section id="v010dev-compiler-llvm" title="3.9 LLVM backend">
    <Lead><code>LlvmCodegen</code> emits LLVM IR. Native tools link bridge declarations with the target
      libraries and runtime.</Lead>
    <CodeBlock language="bash">{`azora compile llvm app.az`}</CodeBlock>
    <p>Closures, compound values, cleanup and pointer operations still have backend gaps. The language
      roadmap tracks the work required for parity with the interpreter.</p>
  </Section>
}

export function InterpreterChapter() {
  return <Section id="v010dev-compiler-interp" title="3.10 Interpreter">
    <Lead><code>IrInterpreter</code> executes IR directly. It drives <code>azora run</code>, tests, the
      REPL and the language playground.</Lead>
    <p>It evaluates functions, closures, control flow, values and cooperative async work and provides
      known host intrinsics for math and time. It is the execution target used to verify this edition's
      complete language examples.</p>
  </Section>
}

export function BridgesFfiChapter() {
  return <Section id="v010dev-compiler-bridges" title="3.11 Bridges and FFI">
    <Lead><code>bridge</code> declares signatures implemented by the host. The native linker or
      WebAssembly host supplies them; the interpreter recognizes a set of known intrinsics.</Lead>
    <CodeBlock>{`module playground

import std.io

bridge .C {
    func sqrt(value: Double): Double
}

func main() {
    println(sqrt(16.0))
}`}</CodeBlock>
    <Subheading>Host availability</Subheading>
    <p>A bridge declaration supplies type information, not an implementation. Custom bridge functions
      need a corresponding implementation on each target where the program will run.</p>
  </Section>
}
