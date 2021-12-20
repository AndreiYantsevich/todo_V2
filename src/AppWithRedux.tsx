import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {
    AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC,
    RemoveTodolistAC
} from './state/todolists-reducer';
import {
    addTaskAC,
    changeTaskStatusAC, changeTaskTitleAC,
    removeTaskAC
} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type FilterValueType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = (id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId)
        dispatch(action)
    }
    const addTask = (value: string, todolistId: string) => {
        const action = addTaskAC(value, todolistId)
        dispatch(action)
    }
    const changeFilter = (value: FilterValueType, todolistId: string) => {
        const action = ChangeTodolistFilterAC(value, todolistId)
        dispatch(action)
    }
    const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
    }
    const removeTodolist = (id: string) => {
        const action = RemoveTodolistAC(id)
        dispatch(action)
    }
    const addTodolist = (title: string) => {
        const action = AddTodolistAC(title)
        dispatch(action)
    }
    const changeTaskTitle = (id: string, title: string, todolistId: string) => {
        const action = changeTaskTitleAC(id, title, todolistId)
        dispatch(action)
    }
    const changeTodolistTitle = (title: string, todolistId: string) => {
        const action = ChangeTodolistTitleAC(title, todolistId)
        dispatch(action)
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]
                    let tasksForTodolist = allTodolistTasks

                    if (tl.filter === 'active') {
                        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone)
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }
        </div>
    );
}

export default AppWithRedux;
