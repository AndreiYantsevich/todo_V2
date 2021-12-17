import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';

export type FilterValueType = 'all' | 'active' | 'completed';

function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'REST API', isDone: false},
        {id: v1(), title: 'React', isDone: true},
    ])
    const [filter, setFilter] = useState<FilterValueType>('all')

    const removeTask = (id: string) => {
       const filteredTask = tasks.filter(t => t.id !== id)
        setTasks(filteredTask);
    }

    const addTask = (value: string) => {
        const task = {id: v1(), title: value, isDone: false}
        setTasks([...tasks, task]);
    }

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    let tasksForTodolist = tasks

    if (filter === 'active') {
       tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
       tasksForTodolist = tasks.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <Todolist title={'html'} tasks={tasksForTodolist} removeTask={removeTask} changeFilter={changeFilter} addTask={addTask}/>
        </div>
    );
}

export default App;
