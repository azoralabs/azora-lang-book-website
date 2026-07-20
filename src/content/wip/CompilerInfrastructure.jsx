import { ApiTable, CodeBlock, Lead, Note, Section, Subheading } from './Shared.jsx'

/**
 * "Compiler Infrastructure" (chapter 3) - one subchapter per pipeline stage and
 * one per backend. Source citations reference the Kotlin compiler at
 * compiler/src/commonMain/kotlin/org/azora/lang/.
 */

export function CompilerInfrastructure() {
  return (
    <Section id="wip-compiler" title="3. Compiler infrastructure">
      <Lead>
        The Azora compiler is a four-phase pipeline: <b>Frontend</b> (lex, parse, validate) →
        <b> Semantic analysis</b> (multi-pass, with compile-time evaluation) → <b>IR generation</b> (typed lowering) →
        <b> Backend</b> (one optimized IR lowered to three codegen targets, plus a tree-walking interpreter for
        tests and the playground). This chapter walks every stage in execution order, explains why each is shaped
        the way it is, and documents each backend.
      </Lead>
      <ApiTable rows={[
        ['Compiler.kt', 'Orchestrates the whole pipeline; one entry point: compile(source).'],
        ['frontend/', 'Lexer, Parser, AST, AstValidator.'],
        ['semantic/', 'SemanticPipeline — symbol collection, CTCE fixed-point, type resolution, ownership, effects.'],
        ['stdlib/', 'StdlibInjector — indexes the embedded standard library and injects referenced declarations.'],
        ['ir/', 'IrNode (typed IR), IrGenerator (AST→IR), IrOptimizer.'],
        ['backend/', 'JavaScriptCodegen, WasmCodegen, LlvmCodegen, and IrInterpreter.'],
      ]} />
      <Note>
        The compiler is written in Kotlin Multiplatform; the same frontend/semantic/IR runs on JVM, JS, and native
        hosts. The codegen text it emits (JavaScript, Wasm WAT, LLVM IR) is what actually executes.
      </Note>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 3.1 Overview & orchestration                                       */
/* ------------------------------------------------------------------ */

export function CompilerOverviewChapter() {
  return (
    <Section id="wip-compiler-overview" title="3.1 Overview & orchestration">
      <Lead>
        <code>Compiler.compile(source, …)</code> (Compiler.kt:128) drives the whole pipeline. A malformed program
        is a <code>CompilationResult.Failure</code> carrying messages — never a thrown exception — so editors,
        build tools, and playground hosts never crash on bad input.
      </Lead>
      <Subheading>The four phases</Subheading>
      <ApiTable rows={[
        ['1. Frontend', 'Lexer + Parser produce the AST; AstValidator checks structure.'],
        ['2. Semantic', 'SemanticPipeline.analyze runs symbol collection, CTCE, type resolution, ownership, effects.'],
        ['3. IR', 'IrGenerator lowers the type-checked AST to typed IR; IrOptimizer folds it.'],
        ['4. Backend', 'One optimized IR → JavaScriptCodegen, WasmCodegen, LlvmCodegen (all three, always).'],
      ]} />
      <CodeBlock>{`val result = Compiler().compile(source)
when (result) {
    is CompilationResult.Success -> result.javascript // or .wasm, .llvm
    is CompilationResult.Failure -> result.errors
}`}</CodeBlock>
      <Subheading>Why parse errors are values, not exceptions</Subheading>
      <p>
        Compiler.kt:139-145 wraps the lexer/parser in try/catch so a syntax error becomes a <code>Failure</code> —
        a playground or LSP server can render the message without a try/catch of its own.
      </p>
      <Note>
        Unresolved-symbol errors are rewritten with an import hint: <code>'foo' is provided by 'std.math': add
        'import std.math'</code> (Compiler.kt:120-126, via StdlibInjector.moduleOf).
      </Note>
    </Section>
  )
}


/* ------------------------------------------------------------------ */
/* 3.2 Frontend                                                       */
/* ------------------------------------------------------------------ */

export function FrontendChapter() {
  return (
    <Section id="wip-compiler-frontend" title="3.2 Frontend">
      <Lead>
        The frontend turns source text into a validated <code>Program</code> AST. Newlines are significant
        (statement terminators), and a parse-time metaprogramming environment drives <code>inline for</code>.
      </Lead>
      <Subheading>Lexer — frontend/Lexer.kt</Subheading>
      <p>
        Produces tokens: keywords, identifiers, numeric literals (with type suffixes like <code>5b</code>,
        <code> 9L</code>), strings with escapes, and operators. Comments are <code>//</code> and nested
        <code> /* */</code>. A <code>bracketDepth</code> counter suppresses newlines inside <code>[…]</code> so a
        multi-line bracketed form is one statement.
      </p>
      <Subheading>Parser — frontend/Parser.kt</Subheading>
      <p>
        A hand-written recursive-descent parser. Its constructor takes a <code>typeListEnv</code> map
        (Parser.kt:47): a parse-time metaprogramming environment where <code>let Numbers: [Type] = …</code> binds a
        compile-time list, shared with the sub-parsers that expand <code>inline for</code> bodies. A
        <code> pendingTopLevels</code> queue lets one declaration (e.g. <code>impl oper [a, b] for T</code>) expand
        into several top-level items.
      </p>
      <Subheading>AST — frontend/Ast.kt</Subheading>
      <p>
        <code>Program</code> is the root; its <code>items</code> are <code>TopLevel</code> subtypes —
        <code>Func</code>, <code>Pack</code>, <code>Impl</code>, <code>Spec</code>, <code>Enum</code>,
        <code>Fail</code>, <code>Node</code>/<code>Leaf</code>, <code>Solo</code>, <code>View</code>,
        <code>Bridge</code>, <code>UseImport</code>, the compile-time <code>Inline*</code> nodes, and more. Every
        <code> Expr</code> carries <code>line/column</code> for diagnostics.
      </p>
      <Subheading>AstValidator — frontend/AstValidator.kt</Subheading>
      <p>
        Catches structural errors the grammar cannot express: duplicate function/parameter names, non-Unit
        functions missing a <code>return</code>, top-level <code>var</code> without <code>threadlocal</code>, and
        <code>@experimental</code>/<code>@stable</code> mutual exclusivity. <code>@UncheckedCast</code> impls opt
        out of these checks.
      </p>
      <Note>
        Why hand-written, not a generator: Azora’s significant-newlines, zone-qualified <code>::</code> paths, and
        compile-time <code>inline</code> forms are easier to express in direct code than in a grammar DSL.
      </Note>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 3.3 Pre-semantic rewrites                                          */
/* ------------------------------------------------------------------ */

export function PreSemanticChapter() {
  return (
    <Section id="wip-compiler-presemantic" title="3.3 Pre-semantic rewrites">
      <Lead>
        Between parsing and semantic analysis, several passes rewrite the AST: debug instrumentation, standard-
        library injection, serialization derivation, macro expansion, and variadic monomorphization.
      </Lead>
      <ApiTable rows={[
        ['DebugInstrumenter', 'In debug builds, injects __dbg(line) markers so a debugger can pause (Compiler.kt:149).'],
        ['StdlibInjector (×3)', 'Appends transitively-referenced stdlib declarations; user defs shadow stdlib (Compiler.kt:153, 162, 182).'],
        ['SerializationDeriver', 'Turns @Serializable into ordinary checked AST methods (Compiler.kt:158).'],
        ['MacroExpander', 'Rewrites name!(…) / name![…] / name!{…} into matched-arm templates (Compiler.kt:172).'],
        ['VariadicMonomorphizer', 'Materializes variadic generics (Tuple<T…>) per instantiation (Compiler.kt:187).'],
        ['CallbackImplNormalizer', 'Generates the use-as member for callback specs like Into<T>.'],
      ]} />
      <Note>
        Stdlib injection runs three times because each later pass (serialization derive, macro expansion) can pull
        in new stdlib dependencies that were not referenced before.
      </Note>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 3.4 Semantic pipeline                                              */
/* ------------------------------------------------------------------ */

export function SemanticPipelineChapter() {
  return (
    <Section id="wip-compiler-semantic" title="3.4 Semantic pipeline">
      <Lead>
        <code>SemanticPipeline.analyze</code> (SemanticPipeline.kt:74) runs six passes. The fixed-point compile-
        time-evaluation loop lets metaprogramming settle before types are resolved.
      </Lead>
      <ApiTable rows={[
        ['Pass 0 — top-level CTCE', 'Fold top-level inline if/deepinline so symbol collection sees the surviving declarations.'],
        ['Pass 1 — symbol collection', 'Register every signature/type in the SymbolTable (no bodies yet). DecoratorResolver runs here.'],
        ['Pass 2 — import resolution', 'Resolve imports (single-file mode today; multi-module slot reserved).'],
        ['Pass 3 — CTCE fixed-point', 'Iterate CtceEvaluator until no change (or max 100). Then TypeResolver resolves all bodies once.'],
        ['Pass 4 — alloc/drop', 'Ownership and liveness/use-before-init analysis (AllocDropAnalyzer).'],
        ['Pass 5 — effect checking', 'Purity and side-effect propagation through the call graph (EffectChecker).'],
      ]} />
      <Subheading>Why declarations are resolved before bodies</Subheading>
      <p>
        A function’s signature is registered in Pass 1, its body resolved in Pass 3. This split lets one function
        reference another defined later in the file without forward-declarations (SemanticPipeline.kt:63-68).
      </p>
      <Note>
        CTCE shares the compiler’s own type system — there is no separate evaluator type — and the fixed-point loop
        is bounded at 100 iterations so runaway metaprogramming fails instead of hanging.
      </Note>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 3.5 Standard-library injection                                     */
/* ------------------------------------------------------------------ */

export function StdlibInjectionChapter() {
  return (
    <Section id="wip-compiler-stdlib" title="3.5 Standard-library injection">
      <Lead>
        <code>StdlibInjector</code> (stdlib/StdlibInjector.kt) treats the standard library like any other
        dependency: a file sees a module’s names only after importing it. The compiler does not hardcode a
        <code> std</code> module.
      </Lead>
      <Subheading>Index and inject</Subheading>
      <p>
        At index time, every stdlib source is parsed (AzStdlib.loadPrograms) and its declarations are bucketed by
        module. At inject time, only the items a program actually references are appended — transitively — so a
        program that never touches the library compiles exactly as before. A user declaration always shadows a
        library item of the same name.
      </p>
      <Subheading>Auto-import: export and the .core convention</Subheading>
      <p>
        A module is auto-imported into every unit when declared <code>export expose module …</code> or when it
        follows the <code>&lt;root&gt;.core</code> naming (e.g. <code>std.core</code>, <code>std.traits.core</code>).
        This is how the primitive types, decorators, and the numeric range-operator impls reach every program
        without an explicit import (StdlibInjector.kt:136-142).
      </p>
      <CodeBlock>{`import std.container.list     // explicit: only list's names
// std.core is auto-imported — Int, Bool, decorators are always visible`}</CodeBlock>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 3.6 IR generation                                                  */
/* ------------------------------------------------------------------ */

export function IrGenerationChapter() {
  return (
    <Section id="wip-compiler-ir" title="3.6 IR generation">
      <Lead>
        <code>IrGenerator</code> (ir/IrGenerator.kt:47) lowers the type-checked AST into a typed IR where every
        expression carries its <code>IrType</code>, so backends emit type-correct code without re-running
        inference.
      </Lead>
      <Subheading>The IR (ir/IrNode.kt)</Subheading>
      <ApiTable rows={[
        ['IrType', 'Concrete types only — no inference at this level. Int/Real/…/Array(element, size?)/Named/etc.'],
        ['IrExpr', 'Every node carries a resolved type field.'],
        ['IrTopLevel', 'Global, Func, Test, Struct, and Extern (a bodyless bridge signature).'],
      ]} />
      <Subheading>Lowering rules</Subheading>
      <p>
        Name mangling maps source names to unique IR names (<code>__name&lt;n&gt;</code> for shadowed scopes).
        <code> bridge pack</code> emits no struct; <code>bridge impl</code> emits no method functions; bridge
        <code> func</code> signatures become <code>IrTopLevel.Extern</code> for backends to declare. Inline
        constructs are skipped — they were already substituted by CTCE.
      </p>
      <Subheading>The range-operator gate</Subheading>
      <p>
        A <code>for i in a..b</code> whose iterable is an <code>Expr.Range</code> is only lowered if the bound type
        has declared the range operator (looked up as <code>oper..</code> / <code>operreverse..</code>); otherwise
        the compiler rejects it (IrGenerator.kt:487). That is why <code>std.traits.core</code> declares
        <code>bridge impl oper .. for Ty</code> for every numeric type.
      </p>
      <Subheading>IrOptimizer</Subheading>
      <p>
        Runs in release builds (ir/IrOptimizer.kt:31): constant folding, constant propagation, dead-code
        elimination, and unused-symbol elimination — each a composable <code>IrProgram → IrProgram</code> pass.
      </p>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 3.7 JavaScript backend                                             */
/* ------------------------------------------------------------------ */

export function JavaScriptBackendChapter() {
  return (
    <Section id="wip-compiler-js" title="3.7 JavaScript backend">
      <Lead>
        <code>JavaScriptCodegen</code> (backend/JavaScriptCodegen.kt:39) emits plain JavaScript. Because JS is
        dynamically typed, no type annotations are emitted; IR types are consulted only to pick runtime behaviour.
      </Lead>
      <ApiTable rows={[
        ['fin / let → const', 'Immutable bindings become const.'],
        ['var → let', 'Mutable bindings become let.'],
        ['println → console.log', 'Console output maps to console.log.'],
        ['String × Int', 'Repetition lowers to .repeat(n).'],
        ['Integer division', 'Truncated to match Azora semantics.'],
      ]} />
      <p>
        A small runtime provides pointer helpers (<code>__alloc</code>, <code>__deref</code>,
        <code>__isolated</code>). If <code>main</code> is present, an entry-point <code>main()</code> call is
        appended.
      </p>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 3.8 WebAssembly backend                                            */
/* ------------------------------------------------------------------ */

export function WasmBackendChapter() {
  return (
    <Section id="wip-compiler-wasm" title="3.8 WebAssembly backend">
      <Lead>
        <code>WasmCodegen</code> (backend/WasmCodegen.kt:47) emits WebAssembly text (WAT) in folded S-expression
        form. Each Azora value is a single WASM value; strings and arrays are pointers into linear memory.
      </Lead>
      <ApiTable rows={[
        ['Int / Bool / Char / ≤32-bit ints', 'i32.'],
        ['Long / ULong / Cent / UCent', 'i64.'],
        ['Real / Decimal', 'f64 (Float → f32).'],
        ['String / packs / arrays', 'i32 pointer into linear memory.'],
      ]} />
      <p>
        I/O goes through host imports (<code>print_i32</code>, <code>print_str</code>, …); a linear-memory runtime
        supplies <code>__alloc</code>, <code>__str_concat</code>, <code>__str_eq</code>, <code>__int_to_str</code>.
        Structured control flow lowers to <code>block</code>/<code>loop</code>/<code>br_if</code>.
      </p>
      <Note tone="yellow">
        The Wasm backend is explicitly MVP-level: packs/arrays assume 4-byte fields and elements, exceptions lower
        to <code>unreachable</code>, and tasks are synchronous.
      </Note>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 3.9 LLVM backend                                                   */
/* ------------------------------------------------------------------ */

export function LlvmBackendChapter() {
  return (
    <Section id="wip-compiler-llvm" title="3.9 LLVM backend">
      <Lead>
        <code>LlvmCodegen</code> (backend/LlvmCodegen.kt:64) emits LLVM IR text (a <code>.ll</code>) that runs
        directly under <code>lli</code> or compiles with <code>clang</code>/<code>llc</code>. It is the most
        complete native target.
      </Lead>
      <ApiTable rows={[
        ['Int / UInt → i32', 'Byte/UByte i8, Short/UShort i16, Long/ULong i64, Cent/UCent i128.'],
        ['Real → double', 'Float → float, Decimal → fp128.'],
        ['Bool → i1', 'Char → i8, String → i8* (null-terminated C string), Unit → void.'],
      ]} />
      <Subheading>Two correctness invariants</Subheading>
      <p>
        Every basic block ends with exactly one terminator (tracked by a <code>terminated</code> flag so no dead or
        duplicate terminators are produced), and all local <code>alloca</code>s are hoisted into the function’s
        entry block — an <code>alloca</code> inside a loop would leak stack every iteration and fault on the guard
        page (LlvmCodegen.kt:56-87).
      </p>
      <p>
        String concat/repeat/compare/interpolate lower to small runtime helpers over libc (<code>malloc</code>,
        <code>strlen</code>, <code>strcpy</code>, <code>snprintf</code>, …). Zone-alloc arenas and structured
        concurrency are supported.
      </p>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 3.10 Interpreter                                                   */
/* ------------------------------------------------------------------ */

export function InterpreterChapter() {
  return (
    <Section id="wip-compiler-interp" title="3.10 Interpreter">
      <Lead>
        <code>IrInterpreter</code> (backend/IrInterpreter.kt:60) is a fourth execution target: a tree-walking
        evaluator of <code>IrProgram</code>. It is <b>not</b> dispatched from <code>Compiler.compile()</code> — the
        tests and playground call it directly.
      </Lead>
      <ApiTable rows={[
        ['interpret(program)', 'Run synchronously (azRunBlocking); returns printed output.'],
        ['interpretSuspend(program)', 'A suspend variant for JS/Wasm hosts that cannot block.'],
        ['runTests(program)', 'Runs every test block and returns pass/fail results.'],
      ]} />
      <Subheading>Coroutine-per-task</Subheading>
      <p>
        Each <code>task</code>/<code>launch</code>/<code>flow</code> gets its own <code>ExecState</code> in its
        coroutine context, so concurrent tasks never share mutable scope/defer/flow state. Common C-math externs
        (<code>sin</code>, <code>sqrt</code>, …) map to <code>kotlin.math</code>; it also honours the
        <code> __dbg(line)</code> hook for the debug host.
      </p>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* 3.11 Bridges & FFI                                                 */
/* ------------------------------------------------------------------ */

export function BridgesFfiChapter() {
  return (
    <Section id="wip-compiler-bridges" title="3.11 Bridges & FFI">
      <Lead>
        <code>bridge</code> marks declarations as compiler-provided: they have a reflectable site in the source
        but no Azora body. The backend supplies the native implementation.
      </Lead>
      <ApiTable rows={[
        ['bridge pack T', 'A compiler-provided type (primitives, Reflected<T>). No struct is emitted.'],
        ['bridge impl … for T', 'Registers the member (e.g. oper..) so it type-checks; no method function emitted.'],
        ['bridge func name(…) ', 'A foreign signature → IrTopLevel.Extern; backends declare it (declare / external).'],
      ]} />
      <CodeBlock>{`bridge .C {
    func sin(x: Real): Real     // becomes an LLVM 'declare' the linker resolves
}

bridge impl oper .. for Int   // no body; backends lower ranges natively`}</CodeBlock>
      <Note>
        This is how the language stays small: <code>Int</code>, <code>String</code>, the range operator, and libc
        math are all <code>bridge</code> declarations the standard library ships, not special cases baked into the
        compiler.
      </Note>
    </Section>
  )
}
