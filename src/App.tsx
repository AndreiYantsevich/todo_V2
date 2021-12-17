import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterValueType = 'all' | 'active' | 'completed';

function App() {
    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS', isDone: false},
        {id: 4, title: 'REST API', isDone: false},
        {id: 5, title: 'React', isDone: true},
    ])
    const [filter, setFilter] = useState<FilterValueType>('all')

    const removeTask = (id: number) => {
       let filteredTask = tasks.filter(t => t.id !== id)
        setTasks(filteredTask);
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
            <Todolist title={'html'} tasks={tasksForTodolist} removeTask={removeTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
