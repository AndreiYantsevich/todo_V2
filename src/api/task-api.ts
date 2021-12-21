import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '7e5b4528-2880-4677-b629-b878b7697787'
    }
})

export const taskAPI = {
    updateTask(todolistId: string, taskId: string, title: string) {
        const promise = instance.put<ResponseType<{ title: string }>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
        return promise
    },
    getTasks(todolistId: string) {
        const promise = instance.get<ResponseType<Array<TaskType>>>(`todo-lists/${todolistId}/tasks`)
        return promise
    },
    createTask(todolistId: string, title: string) {
        const promise = instance.post<ResponseType<{ title: string }>>(`todo-lists/${todolistId}/tasks`, {title})
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        const promise = instance.delete<ResponseType<Array<TaskType>>>(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    }
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}