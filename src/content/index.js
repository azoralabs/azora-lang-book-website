import Introduction from './01-introduction.jsx'
import GettingStarted from './02-getting-started.jsx'
import Variables from './03-variables.jsx'
import PrimitiveTypes from './04-primitive-types.jsx'
import Operators from './05-operators.jsx'
import Strings from './06-strings.jsx'
import Arrays from './07-arrays.jsx'
import ControlFlow from './08-control-flow.jsx'
import Functions from './09-functions.jsx'
import Lambdas from './10-lambdas.jsx'
import VariadicLambdas from './11-variadic-lambdas.jsx'
import Packs from './12-packs.jsx'
import Enums from './13-enums.jsx'
import Slots from './14-slots.jsx'
import ImplBlocks from './15-impl-blocks.jsx'
import InfixFunctions from './16-infix-functions.jsx'
import Generics from './17-generics.jsx'
import VariadicGenerics from './18-variadic-generics.jsx'
import SpecsTraits from './19-specs-traits.jsx'
import TypeFunctions from './20-type-functions.jsx'
import TasksAsync from './21-tasks-async.jsx'
import FlowsGenerators from './22-flows-generators.jsx'
import ScopesPackages from './23-scopes-packages.jsx'
import Decorators from './24-decorators.jsx'
import Hooks from './25-hooks.jsx'
import Testing from './26-testing.jsx'
import Tracing from './27-tracing.jsx'
import FlipFlop from './28-flip-flop.jsx'
import NullableTypes from './29-nullable-types.jsx'
import StandardLibrary from './30-standard-library.jsx'
import Collections from './31-collections.jsx'
import Contracts from './32-contracts.jsx'
import CTCE from './33-ctce.jsx'
import OperatorOverloading from './34-operator-overloading.jsx'
import Reactivity from './35-reactivity.jsx'
import ErrorHandling from './36-error-handling.jsx'
import Trees from './37-trees.jsx'
import BridgeFFI from './38-bridge-ffi.jsx'
import MemoryManagement from './39-memory.jsx'
import CompilationTargets from './40-compilation-targets.jsx'
import Tuples from './41-tuples.jsx'

export const sections = [
  { id: 'introduction', number: 1, title: 'Introduction', component: Introduction },
  { id: 'getting-started', number: 2, title: 'Getting Started', component: GettingStarted },
  { id: 'variables', number: 3, title: 'Variables', component: Variables },
  { id: 'primitive-types', number: 4, title: 'Primitive Types', component: PrimitiveTypes },
  { id: 'operators', number: 5, title: 'Operators', component: Operators },
  { id: 'strings', number: 6, title: 'Strings', component: Strings },
  { id: 'arrays', number: 7, title: 'Arrays', component: Arrays },
  { id: 'tuples', number: 8, title: 'Tuples', component: Tuples },
  { id: 'collections', number: 9, title: 'Collections', component: Collections },
  { id: 'control-flow', number: 10, title: 'Control Flow', component: ControlFlow },
  { id: 'functions', number: 11, title: 'Functions', component: Functions },
  { id: 'lambdas', number: 12, title: 'Lambdas & Closures', component: Lambdas },
  { id: 'variadic-lambdas', number: 13, title: 'Variadic Lambdas', component: VariadicLambdas },
  { id: 'packs', number: 14, title: 'Packs', component: Packs },
  { id: 'enums', number: 15, title: 'Enums', component: Enums },
  { id: 'slots', number: 16, title: 'Slots', component: Slots },
  { id: 'impl-blocks', number: 17, title: 'Impl Blocks', component: ImplBlocks },
  { id: 'operator-overloading', number: 18, title: 'Operator Overloading', component: OperatorOverloading },
  { id: 'infix-functions', number: 19, title: 'Infix Functions', component: InfixFunctions },
  { id: 'generics', number: 20, title: 'Generics', component: Generics },
  { id: 'variadic-generics', number: 21, title: 'Variadic Generics', component: VariadicGenerics },
  { id: 'specs-traits', number: 22, title: 'Specs & Traits', component: SpecsTraits },
  { id: 'type-functions', number: 23, title: 'Type Functions', component: TypeFunctions },
  { id: 'contracts', number: 24, title: 'Contracts', component: Contracts },
  { id: 'tasks-async', number: 25, title: 'Tasks & Async', component: TasksAsync },
  { id: 'flows-generators', number: 26, title: 'Flows & Generators', component: FlowsGenerators },
  { id: 'ctce', number: 27, title: 'Compile-Time Execution', component: CTCE },
  { id: 'scopes-packages', number: 28, title: 'Scopes & Packages', component: ScopesPackages },
  { id: 'decorators', number: 29, title: 'Decorators', component: Decorators },
  { id: 'hooks', number: 30, title: 'Hooks', component: Hooks },
  { id: 'reactivity', number: 31, title: 'Reactivity', component: Reactivity },
  { id: 'testing', number: 32, title: 'Testing', component: Testing },
  { id: 'tracing', number: 33, title: 'Tracing', component: Tracing },
  { id: 'flip-flop', number: 34, title: 'Flip/Flop', component: FlipFlop },
  { id: 'nullable-types', number: 35, title: 'Nullable Types', component: NullableTypes },
  { id: 'standard-library', number: 36, title: 'Standard Library', component: StandardLibrary },
  { id: 'error-handling', number: 37, title: 'Error Handling', component: ErrorHandling },
  { id: 'trees', number: 38, title: 'Inheritance', component: Trees },
  { id: 'bridge-ffi', number: 39, title: 'Bridge (FFI)', component: BridgeFFI },
  { id: 'memory-management', number: 40, title: 'Memory Management', component: MemoryManagement },
  { id: 'compilation-targets', number: 41, title: 'Compilation Targets', component: CompilationTargets },
]
