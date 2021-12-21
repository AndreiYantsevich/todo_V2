import {FilterValueType, TodolistType} from '../App';
import {v1} from 'uuid';

export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>;

type ActionType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(tl => tl.id !== action.id)]
        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {
                ...tl, title: action.title
            } : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {
                ...tl, filter: action.filter
            } : tl)
        default:
            return state;
    }
}

export const RemoveTodolistAC = (todolistId: string) => ({
    type: 'REMOVE-TODOLIST',
    id: todolistId
} as const)
export const AddTodolistAC = (title: string) => ({
    type: 'ADD-TODOLIST',
    title,
    todolistId: v1()
} as const)
export const ChangeTodolistTitleAC = (title: string, todolistId: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title,
    id: todolistId
} as const)
export const ChangeTodolistFilterAC = (filter: FilterValueType, todolistId: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    filter,
    id: todolistId
} as const)


