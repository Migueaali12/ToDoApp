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

export async function fetchAddTask(
  title: string,
  text: string
): Promise<Task> {
  const body = { title: title, state: 'pending', text: text }
  const res = await fetch('http://127.0.0.1:8000/api/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  return data.task
}

export async function fetchDeleteTask(taskId: number): Promise<boolean> {
  const res = await fetch(`http://127.0.0.1:8000/api/task/${taskId}`, {
    method: 'DELETE',
  })
  const data = await res.json()
  if (data.status === 200) {
    return true
  }
  return false
}

export async function fetchUpdateTaskState(
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

export async function fetchUpdateTask(taskId: number, task: Task) {
  const body = { title: task.title, state: task.state, text: task.text }
  const res = await fetch(`http://127.0.0.1:8000/api/task/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (data.status === 200) {
    return true
  }
  return false
}
