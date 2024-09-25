import { createContext, useReducer } from 'react'
import { TaskList, Task, TaskState } from '../types'
import { initialState, taskReducer } from '../reducers/task'
import { fetchTasks } from '../services/Tasks'

type TaskContextType = {
  tasks: TaskList
  getTask: () => void
  addTask: (task: Task) => void
  deleteTask: (id: number) => void
  updateTask: (id: number, task: Task) => void
  updateTaskState: (id: number, state: TaskState) => void
}

export const TaskContext = createContext<TaskContextType | null>(null)

export const useTaskReducer = (): {
  tasks: TaskList
  getTask: () => void
  addTask: (task: Task) => void
  deleteTask: (id: number) => void
  updateTask: (id: number, task: Task) => void
  updateTaskState: (id: number, state: TaskState) => void
} => {
  const [{ tasks }, dispatch] = useReducer(taskReducer, initialState)

  const getTask = (): void => {
    fetchTasks()
      .then(tasks => {
        dispatch({ type: 'GET_TASKS', payload: { tasks } })
      })
      .catch(err => console.log(err))
  }
  const addTask = (task: Task): void => {
    dispatch({ type: 'ADD_TASK', payload: { task } })
  }

  const deleteTask = (id: number): void => {
    dispatch({ type: 'DELETE_TASK', payload: { id } })
  }

  const updateTask = (id: number, task: Task): void => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, task } })
  }

  const updateTaskState = (id: number, state: TaskState): void => {
    dispatch({ type: 'UPDATE_TASK_STATE', payload: { id, state } })
  }

  return {
    tasks,
    getTask,
    addTask,
    deleteTask,
    updateTask,
    updateTaskState,
  }
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const { tasks, getTask, addTask, deleteTask, updateTask, updateTaskState } =
    useTaskReducer()

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTask,
        addTask,
        deleteTask,
        updateTask,
        updateTaskState,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
