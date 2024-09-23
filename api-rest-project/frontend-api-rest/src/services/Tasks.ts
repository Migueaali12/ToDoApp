import { TaskList } from "../types"

export async function fetchTasks(): Promise<TaskList> {
  const res = await fetch('http://127.0.0.1:8000/api/task', {
    method: 'GET',
  })
  const data = await res.json()
  return data.tasks
}


export async function deleteTask(taskId: number) : Promise<boolean> {
    await fetch(`http://127.0.0.1:8000/api/task/${taskId}`, {
      method: 'DELETE',
    })
    return true
}
