import { useContext } from "react"
import { FiltersContext } from "../context/filters"
import { TaskList } from "../types"

export const useFilters = () => {
    const context = useContext(FiltersContext)
    
    if (context === null) {
        throw new Error("useFilters must be used within a FiltersProvider")
    }

    const { filters, setFilters } = context
    
    return { filters, setFilters }
}
