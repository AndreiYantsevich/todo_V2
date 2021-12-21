import axios from 'axios';
import {CreateTodolist} from '../stories/todolists-api.stories';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '7e5b4528-2880-4677-b629-b878b7697787'
    }
})


export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put(`todo-lists/${todolistId}`, {title})
        return promise
    },
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>(`todo-lists`)
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post(`todo-lists`,{title})
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete(`todo-lists/${todolistId}`)
        return promise
    }
}

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

