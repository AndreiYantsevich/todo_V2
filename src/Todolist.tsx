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
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterValueType
}

export const Todolist: FC<PropsType> = ({
                                            title,
                                            tasks,
                                            removeTask,
                                            changeFilter,
                                            addTask,
                                            changeStatus,
                                            filter
                                        }) => {

    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (value.trim() !== '') {
            addTask(value)
            setValue('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }

    const onAllClickHandler = () => changeFilter('all');
    const onActiveClickHandler = () => changeFilter('active');
    const onCompletedClickHandler = () => changeFilter('completed');

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={value}
                       onChange={changeValueHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error ? <div className="error-message">{error}</div> : ''}
            </div>
            <ul>
                {
                    tasks.map(task => {
                        const onClickHandler = () => removeTask(task.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeStatus(task.id, e.currentTarget.checked)
                        }

                        return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone}
                                   onChange={onChangeHandler}/>
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}>X
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}
                        className={filter === 'all' ? 'active-filter' : ''}>All
                </button>
                <button onClick={onActiveClickHandler}
                        className={filter === 'active' ? 'active-filter' : ''}>Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={filter === 'completed' ? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    )
}