import { Filters, Task, TaskState } from '../types'

export async function fetchSetTasks(filters: Filters) {
  const body = {
    category: filters.category,
    sort: filters.sort,
  }
  const res = await fetch('http://127.0.0.1:8000/api/task/getTasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  return data.task
}

export async function fetchAddTask(title: string, text: string) {
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

export async function fetchDeleteTask(taskId: number) {
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
