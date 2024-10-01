import { createContext, useState } from 'react'
import { Filters } from '../types'

type FiltersContextType = {
    filters: Filters
    setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

export const FiltersContext = createContext<FiltersContextType | null>(null)

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    sort: 'off',
    search: ''
  })

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  )
}
