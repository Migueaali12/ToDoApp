import { TaskList, Task, TaskState } from '../types'

export const initialState: State = {
  tasks: [],
}

type Action =
  | { type: 'SET_TASKS'; payload: { tasks: Task[] } }
  | { type: 'ADD_TASK'; payload: { task: Task } }
  | { type: 'DELETE_TASK'; payload: { id: number } }
  | { type: 'UPDATE_TASK'; payload: { id: number; task: Task } }
  | { type: 'UPDATE_TASK_STATE'; payload: { id: number; state: TaskState } }
  | { type: 'FILTER_TASKS'; payload: { tasks: Task[]} }
  
interface State {
  tasks: TaskList
}

export const taskReducer = (state: State, action: Action): State => {
  if (action.type === 'SET_TASKS') {
    const { tasks } = action.payload
    return {
      ...state,
      tasks,
    }
  }

  if (action.type === 'ADD_TASK') {
    return {
      ...state,
      tasks: [...state.tasks, action.payload.task],
    }
  }

  if (action.type === 'DELETE_TASK') {
    return {
      ...state,
      tasks: state.tasks.filter(task => task.id !== action.payload.id),
    }
  }

  if (action.type === 'UPDATE_TASK') {
    const newState = [...state.tasks]
    const taskIndex = newState.findIndex(task => task.id === action.payload.id)
    if (taskIndex !== -1) {
      newState[taskIndex] = action.payload.task
      return {
        ...newState,
        tasks: newState,
      }
    }
  }

  if (action.type === 'UPDATE_TASK_STATE') {
    const newState = [...state.tasks]
    const taskIndex = newState.findIndex(task => task.id === action.payload.id)
    if (taskIndex !== -1) {
      newState[taskIndex].state = action.payload.state
      return {
        ...newState,
        tasks: newState,
      }
    }
  }

  return state
}
