import React, { useEffect, useState } from 'react';
import TODO from '../Todo/Todo';
import './Todo_List.css';

function TODO_LIST({ toggleTheme }) {
    const [todos, setTodos] = useState([]);
    const [showActive, setShowActive] = useState(false);
    const [showAll, setShowAll] = useState(true);
    const [showCompleted, setShowCompleted] = useState(false);
    const [startIndex, setStartIndex] = useState(-1);
    const [endIndex, setEndIndex] = useState(-1);


    //  EFFECT HOOKS
    useEffect(() => {
        const todosToRead = getTodos();

        if(todosToRead !== null) {
            setTodos(JSON.parse(todosToRead));
            
        }
    }, []);

    useEffect(() => {
        const new_todo = document.querySelector('.todo-list__new-todo');
        const check_circle = document.querySelector('.todo-list__new-todo__check-circle');
        const list = document.querySelector('.todo-list__list');
        const items_left = document.querySelector('.todo-list__list__items-left');
        const todos_ = document.querySelectorAll('.todo-list__list__todo');
        const selectors = document.querySelector('.todo-list__list-selectors');

        if(toggleTheme) {
            new_todo.classList.add('dark-list');
            check_circle.classList.add('dark-circle');
            list.classList.add('dark-list');
            items_left.classList.add('dark-items-left');
            selectors.classList.add('dark-selectors');

            todos_.forEach(todo_ => todo_.classList.add('dark-todo'));
        } 
        else {
            new_todo.classList.remove('dark-list');
            check_circle.classList.remove('dark-circle');
            list.classList.remove('dark-list');
            items_left.classList.remove('.dark-items-left');
            selectors.classList.remove('dark-selectors');
            
            todos_.forEach(todo_ => todo_.classList.remove('dark-todo'));
        }
    }, [toggleTheme]);


    //  EVENT HANDLERS
    function handleAddTodo(event) {
        //  keyCode 13 corresponds to the 'Enter' button on the keyboard, i.e.,
        //  if user presses 'Enter', then do this
        if(event.keyCode === 13) {
            /* event.preventDefault(); */

            const input = document.getElementById('todo-input').value;
            const new_todo = {
                text: input,
                isCompleted: false,
                id: generateRandomID()
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


    //  DRAG HANDLERS
    function dragStartHandler(e) {
        /* console.log(e.target)
        console.log('drag start') */
        e.target.classList.add('dragging')
        
        let d = document.querySelectorAll('.todo-list__list__todo')
        /* console.log(d) */
        /* const c = [...d, e.target] */
        const c = [...d];
        /* console.log(c) */
        const start = c.indexOf(e.target)
        /* console.log(start)
        d = [...document.querySelectorAll('.todo-list__list__todo:not(.dragging)')]
        console.log('d: ', d) */
        
        setStartIndex(start);
    }

    function dragOverHandler(e) {
        /* console.log('draging over')
        console.log(e.target); */
        e.preventDefault();
        
        /* let cont = [...document.querySelectorAll('.todo-list__list__todo:not(.dragging)')]*/
        
        /* let draggable = document.querySelector('.dragging') */
        
        if(e.target.tagName === 'LI') {
            /* console.log('drag over target: ', e.target) */
            let pie = e.target;
            let cont = [...document.querySelectorAll('.todo-list__list__todo')];

            setEndIndex(cont.indexOf(pie));
        }
    }

    function dragEndHandler(e) {
        e.target.classList.remove('dragging')
    }

    function dropHandler(e) {
        /* console.log('drop')

        console.log(document.querySelector('.dragging'))
        console.log(document.querySelector('.over'))
        console.log(todos[startIndex])
        console.log(todos[endIndex]) */
        
        const temp_todos = [...todos];
        const temp = temp_todos[startIndex];
        temp_todos[startIndex] = temp_todos[endIndex];
        temp_todos[endIndex] = temp;
        /* console.log(temp_todos) */
        
        setTodos(temp_todos);

        storeTodos(temp_todos);

        e.target.classList.remove('over');
    }

    function dragEnterHandler(e) {
        if(e.target.tagName === 'LI') e.target.classList.add('over')
    }

    function dragLeaveHandler(e) {
        if(e.target.tagName === 'LI') e.target.classList.remove('over')
    }

    
    //  SETTERS
    function storeTodos(todosToStore) {
        localStorage.setItem('todos', JSON.stringify(todosToStore));
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


    //  GETTERS
    function getTodos() {
        return localStorage.getItem('todos');
    }

    
    //  OTHER FUNCTION(S)
    function clearSelectors(str1, str2) {
        const selector_string1 = 'selector--' + str1;
        const selector_string2 = 'selector--' + str2;

        document.getElementById(selector_string1).classList.remove('selected');
        document.getElementById(selector_string2).classList.remove('selected');
    }

    function generateRandomID() {
        let id = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for(let i = 0; i < 12; i++) {
            id = id.concat( characters.charAt( Math.floor( Math.random() * 62 ) ) );
        }
        
        return id;
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
                {showAll &&
                    todos.map((todo, index) => {
                        return (
                            <li 
                                key={index} 
                                className='todo-list__list__todo' 
                                draggable='true' 
                                onDragStart={dragStartHandler} 
                                onDragOver={dragOverHandler}
                                onDragEnd={dragEndHandler}
                                onDrop={dropHandler}
                                onDragEnter={dragEnterHandler}
                                onDragLeave={dragLeaveHandler}
                            >
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
                {showActive &&
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
                }
                {showCompleted && 
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
                }
                <li key={(todos.length + 1)} className='todo-list__list__items-left'>
                    <div>{todos.length} items left</div>
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
        </div>
    );
}

export default TODO_LIST;
