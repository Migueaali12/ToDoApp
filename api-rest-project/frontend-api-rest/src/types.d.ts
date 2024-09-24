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

export type TaskId = Pick<Task, 'id'>
export type TaskTitle = Pick<Task, 'title'>
export type TaskText = Pick<Task, 'text'>

export type TaskList = Task[]