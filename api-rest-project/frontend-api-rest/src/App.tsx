/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css'
import { Header } from './components/Header'
import { TasksList } from './components/TaskList'
import { FiltersProvider } from './context/filters'
import { TaskProvider } from './context/task'

function App() {
  return (
    <>
      <TaskProvider>
        <FiltersProvider >
        <Header />
        <TasksList />
        </FiltersProvider>
      </TaskProvider>
    </>
  )
}

export default App
