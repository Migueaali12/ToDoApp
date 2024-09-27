/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { TasksList } from './components/TaskList'
import { TaskProvider } from './context/task'

function App() {
  return (
    <>
      <TaskProvider>
        <Header />
        <TasksList />
      </TaskProvider>
    </>
  )
}

export default App
