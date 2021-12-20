import {FilterValueType, TodolistType} from '../App';
import {v1} from 'uuid';

export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>;

type ActionType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>


export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(tl => tl.id !== action.id)]
        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state, todolist]
        case 'CHANGE-TODOLIST-FILTER':
            let todo = state.find(tl => tl.id === action.id)
            if (todo) {
                todo.filter = action.filter
            }
            return [...state, todo]
        default:
            throw new Error('I dont understand')
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


