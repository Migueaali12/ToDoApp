import { createContext, useReducer } from 'react'
import { TaskList, Task, TaskState, FilterStatus } from '../types'
import { initialState, taskReducer } from '../reducers/task'
import {
  fetchAddTask,
  fetchDeleteTask,
  fetchFilteredTasksByStatus,
  fetchSortedTasksByStatus,
  fetchTasks,
  fetchUpdateTask,
  fetchUpdateTaskState,
} from '../services/Tasks'

type TaskContextType = {
  tasks: TaskList
  getTask: () => void
  addTask: (title: string, text: string) => void
  deleteTask: (id: number) => void
  updateTask: (id: number, task: Task) => void
  updateTaskState: (id: number, state: TaskState) => void
  filterTasks: (tasks: TaskList) => void
}

export const TaskContext = createContext<TaskContextType | null>(null)

export const useTaskReducer = (): {
  tasks: TaskList
  getTask: () => void
  addTask: (title: string, text: string) => void
  deleteTask: (id: number) => void
  updateTask: (id: number, task: Task) => void
  updateTaskState: (id: number, state: TaskState) => void
  filterTasks: (tasks: TaskList) => void
} => {
  const [{ tasks }, dispatch] = useReducer(taskReducer, initialState)

  const getTask = (): void => {

    fetchTasks()
      .then(tasks => {
        if (tasks === null || tasks === undefined) {
          tasks = []
        }
        dispatch({ type: 'GET_TASKS', payload: { tasks } })
      })
      .catch(err => console.log(err))
  }

  const addTask = (title: string, text: string): void => {
    fetchAddTask(title, text)
      .then(task => {
        if (task === null || task === undefined) {
          throw new Error('No se pudo agregar la tarea')
        }
        dispatch({ type: 'ADD_TASK', payload: { task } })
      })
      .catch(err => {
        console.error('Error al eliminar la tarea:', err)
      })
  }

  const deleteTask = (id: number): void => {
    fetchDeleteTask(id)
      .then(success => {
        if (success) {
          dispatch({ type: 'DELETE_TASK', payload: { id } })
        }
      })
      .catch(err => {
        console.error('Error al eliminar la tarea:', err)
      })
  }

  const updateTask = (id: number, task: Task): void => {
    fetchUpdateTask(id, task)
      .then(success => {
        if (success) {
          dispatch({ type: 'UPDATE_TASK', payload: { id, task } })
        }
      })
      .catch(err => {
        console.error('Error al actualizar la tarea:', err)
      })
  }

  const updateTaskState = (id: number, state: TaskState): void => {
    fetchUpdateTaskState(id, state)
      .then(success => {
        if (success) {
          dispatch({ type: 'UPDATE_TASK_STATE', payload: { id, state } })
        }
      })
      .catch(err => {
        console.error('Error al actualizar el estado de la tarea:', err)
      })
  }

  const filterTaskByStatus = (status: FilterStatus): void => {
    fetchFilteredTasksByStatus(status)
      .then(tasks => {
        if (tasks === null || tasks === undefined) {
          tasks = []
        }
        dispatch({ type: 'FILTER_TASKS_BY_STATUS', payload: { tasks } })
      })
      .catch(err => console.log(err))
  }

  const sortTaskByStatus = (order: 'asc' | 'desc'): void => {
    fetchSortedTasksByStatus(order)
    .then(tasks => {
      if (tasks === null || tasks === undefined) {
        tasks = []
      }
      dispatch({ type: 'SORT_TASKS_BY_STATUS', payload: { tasks } })
    })
    .catch(err => console.log(err))
  }

  return {
    tasks,
    getTask,
    addTask,
    deleteTask,
    updateTask,
    updateTaskState,
    filterTaskByStatus,
    sortTaskByStatus
  }
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const { tasks, getTask, addTask, deleteTask, updateTask, updateTaskState, filterTaskByStatus, sortTaskByStatus } =
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
        filterTaskByStatus,
        sortTaskByStatus
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
