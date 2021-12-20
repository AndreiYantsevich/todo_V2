import {TaskStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';


type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | RemoveTodolistActionType
    | AddTodolistActionType

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
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
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            return state;
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
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    id,
    isDone,
    todolistId
} as const)
export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => ({
    type: 'CHANGE-TASK-TITLE',
    id,
    title,
    todolistId
} as const)



