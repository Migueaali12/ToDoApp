import { useEffect, useReducer } from 'react'
import { deleteTask, fetchTasks, updateTaskState } from '../services/Tasks'
import { Task, TaskList, TaskState } from './../types.d'

const initialState: State = {
  tasks: [],
}

type Action =
  | { type: 'INIT_TASKS'; payload: { tasks: TaskList } }
  | { type: 'DELETE_TASK'; payload: { id: number } }
  | { type: 'UPDATE_TASK'; payload: { id: number; task: Task } }
  | { type: 'UPDATE_TASK_STATE'; payload: { id: number; state: TaskState } }
  | { type: 'ADD_TASK'; payload: { task: Task } }

interface State {
  tasks: TaskList
}

export const reducer = (state: State, action: Action): State => {
  if (action.type === 'INIT_TASKS') {
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
    // fetch al api
    updateTaskState(action.payload.id, action.payload.state)
    return {
      ...state,
      tasks: state.tasks.map(task =>
        task.id === action.payload.id
         ? {...task, state: action.payload.state }
          : task
      ),
    }
  }

  return state
}

export const useTasks = (): {
    
  tasks: TaskList
  handleAddTask: (task: Task) => void
  handleDeleteTask: (id: number) => void
  handleUpdateTask: (id: number, task: Task) => void
  handleUpdateTaskState: (id: number, state: TaskState) => void

} => {

  const [{ tasks }, dispatch] = useReducer(reducer, initialState)

  const handleAddTask = (task: Task): void => {
    dispatch({ type: 'ADD_TASK', payload: { task } })
  }

  const handleDeleteTask = (id: number): void => {
    dispatch({ type: 'DELETE_TASK', payload: { id } })
  }

  const handleUpdateTask = (id: number, task: Task): void => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, task } })
  }

  const handleUpdateTaskState = (id: number, state: TaskState): void => {
    dispatch({ type: 'UPDATE_TASK_STATE', payload: { id, state } })
  }

  useEffect(() => {
    fetchTasks()
      .then(tasks => {
        dispatch({ type: 'INIT_TASKS', payload: { tasks } })
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return { tasks, handleAddTask, handleDeleteTask, handleUpdateTask, handleUpdateTaskState }
}
