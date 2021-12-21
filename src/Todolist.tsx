import React, {FC, useCallback, memo} from 'react';
import {FilterValueType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Task} from './Task';

export type TaskType = {
    id: string
    title: string,
    isDone: boolean,
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    addTask: (value: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (id: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export const Todolist: FC<PropsType> = memo(({
                                                 id,
                                                 title,
                                                 tasks,
                                                 removeTask,
                                                 changeFilter,
                                                 addTask,
                                                 changeStatus,
                                                 filter,
                                                 removeTodolist,
                                                 changeTaskTitle,
                                                 changeTodolistTitle
                                             }) => {
    console.log('Todolist called');
    const onAllClickHandler = useCallback(() => changeFilter('all', id), [changeFilter, id]);
    const onActiveClickHandler = useCallback(() => changeFilter('active', id), [changeFilter, id]);
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', id), [changeFilter, id]);
    const removeTodolistHandler = useCallback(() => removeTodolist(id), [removeTodolist, id]);
    const addTaskHandler = useCallback((value: string) => addTask(value, id), [addTask, id]);
    const changeTodolistTitleHandler = useCallback((title: string) => changeTodolistTitle(title, id), [changeTodolistTitle, id]);

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {
                    tasksForTodolist.map(t => {
                        return <Task
                            key={t.id}
                            id={t.id}
                            title={t.title}
                            todolistId={id}
                            removeTask={removeTask}
                            isDone={t.isDone}
                            changeTaskTitle={changeTaskTitle}
                            changeStatus={changeStatus}
                        />
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
});