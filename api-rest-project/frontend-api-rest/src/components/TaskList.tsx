/* eslint-disable react/prop-types */

import { SimpleGrid } from '@chakra-ui/react'
import { TaskElement } from './Task'
import { useTasks } from '../hooks/useTask'

export function TasksList() {
  const { tasks } = useTasks()

  return tasks.length > 0 ? (
    <div>
      <SimpleGrid columns={[1, null, 3]} spacing="40px" justifyItems={'center'}>
        {tasks.map(task => (
          <TaskElement key={task.id} task={task} />
        ))}
      </SimpleGrid>
    </div>
  ) : (
    <h2 className='p-10 place-self-center'>No hay tareas encontradas</h2>
  )
}
