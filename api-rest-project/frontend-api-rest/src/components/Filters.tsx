/* eslint-disable react/react-in-jsx-scope */

import { Select } from '@chakra-ui/react'
import { Filters } from '../types'
import { useFilters } from '../hooks/useFilters'

export function FiltersComponent() {
  const { setFilters } = useFilters()
  return (
    <section>
      <Select
        bg={'white'}
        size={'sm'}
        rounded={'xl'}
        onChange={event => {
          setFilters({
            category: event.target.value as Filters['category'],
            sort: 'off',
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
