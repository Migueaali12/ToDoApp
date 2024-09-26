/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useState } from 'react'
import { useTasks } from '../hooks/useTask'
import { Button } from '@chakra-ui/react'
import { TaskModal } from './Modal'
import { FiltersComponent } from './Filters'
import { useFilters } from '../hooks/useFilters'
import { RiArrowUpDownLine } from 'react-icons/ri'

export function Header() {
  const { tasks, getTask } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { filters, setFilters, sortTasks } = useFilters()

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    getTask()
  }, [])

  return (
    <section className="max-w-screen-lg place-self-center pb-16">
      <h1 className="text-center italic p-10 text-xl font-semibold">
        Todo App With React + Laravel Rest Api 📌
      </h1>
      <main className="flex justify-between max-h-fit">
        {tasks.length > 0 && (
          <FiltersComponent filters={filters} setFilters={setFilters} />
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
          <Button
            bg={'#3182ce'}
            size="sm"
            _hover={{ background: '#225d94' }}
            textColor={'#fff'}
            onClick={() => {
              sortTasks(tasks)
            }}
          >
            <RiArrowUpDownLine />
          </Button>
        </div>
      </main>
      {isModalOpen && (
        <TaskModal isOpen={isModalOpen} onClose={closeModal} task={null} />
      )}
    </section>
  )
}
