import React, {useEffect, useState} from 'react'
import {taskAPI} from '../api/task-api';

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c0e51088-d5d4-492a-8882-1e9cfb25ca4c'
        taskAPI.getTasks(todolistId)
            .then(res => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c0e51088-d5d4-492a-8882-1e9cfb25ca4c'
        const newTask = 'HELLO'
        taskAPI.createTask(todolistId, newTask)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c0e51088-d5d4-492a-8882-1e9cfb25ca4c'
        const taskId = '6381b172-a7de-4f97-bebe-efd98b826ed4'
        taskAPI.deleteTask(todolistId, taskId)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c0e51088-d5d4-492a-8882-1e9cfb25ca4c'
        const taskId = 'e07c674b-07cf-4f9b-926b-2dedb9f751b1'
        const newTitle = 'HELLO WORLD'
        taskAPI.updateTask(todolistId, taskId, newTitle)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
