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
  { id: 'roadmap', number: 26, title: 'Roadmap', component: Roadmap },
]
