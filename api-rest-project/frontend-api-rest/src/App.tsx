/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import './App.css'
import { Header } from './components/Header'
import { Tasks } from './components/Task'
import { useTasks } from './hooks/useTask'

function App() {
  const { tasks, handleAddTask, handleDeleteTask, handleUpdateTask } = useTasks()

  return (
    <>
      <Header />
      <Tasks 
        tasks={tasks} 
        onDeleteTask={handleDeleteTask} 
        onUpdateTask={handleUpdateTask} 
      />
    </>
  )
}

export default App

