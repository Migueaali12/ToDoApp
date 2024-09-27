/* eslint-disable react/react-in-jsx-scope */

import { Select } from '@chakra-ui/react'
import { Task, FilterStatus } from '../types'

export function FiltersComponent({
  filterFunction,
}: {
  filterFunction: (status: FilterStatus) => void
}) {
  return (
    <section>
      <Select
        bg={'white'}
        size={'sm'}
        rounded={'xl'}
        onChange={event => {
          filterFunction(event.target.value as Task['state'])
        }}
      >
        <option value="all">Todos</option>
        <option value="in_progress">En progreso</option>
        <option value="pending">Pendiente</option>
        <option value="completed">Completada</option>
      </Select>
    </section>
  )
}
