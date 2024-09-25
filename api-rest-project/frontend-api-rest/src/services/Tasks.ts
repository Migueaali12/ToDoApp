import { Task, TaskList, TaskState } from '../types'

interface tasksReponse {
  tasks: Task[]
  status: number
}

export async function fetchTasks(): Promise<TaskList> {
  const res = await fetch('http://127.0.0.1:8000/api/task', {
    method: 'GET',
  })
  const data: tasksReponse = await res.json()
  return data.tasks
}

export async function deleteTask(taskId: number): Promise<boolean> {
  const res = await fetch(`http://127.0.0.1:8000/api/task/${taskId}`, {
    method: 'DELETE',
  })
  const data = await res.json()
  if (data.status === 200) {
    return true
  }
  return false
}

export async function updateTaskState(
  taskId: number,
  state: TaskState
): Promise<boolean> {
  const body = { state: state }

  const res = await fetch(
    `http://127.0.0.1:8000/api/task/update-field-task/${taskId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )
  const data = await res.json()
  if (data.status === 200) {
    return true
  }
  return false
}
