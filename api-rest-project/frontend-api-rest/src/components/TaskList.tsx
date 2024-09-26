/* eslint-disable react/prop-types */

import { SimpleGrid } from '@chakra-ui/react'
import { TaskElement } from './Task'
import { useTasks } from '../hooks/useTask'
import { useFilters } from '../hooks/useFilters'

export function TasksList() {
  const { tasks } = useTasks()
  const { filters, filterTasks } = useFilters()

  if (tasks.length > 0 && filters.category === 'all') {
    return (
      <div>
        <SimpleGrid
          columns={[1, null, 3]}
          spacing="40px"
          justifyItems={'center'}
          paddingBottom={'40px'}
        >
          {tasks.map(task => (
            <TaskElement key={task.id} task={task} />
          ))}
        </SimpleGrid>
      </div>
    )
  } else if (tasks.length > 0 && filters.category !== 'all') {
    const filteredTasks = filterTasks(tasks)
    return (
      <div>
        <SimpleGrid
          columns={[1, null, 3]}
          spacing="40px"
          justifyItems={'center'}
          paddingBottom={'40px'}
        >
          {filteredTasks.map(task => (
            <TaskElement key={task.id} task={task} />
          ))}
        </SimpleGrid>
      </div>
    )
  } else {
    return (
      <div>
        <p>No tasks found</p>
      </div>
    )
  }
}
