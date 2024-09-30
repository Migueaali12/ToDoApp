/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css'
import { Header } from './components/Header'
import { TasksList } from './components/TaskList'
import { TaskProvider } from './context/task'
import { FiltersProvider } from './context/filters'

function App() {
  return (
    <>
    <FiltersProvider>
      <TaskProvider>
        <Header />
        <TasksList />
      </TaskProvider>
      </FiltersProvider>
    </>
  )
}

export default App
