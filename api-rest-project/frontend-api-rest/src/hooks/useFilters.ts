import { useContext } from 'react'
import { FiltersContext } from '../context/filters'
import { Task, TaskList } from '../types'

export function useFilters() {
  const context = useContext(FiltersContext)

  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider')
  }

  const { filters, setFilters } = context

  function filterTasks(tasks: TaskList) {
    return tasks.filter(task => {
      return task.state === filters.category
    })
  }

    function sortTasks (tasks: TaskList) {
      let sortedTasks: TaskList = tasks.filter(task =>
        task.state === 'completed'
      )
      sortedTasks = [...sortedTasks, ...tasks.filter(task => {
        task.state === 'in_progress'
      })]
      console.log(sortedTasks)
    }

  return {
    filters,
    setFilters,
    filterTasks,
    sortTasks,
  }
}
