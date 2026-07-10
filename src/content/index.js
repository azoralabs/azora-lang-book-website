import Introduction from './01-introduction.jsx'
import GettingStarted from './02-getting-started.jsx'
import Variables from './03-variables.jsx'
import PrimitiveTypes from './04-primitive-types.jsx'
import Operators from './05-operators.jsx'
import Strings from './06-strings.jsx'
import Arrays from './07-arrays.jsx'
import ControlFlow from './08-control-flow.jsx'
import Functions from './09-functions.jsx'
import Structs from './10-structs.jsx'
import Scopes from './11-scopes.jsx'
import CTCE from './12-ctce.jsx'
import Testing from './13-testing.jsx'
import CompilationTargets from './14-compilation-targets.jsx'
import EnumsWhen from './15-enums-when.jsx'
import Tuples from './16-tuples.jsx'
import ErrorHandling from './17-error-handling.jsx'
import ImplMethods from './18-impl-methods.jsx'
import Lambdas from './19-lambdas.jsx'
import Generics from './20-generics.jsx'
import Traits from './21-traits.jsx'
import InfixFunctions from './22-infix-functions.jsx'
import BitwiseOps from './23-bitwise-ops.jsx'
import NullableTypes from './24-nullable-types.jsx'
import AdvancedFeatures from './25-advanced-features.jsx'
import Maps from './26-maps.jsx'
import TaggedUnions from './27-tagged-unions.jsx'
import Inheritance from './28-inheritance.jsx'
import MemoryModel from './29-memory-model.jsx'
import ErrorSets from './30-error-sets.jsx'
import Concurrency from './31-concurrency.jsx'
import DependencyInjection from './32-dependency-injection.jsx'
import Ffi from './33-ffi.jsx'
import Reactivity from './34-reactivity.jsx'
import AdvancedTypes from './35-advanced-types.jsx'
import Roadmap from './15-roadmap.jsx'

export const sections = [
  { id: 'introduction', number: 1, title: 'Introduction', component: Introduction },
  { id: 'getting-started', number: 2, title: 'Getting Started', component: GettingStarted },
  { id: 'variables', number: 3, title: 'Variables & Bindings', component: Variables },
  { id: 'primitive-types', number: 4, title: 'Primitive Types', component: PrimitiveTypes },
  { id: 'operators', number: 5, title: 'Operators', component: Operators },
  { id: 'strings', number: 6, title: 'Strings', component: Strings },
  { id: 'arrays', number: 7, title: 'Arrays', component: Arrays },
  { id: 'control-flow', number: 8, title: 'Control Flow', component: ControlFlow },
  { id: 'functions', number: 9, title: 'Functions', component: Functions },
  { id: 'structs', number: 10, title: 'Structs (pack)', component: Structs },
  { id: 'scopes', number: 11, title: 'Scopes', component: Scopes },
  { id: 'ctce', number: 12, title: 'Compile-Time Execution', component: CTCE },
  { id: 'testing', number: 13, title: 'Testing & Tracing', component: Testing },
  { id: 'compilation-targets', number: 14, title: 'Compilation Targets', component: CompilationTargets },
  { id: 'enums-when', number: 15, title: 'Enums & When', component: EnumsWhen },
  { id: 'tuples', number: 16, title: 'Tuples', component: Tuples },
  { id: 'error-handling', number: 17, title: 'Error Handling', component: ErrorHandling },
  { id: 'impl-methods', number: 18, title: 'Impl Methods', component: ImplMethods },
  { id: 'lambdas', number: 19, title: 'Lambdas', component: Lambdas },
  { id: 'generics', number: 20, title: 'Generics', component: Generics },
  { id: 'traits', number: 21, title: 'Traits (spec)', component: Traits },
  { id: 'infix-functions', number: 22, title: 'Infix Functions', component: InfixFunctions },
  { id: 'bitwise-ops', number: 23, title: 'Bitwise Operators', component: BitwiseOps },
  { id: 'nullable-types', number: 24, title: 'Nullable Types', component: NullableTypes },
  { id: 'advanced-features', number: 25, title: 'Advanced Features', component: AdvancedFeatures },
  { id: 'maps', number: 26, title: 'Maps', component: Maps },
  { id: 'tagged-unions', number: 27, title: 'Tagged Unions (slot)', component: TaggedUnions },
  { id: 'inheritance', number: 28, title: 'Inheritance', component: Inheritance },
  { id: 'memory-model', number: 29, title: 'The Memory Model', component: MemoryModel },
  { id: 'error-sets', number: 30, title: 'Error Sets & Failable Types', component: ErrorSets },
  { id: 'concurrency', number: 31, title: 'Concurrency', component: Concurrency },
  { id: 'dependency-injection', number: 32, title: 'Dependency Injection', component: DependencyInjection },
  { id: 'ffi', number: 33, title: 'Foreign Function Interface', component: Ffi },
  { id: 'reactivity', number: 34, title: 'Reactivity & Components', component: Reactivity },
  { id: 'advanced-types', number: 35, title: 'Advanced Types & Modifiers', component: AdvancedTypes },
  { id: 'roadmap', number: 36, title: 'Roadmap', component: Roadmap },
]
