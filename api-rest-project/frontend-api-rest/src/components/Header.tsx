/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useState } from 'react'
import { useTasks } from '../hooks/useTask'
import { Button } from '@chakra-ui/react'
import { TaskModal } from './Modal'
import { FiltersComponent } from './Filters'
import { RiArrowUpDownLine } from 'react-icons/ri'
import { SearchInput } from './Search'
import { useFilters } from '../hooks/useFilters'

export function Header() {
  const { tasks, setTask } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { filters } = useFilters()

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    setTask({ category: 'all', sort: 'off' })
  }, [filters])

  return (
    <section className="max-w-screen-lg place-self-center pb-16">
      <h1 className="text-center italic p-10 text-xl font-semibold">
        Todo App With React + Laravel Rest Api 📌
      </h1>
      <main className="flex justify-between max-h-fit mb-2">
        {tasks.length > 0 && (
          <FiltersComponent />
        )}
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
              onClick={() => {}}
            >
              <RiArrowUpDownLine />
            </Button>
          )}
        </div>
      </main>
      {tasks.length > 0 && <SearchInput />}
      {isModalOpen && (
        <TaskModal isOpen={isModalOpen} onClose={closeModal} task={null} />
      )}
    </section>
  )
}
