/* eslint-disable react/prop-types */

import { SimpleGrid } from '@chakra-ui/react'
import { TaskElement } from './Task'
import { useTasks } from '../hooks/useTask'

export function TasksList() {
  const { tasks } = useTasks()

  if (tasks.length < 0) {
    return (
      <div className="place-self-center font-medium">
        <p>No se encontraron tareas</p>
      </div>
    )
  }

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
}
