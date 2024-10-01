import { useCallback, useEffect, useRef, useState } from 'react'
import { useTasks } from '../hooks/useTask'
import { Button, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { TaskModal } from './Modal'
import { FiltersComponent } from './Filters'
import { RiArrowUpDownLine } from 'react-icons/ri'
import { useFilters } from '../hooks/useFilters'
import debounce from 'just-debounce-it'
import { Filters } from '../types'
import { IoMdSearch } from 'react-icons/io'

export function Header() {
  const { tasks, setTask } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { filters, setFilters } = useFilters()
  const isFirstRender = useRef(true)
  console.log(filters)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const debouncedSetFilters = useCallback(
    debounce((value: Filters['search']) => {
      setFilters({
        ...filters,
        search: value,
      })
    }, 300),
    [filters, setFilters]
  )

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    setTask({
      category: filters.category,
      sort: filters.sort,
      search: filters.search,
    })
  }, [filters])

  return (
    <section className="max-w-sm md:max-w-screen-xl place-self-center pb-16">
      <h1 className="text-center italic p-10 text-xl font-semibold">
        Todo App With React + Laravel Rest Api 📌
      </h1>
      <main
        className={
          tasks.length > 0
            ? 'flex max-h-fit mb-2 justify-between '
            : 'flex max-h-fit mb-2 justify-center'
        }
      >
        {tasks.length > 0 && <FiltersComponent />}
        <div>
          <Button
            bg={'#3182ce'}
            size="sm"
            _hover={{ background: '#225d94' }}
            textColor={'#fff'}
            marginRight={'5px'}
            onClick={() => {
              openModal()
            }}
          >
            +
          </Button>
          {tasks.length > 0 && (
            <Button
              bg={'#3182ce'}
              size="sm"
              _hover={{ background: '#225d94' }}
              textColor={'#fff'}
              onClick={() => {
                setFilters({
                  ...filters,
                  sort: filters.sort === 'asc' ? 'desc' : 'asc',
                })
              }}
            >
              <RiArrowUpDownLine />
            </Button>
          )}
        </div>
      </main>
      {tasks.length > 0 && (
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <IoMdSearch />
          </InputLeftElement>
          <Input
            type="search"
            placeholder="Buscar"
            onChange={event => {
              debouncedSetFilters(event.target.value)
            }}
          />
        </InputGroup>
      )}
      {isModalOpen && (
        <TaskModal isOpen={isModalOpen} onClose={closeModal} task={null} />
      )}
    </section>
  )
}
