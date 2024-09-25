import { Select } from '@chakra-ui/react'

export function Filters() {
  return (
    <section>
      <Select
        bg={'white'}
        size="sm"
        rounded={'xl'}

        //   //value={task.state}
        //   onChange={event =>
        //     updateTaskState(task.id, event.target.value as TaskState)
        //   }
      >
        <option value="in_progress">En progreso</option>
        <option value="pending">Pendiente</option>
        <option value="completed">Completada</option>
      </Select>
    </section>
  )
}
