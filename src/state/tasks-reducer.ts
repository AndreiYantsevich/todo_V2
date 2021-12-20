import {TaskStateType} from '../App';
import {v1} from 'uuid';

type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>


export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId] = [{
                    id: v1(),
                    title: action.value,
                    isDone: false
                }, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            let tasks = state[action.todolistId]
            let task = tasks.find(tl => tl.id === action.id)
            if (task) {
                task.isDone = action.isDone
            }
            return {...state}
        case 'CHANGE-TASK-TITLE': {
            let tasks = state[action.todolistId]
            let task = tasks.find(tl => tl.id === action.id)
            if (task) {
                task.title = action.title
            }
            return {...state}
        }
        default:
            throw new Error('I dont understand')
    }
}

export const removeTaskAC = (id: string, todolistId: string) => ({
    type: 'REMOVE-TASK',
    id,
    todolistId
} as const)
export const addTaskAC = (value: string, todolistId: string) => ({
    type: 'ADD-TASK',
    value,
    todolistId
} as const)
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => ({type: 'CHANGE-TASK-STATUS', id, isDone, todolistId} as const)
export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => ({type: 'CHANGE-TASK-TITLE', id, title, todolistId} as const)



