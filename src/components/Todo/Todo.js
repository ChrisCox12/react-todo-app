import React, { useEffect, useState } from 'react';
import './Todo.css';
import cross from '../../assets/icon-cross.svg';
import check from '../../assets/icon-check.svg';

function TODO({ todo, handleDeleteTodo, toggleTheme }) {
    const [isCompleted, setIsCompleted] = useState(false);
    const [task, setTask] = useState("");
    
    useEffect (() => {
        const element = document.getElementById(todo.id);
        /* console.log(element) */
        
        const todo_text = element.querySelector('.todo-list__list__todo__left__todo-text');
        const todo_circle = element.querySelector('.todo-list__list__todo__left__check-circle');

        if(toggleTheme) {
            todo_circle.classList.add('dark-circle');
            todo_text.classList.add('dark-text');

            if(todo.isCompleted) {
                if(todo_text.classList.contains('completed--text--light')) {
                    todo_text.classList.remove('completed--text--light');
                }
                todo_text.classList.add('completed--text--dark');
            }
            else {
                todo_text.classList.remove('completed--text--dark');
            }
        }
        else {
            todo_circle.classList.remove('dark-circle');
            todo_text.classList.remove('dark-text');

            if(todo.isCompleted) {
                if(todo_text.classList.contains('completed--text--dark')) {
                    todo_text.classList.remove('completed--text--dark');
                }
                todo_text.classList.add('completed--text--light');
            }
            else {
                todo_text.classList.remove('completed--text--light');
            }
        }

        setIsCompleted(todo.isCompleted);
    }, [todo, toggleTheme]);

    return (
        <> 
            <div className="todo-list__list__todo__left" id={todo.id}>
                {todo.isCompleted ? 
                    <div className='todo-list__list__todo__left__check-circle completed--check-circle'>
                        <img src={check} alt='Completed'/>
                    </div>
                    : <div className='todo-list__list__todo__left__check-circle'></div>
                }
                <div className='todo-list__list__todo__left__todo-text'>{todo.text}</div>
                {/* <div>{isCompleted ? 'true' : 'false'}</div> */}
            </div>
            <div className="todo-list__list__todo__right">
                <button onClick={() => handleDeleteTodo(todo.id)}>
                    <img src={cross} alt='Delete Todo' />
                </button>
            </div>
        </>
    )
}

export default TODO;
