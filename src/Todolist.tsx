import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterValueType} from './App';

type TaskType = {
    id: string
    title: string,
    isDone: boolean,
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (value: string) => void
    changeFilter: (value: FilterValueType) => void
}

export const Todolist: FC<PropsType> = ({
                                            title,
                                            tasks,
                                            removeTask,
                                            changeFilter,
                                            addTask
                                        }) => {

    const [value, setValue] = useState('')

    const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        addTask(value)
        setValue('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }

    const onAllClickHandler = () => changeFilter('all');
    const onActiveClickHandler = () => changeFilter('all');
    const onCompletedClickHandler = () => changeFilter('all');

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={value} onChange={changeValueHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {
                    tasks.map(task => {
                        const onClickHandler = () => removeTask(task.id)

                        return <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}>X
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}