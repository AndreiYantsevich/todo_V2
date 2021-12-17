import React, {FC} from 'react';
import {FilterValueType} from './App';

type TaskType = {
    id: number
    title: string,
    isDone: boolean,
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValueType) => void
}

export const Todolist: FC<PropsType> = ({title, tasks, removeTask, changeFilter}) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    tasks.map(task => <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={() => {removeTask(task.id)}}>X</button>
                    </li>)
                }
            </ul>
            <div>
                <button onClick={() => changeFilter('all')}>All</button>
                <button onClick={() => changeFilter('active')}>Active</button>
                <button onClick={() => changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}