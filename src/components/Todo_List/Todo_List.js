import React, { useEffect, useState } from 'react';
import TODO from '../Todo/Todo';
import './Todo_List.css';

function TODO_LIST({ toggleTheme }) {
    const [todos, setTodos] = useState([
        {
            text: 'complete online JavaScript course',
            isCompleted: true,
            id: 0
        },
        {
            text: 'Jog around the park 3x',
            isCompleted: false,
            id: 1
        }
    ]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const todo_input = document.querySelector('.todo-list__new-todo');
        const check_circle = document.querySelector('.todo-list__new-todo__check-circle');
        const list = document.querySelector('.todo-list__list');
        /* console.log(todos); */
        if(toggleTheme) {
            todo_input.classList.add('dark-list');
            check_circle.classList.add('dark-circle');
            list.classList.add('dark-list');
        } 
        else {
            todo_input.classList.remove('dark-list');
            check_circle.classList.remove('dark-circle');
            list.classList.remove('dark-list');
        }
    }, [toggleTheme]);

    /* if(!isLoaded){
        return (
            <div>Loading...</div>
        );
    } */

    function handleDeleteTodo(i) {
        console.log('deleted')
        console.log(i)

        const new_todos = todos.filter(todo => todo.id !== i);

        console.log(new_todos)

        setTodos(new_todos)
    }

    return (
        <div className='todo-list'>
            <div className='todo-list__new-todo'>
                <div className='todo-list__new-todo__check-circle'></div>
                <input className='todo-list__new-todo__input' type='text' placeholder='Create a new todo...'></input>
            </div>
            
            <ul className='todo-list__list'>
                {
                    todos.map((todo, index) => {
                        /* return (
                            <li key={index} className='todo-list__list__todo'>
                                <div className='todo-list__list__todo__check-circle'></div>
                                <div className='todo-list__list__todo__todo-text'>{todo.text}</div>
                                
                            </li>
                        ); */
                        return (
                            <li key={index} className='todo-list__list__todo'>
                                <TODO todo={todo} handleDeleteTodo={handleDeleteTodo} />
                            </li>
                        );
                    })
                }
                <li key={(todos.length + 1)} className='todo-list__list__items-left'>
                    <div>{todos.length} items left</div>
                    <div>Clear Completed</div>
                </li>
            </ul>
        </div>
    );
}

export default TODO_LIST;
