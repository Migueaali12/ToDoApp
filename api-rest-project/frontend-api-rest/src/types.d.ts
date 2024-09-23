export type Task = {
  id: number
  title: string
  state: State
  text: string
}

export enum State {
  completed = 'completed',
  in_progress = 'in_progress',
  pending = 'pending'
}

export type TaskId = Pick<Task, 'id'>
export type TaskTitle = Pick<Task, 'title'>
export type TaskState = Pick<Task, 'state'>
export type TaskText = Pick<Task, 'text'>

export type TaskList = Task[]