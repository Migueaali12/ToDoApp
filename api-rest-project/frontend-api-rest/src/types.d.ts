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

export type FilterStatus = {
  category: 'all' | 'pending' | 'in_progress' | 'completed'
}
