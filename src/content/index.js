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
  { id: 'roadmap', number: 15, title: 'Roadmap', component: Roadmap },
]
