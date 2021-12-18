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
        },
        {
            text: '10 minutes meditation',
            isCompleted: true,
            id: 2
        }
    ]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const new_todo = document.querySelector('.todo-list__new-todo');
        const check_circle = document.querySelector('.todo-list__new-todo__check-circle');
        const list = document.querySelector('.todo-list__list');
        const items_left = document.querySelector('.todo-list__list__items-left');
        const todos_ = document.querySelectorAll('.todo-list__list__todo');
        /* console.log(todos_) */
        /* console.log(todos); */
        if(toggleTheme) {
            new_todo.classList.add('dark-list');
            check_circle.classList.add('dark-circle');
            list.classList.add('dark-list');
            items_left.classList.add('dark-items-left');

            todos_.forEach(todo_ => todo_.classList.add('dark-todo'));
        } 
        else {
            new_todo.classList.remove('dark-list');
            check_circle.classList.remove('dark-circle');
            list.classList.remove('dark-list');
            items_left.classList.remove('.dark-items-left');
            
            todos_.forEach(todo_ => todo_.classList.remove('dark-todo'));
        }
    }, [toggleTheme]);

    /* if(!isLoaded){
        return (
            <div>Loading...</div>
        );
    } */

    function handleAddTodo(event) {
        //  keyCode 13 corresponds to the 'Enter' button on the keyboard, i.e.,
        //  if user presses 'Enter', then do this
        if(event.keyCode === 13) {
            /* event.preventDefault(); */

            const input = document.getElementById('todo-input').value;
            /* console.log(input) */
            const new_todo = {
                text: input,
                isCompleted: false,
                id: todos.length
            };

            console.log(new_todo);

            const new_todos = [...todos, new_todo];

            console.log(new_todos);

            setTodos(new_todos);
        }
    }

    function handleDeleteTodo(id) {
        console.log('deleted');
        console.log(id);

        const new_todos = todos.filter(todo => todo.id !== id);

        console.log(new_todos);

        setTodos(new_todos);
    }

    function handleCompleteTodo(id) {
        const todoToUpdate = todos.find(todo => todo.id === id);

        console.log(todoToUpdate);
        
        todoToUpdate.isCompleted = !todoToUpdate.isCompleted;
        
        console.log(todoToUpdate);
    }

    function clearCompletedTodos() {
        const new_todos = todos.filter(todo => todo.isCompleted === false);
        
        console.log(new_todos);

        setTodos(new_todos);
    }


    return (
        <div className='todo-list'>
            <div className='todo-list__new-todo'>
                <div className='todo-list__new-todo__check-circle'></div>
                <input 
                    className='todo-list__new-todo__input' 
                    type='text' 
                    placeholder='Create a new todo...' 
                    id='todo-input' 
                    onKeyUp={handleAddTodo}
                ></input>
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
                                <TODO 
                                    todo={todo} 
                                    handleDeleteTodo={handleDeleteTodo} 
                                    toggleTheme={toggleTheme} 
                                    handleCompleteTodo={handleCompleteTodo} 
                                />
                            </li>
                        );
                    })
                }
                <li key={(todos.length + 1)} className='todo-list__list__items-left'>
                    <div>{todos.length} items left</div>
                    <div onClick={clearCompletedTodos}>Clear Completed</div>
                </li>
            </ul>
            <button onClick={() => console.log(todos)}>click me</button>
        </div>
    );
}

export default TODO_LIST;
