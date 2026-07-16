import {
  ControlAndSafety,
  CurrentLanguage,
  FunctionsAndTypes,
  ModulesAndZones,
  OwnershipAndReferences,
  TasksAndReactivity,
} from './CurrentLanguage.jsx'
import { ImportsAndConventions, StandardLibrary } from './StandardLibrary.jsx'
import SerializerChapter from './Serializer.jsx'
import TimeChapter from './Time.jsx'
import {
  ContainersOverview,
  DequeChapter,
  ListChapter,
  MapChapter,
  MutableListChapter,
  MutableMapChapter,
  MutableSetChapter,
  QueueChapter,
  SetChapter,
  StackChapter,
  TupleChapter,
} from './Containers.jsx'

export const sections = [
  { id: 'wip-language', number: '1', title: 'Current Language', depth: 0, component: CurrentLanguage },
  { id: 'wip-modules', number: '1.1', title: 'Modules & Zones', depth: 1, component: ModulesAndZones },
  { id: 'wip-ownership', number: '1.2', title: 'Ownership & References', depth: 1, component: OwnershipAndReferences },
  { id: 'wip-functions-types', number: '1.3', title: 'Functions & Types', depth: 1, component: FunctionsAndTypes },
  { id: 'wip-control-safety', number: '1.4', title: 'Errors, Contracts & Tests', depth: 1, component: ControlAndSafety },
  { id: 'wip-tasks-reactivity', number: '1.5', title: 'Tasks, Flows & Reactivity', depth: 1, component: TasksAndReactivity },

  { id: 'wip-stdlib', number: '2', title: 'Standard Library', depth: 0, component: StandardLibrary },
  { id: 'wip-stdlib-conventions', number: '2.1', title: 'Imports & Conventions', depth: 1, component: ImportsAndConventions },
  { id: 'wip-serializer', number: '2.2', title: 'Serializer', depth: 1, component: SerializerChapter },
  { id: 'wip-time', number: '2.3', title: 'Time', depth: 1, component: TimeChapter },
  { id: 'wip-containers', number: '2.4', title: 'Containers', depth: 1, component: ContainersOverview },
  { id: 'wip-list', number: '2.4.1', title: 'List', depth: 2, component: ListChapter },
  { id: 'wip-mutable-list', number: '2.4.2', title: 'MutableList', depth: 2, component: MutableListChapter },
  { id: 'wip-map', number: '2.4.3', title: 'Map', depth: 2, component: MapChapter },
  { id: 'wip-mutable-map', number: '2.4.4', title: 'MutableMap', depth: 2, component: MutableMapChapter },
  { id: 'wip-set', number: '2.4.5', title: 'Set', depth: 2, component: SetChapter },
  { id: 'wip-mutable-set', number: '2.4.6', title: 'MutableSet', depth: 2, component: MutableSetChapter },
  { id: 'wip-deque', number: '2.4.7', title: 'Deque', depth: 2, component: DequeChapter },
  { id: 'wip-queue', number: '2.4.8', title: 'Queue', depth: 2, component: QueueChapter },
  { id: 'wip-stack', number: '2.4.9', title: 'Stack', depth: 2, component: StackChapter },
  { id: 'wip-tuple', number: '2.4.10', title: 'Tuple', depth: 2, component: TupleChapter },
]

