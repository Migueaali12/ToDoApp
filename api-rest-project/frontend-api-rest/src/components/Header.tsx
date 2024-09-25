/* eslint-disable react/react-in-jsx-scope */

import { useEffect } from 'react'
import { useTasks } from '../hooks/useTask'
import { Filters } from './Filters'

export function Header() {
  const { getTask } = useTasks()

  useEffect(() => {
    getTask()
  }, [])

  return (
    <section className="max-w-screen-lg place-self-center">
      <h1 className="text-center italic p-10 text-xl font-semibold">
        Todo App With React + Laravel Rest Api 📌
      </h1>
      <div className="max-w-[30%]">
        <Filters />
      </div>
    </section>
  )
}
