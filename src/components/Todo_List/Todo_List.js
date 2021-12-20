import React, { useEffect, useState } from 'react';
import TODO from '../Todo/Todo';
import './Todo_List.css';

function TODO_LIST({ toggleTheme }) {
    const [todos, setTodos] = useState([]);
    const [showActive, setShowActive] = useState(false);
    const [showAll, setShowAll] = useState(true);
    const [showCompleted, setShowCompleted] = useState(false);

    useEffect(() => {
        const todosToRead = getTodos();

        if(todosToRead !== null) {
            setTodos(JSON.parse(todosToRead));
        }

        const new_todo = document.querySelector('.todo-list__new-todo');
        const check_circle = document.querySelector('.todo-list__new-todo__check-circle');
        const list = document.querySelector('.todo-list__list');
        const items_left = document.querySelector('.todo-list__list__items-left');
        const todos_ = document.querySelectorAll('.todo-list__list__todo');

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

    function handleAddTodo(event) {
        //  keyCode 13 corresponds to the 'Enter' button on the keyboard, i.e.,
        //  if user presses 'Enter', then do this
        if(event.keyCode === 13) {
            /* event.preventDefault(); */

            const input = document.getElementById('todo-input').value;
            const new_todo = {
                text: input,
                isCompleted: false,
                id: todos.length
            };

            const new_todos = [...todos, new_todo];

            setTodos(new_todos);

            storeTodos(new_todos);
        }
    }

    function handleDeleteTodo(id) {
        const new_todos = todos.filter(todo => todo.id !== id);

        setTodos(new_todos);

        storeTodos(new_todos);
    }

    function handleCompleteTodo(id) {
        const todoToUpdate = todos.find(todo => todo.id === id);
        
        todoToUpdate.isCompleted = !todoToUpdate.isCompleted;

        storeTodos(todos);
    }

    function clearCompletedTodos() {
        const new_todos = todos.filter(todo => todo.isCompleted === false);

        setTodos(new_todos);

        storeTodos(new_todos);
    }

    function storeTodos(todosToStore) {
        localStorage.setItem('todos', JSON.stringify(todosToStore));
    }

    function getTodos() {
        return localStorage.getItem('todos');
    }

    function showAllTodos() {
        clearSelectors('active', 'completed');

        document.getElementById('selector--all').classList.add('selected');

        setShowActive(false);
        setShowAll(true);
        setShowCompleted(false);
    }

    function showActiveTodos() {
        clearSelectors('all', 'completed');

        document.getElementById('selector--active').classList.add('selected');

        setShowActive(true);
        setShowAll(false);
        setShowCompleted(false);
    }

    function showCompletedTodos() {
        clearSelectors('all', 'active');

        document.getElementById('selector--completed').classList.add('selected');

        setShowActive(false);
        setShowAll(false);
        setShowCompleted(true);
    }

    function clearSelectors(str1, str2) {
        const selector_string1 = 'selector--' + str1;
        const selector_string2 = 'selector--' + str2;

        document.getElementById(selector_string1).classList.remove('selected');
        document.getElementById(selector_string2).classList.remove('selected');
    }

    function getItemsLeft() {
        return '11';
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
                {showAll ?
                    todos.map((todo, index) => {
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
                    : null
                }
                {showActive ? 
                    todos.map((todo, index) => {
                        if(!todo.isCompleted) {
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
                        }

                        return null;
                    }) 
                    : null
                }
                {showCompleted ? 
                    todos.map((todo, index) => {
                        if(todo.isCompleted) {
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
                        }

                        return null;
                    })
                    : null
                }
                <li key={(todos.length + 1)} className='todo-list__list__items-left'>
                    <div> items left</div>
                    <div onClick={clearCompletedTodos}>Clear Completed</div>
                </li>
            </ul>

            <div className='todo-list__list-selectors'>
                <div 
                    className='todo-list__list-selectors__selector selected' 
                    id='selector--all' 
                    onClick={showAllTodos}>All</div>

                <div 
                    className='todo-list__list-selectors__selector' 
                    id='selector--active' 
                    onClick={showActiveTodos}>Active</div>

                <div 
                    className='todo-list__list-selectors__selector' 
                    id='selector--completed' 
                    onClick={showCompletedTodos}>Completed</div>
            </div>
            <div>
                
            </div>
        </div>
    );
}

export default TODO_LIST;
