export type Task = {
  id: number
  title: string
  state: TaskEnumState
  text: string
}

export enum TaskState {
  completed = 'completed',
  in_progress = 'in_progress',
  pending = 'pending'
}

export type TaskList = Task[]

export type Filters = {
  category: 'all' | 'pending' | 'in_progress' | 'completed'
  sort: 'asc' | 'desc' | 'off'
  search: string
}
