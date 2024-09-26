/* eslint-disable react/react-in-jsx-scope */

import { Select } from '@chakra-ui/react'
import { Filters } from '../types'

export function FiltersComponent({
  filters,
  setFilters,
}: {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
}) {
  return (
    <section>
      <Select
        bg={'white'}
        size={'sm'}
        rounded={'xl'}
        defaultValue={filters.category}
        onChange={event => {
          setFilters({
            category: event.target.value as Filters['category'],
          })
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
