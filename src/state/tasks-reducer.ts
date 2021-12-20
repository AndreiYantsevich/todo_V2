import {TaskStateType} from '../App';
import {v1} from 'uuid';

type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>


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
                [action.todolistId]: state[action.todolistId] = [{id: v1(), title: action.value, isDone: false}, ...state[action.todolistId]]
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
export const addTaskAC = (value: string, todolistId: string) => ({type: 'ADD-TASK', value, todolistId} as const)




