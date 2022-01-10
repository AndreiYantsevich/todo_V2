export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const SET_APP_STATUS = 'SET_APP_STATUS'
const SET_APP_ERROR = 'SET_APP_ERROR'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_APP_STATUS:
            return {...state, status: action.status}
        case SET_APP_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({
    type: SET_APP_STATUS,
    status
} as const)

export const setAppErrorAC = (error: string | null) => ({
    type: SET_APP_ERROR,
    error
} as const)

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
type ActionsType = SetAppStatusActionType | SetAppErrorActionType