import { deleteTask, fetchTasks, updateTaskState } from '../services/Tasks'
import { TaskList, Task, TaskState } from '../types'

export const initialState: State = {
  tasks: [],
}

type Action =
  | { type: 'GET_TASKS'; payload: { tasks: Task[] } }
  | { type: 'DELETE_TASK'; payload: { id: number } }
  | { type: 'UPDATE_TASK'; payload: { id: number; task: Task } }
  | { type: 'UPDATE_TASK_STATE'; payload: { id: number; state: TaskState } }
  | { type: 'ADD_TASK'; payload: { task: Task } }

interface State {
  tasks: TaskList
}

export const taskReducer = (state: State, action: Action): State => {
  if (action.type === 'GET_TASKS') {
    const { tasks } = action.payload
    return {
      ...state,
      tasks,
    }
  }

  if (action.type === 'ADD_TASK') {
    const { task } = action.payload
    return {
      ...state,
      tasks: [...state.tasks, task],
    }
  }

  if (action.type === 'DELETE_TASK') {
    deleteTask(action.payload.id)
    return {
      ...state,
      tasks: state.tasks.filter(task => task.id !== action.payload.id),
    }
  }

  if (action.type === 'UPDATE_TASK') {
    return {
      ...state,
      tasks: state.tasks.map(task =>
        task.id === action.payload.id ? action.payload.task : task
      ),
    }
  }

  if (action.type === 'UPDATE_TASK_STATE') {
    updateTaskState(action.payload.id, action.payload.state)
    return {
      ...state,
      tasks: state.tasks.map(task =>
        task.id === action.payload.id
          ? { ...task, state: action.payload.state }
          : task
      ),
    }
  }

  return state
}
