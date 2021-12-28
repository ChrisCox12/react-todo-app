import React, { useEffect, useState } from 'react';
import TODO from '../Todo/Todo';
import './Todo_List.css';

function TODO_LIST({ toggleTheme }) {
    const [todos, setTodos] = useState([]);
    const [showAll, setShowAll] = useState(true);
    const [showActive, setShowActive] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false);
    const [startIndex, setStartIndex] = useState(-1);   //  for the element that's being dragged
    const [endIndex, setEndIndex] = useState(-1);   //  for the element to be swapped with


    //  EFFECT HOOKS
    useEffect(() => {
        const todosToRead = getTodos();

        if(todosToRead !== null) {
            setTodos(JSON.parse(todosToRead));
            
        }
    }, []);

    //  Handles theme switching
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

            //  creates new_todos array using everything in todos 
            //  and adds new_todo to the end
            const new_todos = [...todos, new_todo];

            //  updates state variable, todos
            setTodos(new_todos);
            //  stores new_todos in localstorage
            storeTodos(new_todos);
        }
    }

    function handleDeleteTodo(id) {
        //  filters out the todo to be deleted from todos;
        //  the one to be deleted has to match id
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
        //  filters out completed todos from todos
        const new_todos = todos.filter(todo => todo.isCompleted === false);

        setTodos(new_todos);
        storeTodos(new_todos);
    }


    //  DRAG HANDLERS
    //  fires the moment an element is being dragged
    function dragStartHandler(e) {
        e.target.classList.add('dragging');
        
        let d = document.querySelectorAll('.todo-list__list__todo');    //  all todos; collection of html elements
        const c = [...d];   //  c is an array, d is a collection of html elements
        const start = c.indexOf(e.target);  //  gets index of the element that is being dragged
        
        setStartIndex(start);
    }

    // fires when an element is being hovered by a draggable element
    function dragOverHandler(e) {
        //  allows a draggable element to be dropped in other elements
        e.preventDefault();
        
        //  only pay attention to <li> elements
        if(e.target.tagName === 'LI') {
            let pie = e.target; //  the element being hovered over
            let cont = [...document.querySelectorAll('.todo-list__list__todo')];    //  array of all todos

            setEndIndex(cont.indexOf(pie));
        }
    }

    //  fires the moment to the element being dragged is no longer being dragged
    function dragEndHandler(e) {
        e.target.classList.remove('dragging');
    }

    //  fires the moment the element being dragged is dropped into another element
    function dropHandler(e) {
        //  makes a copy of todos array; 
        //  without spread operator, temp_todos would reference todos directly
        const temp_todos = [...todos];

        //  swaps the dragged element with the element it was dropped on
        const temp = temp_todos[startIndex];
        temp_todos[startIndex] = temp_todos[endIndex];
        temp_todos[endIndex] = temp;
        
        setTodos(temp_todos);
        storeTodos(temp_todos);

        e.target.classList.remove('over');
    }

    //  fires the moment an element is being hovered over with an element being dragged
    function dragEnterHandler(e) {
        if(e.target.tagName === 'LI') e.target.classList.add('over')
    }

    // fires the moment an element that was being hovered over is no longer being hovered over
    function dragLeaveHandler(e) {
        if(e.target.tagName === 'LI') e.target.classList.remove('over')
    }

    
    //  SETTERS
    //  stores todos in localstorage
    function storeTodos(todosToStore) {
        localStorage.setItem('todos', JSON.stringify(todosToStore));
    }

    //  for showing all todos
    function showAllTodos() {
        clearSelectors('active', 'completed');

        document.getElementById('selector--all').classList.add('selected');

        setShowActive(false);
        setShowAll(true);
        setShowCompleted(false);
    }

    //  for showing only active todos
    function showActiveTodos() {
        clearSelectors('all', 'completed');

        document.getElementById('selector--active').classList.add('selected');

        setShowActive(true);
        setShowAll(false);
        setShowCompleted(false);
    }

    //  for showing only completed todos
    function showCompletedTodos() {
        clearSelectors('all', 'active');

        document.getElementById('selector--completed').classList.add('selected');

        setShowActive(false);
        setShowAll(false);
        setShowCompleted(true);
    }


    //  GETTERS
    //  gets todos stored in localstorage
    function getTodos() {
        return localStorage.getItem('todos');
    }

    
    //  OTHER FUNCTION(S)
    //  removes 'selected' class from the two other selectors
    function clearSelectors(str1, str2) {
        const selector_string1 = 'selector--' + str1;
        const selector_string2 = 'selector--' + str2;

        document.getElementById(selector_string1).classList.remove('selected');
        document.getElementById(selector_string2).classList.remove('selected');
    }

    //  genereates a random ID
    function generateRandomID() {
        let id = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        //  the ID is 12 characters in length and is comprised of characters from the characters variable,
        //  which is 62 characters long
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
                {/* shows all todos if showAll is true  */}
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
                {/* shows only the uncompleted todos if showActive is true  */}
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
                {/* shows only the completed todos if showCompleted is true */}
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
