import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValueType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])
    /*const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'REST API', isDone: false},
        {id: v1(), title: 'React', isDone: true},
    ])*/
    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: true}
        ]
    })

    const removeTask = (id: string, todolistId: string) => {
        const todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks});
    }

    const addTask = (value: string, todolistId: string) => {
        const task = {id: v1(), title: value, isDone: false}
        const todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks});
    }

    const changeFilter = (value: FilterValueType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }

    }

    const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
        const todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(tl => tl.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    return (
        <div className="App">
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
                    />
                })
            }
        </div>
    );
}

export default App;
