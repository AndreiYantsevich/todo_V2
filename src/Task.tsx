import React, {ChangeEvent, FC, useCallback} from 'react';
import {EditableSpan} from './EditableSpan';

type PropsType = {
    id: string
    isDone: boolean
    title: string
    todolistId: string
    removeTask: (id: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
}

export const Task: FC<PropsType> = ({
                                        id,
                                        isDone,
                                        title,
                                        removeTask,
                                        changeTaskTitle,
                                        changeStatus,
                                        todolistId
                                    }) => {
    const onClickHandler = () => removeTask(id, todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(id, e.currentTarget.checked, todolistId)
    }
    const changeTaskTitleHandler = useCallback((title: string) => {
        changeTaskTitle(id, title, todolistId)
    }, [changeTaskTitle, id, todolistId])

    return (
        <li className={isDone ? 'is-done' : ''}>
            <input type="checkbox" checked={isDone}
                   onChange={onChangeHandler}/>
            <EditableSpan value={title}
                          onChange={changeTaskTitleHandler}/>
            <button onClick={onClickHandler}>X
            </button>
        </li>
    )
}