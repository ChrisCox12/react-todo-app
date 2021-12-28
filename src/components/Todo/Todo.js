import React, { useEffect, useState } from 'react';
import './Todo.css';
import cross from '../../assets/icon-cross.svg';
import check from '../../assets/icon-check.svg';

function TODO({ todo, handleDeleteTodo, toggleTheme, handleCompleteTodo }) {
    const [isCompleted, setIsCompleted] = useState(false);
    
    useEffect (() => {
        setIsCompleted(todo.isCompleted);

        //  since every todo element will have the same amount of children with the same class names,
        //  instead of searching through entire DOM,
        //  only search through the element that has the ID of the todo
        const element = document.getElementById(todo.id);
        const todo_text = element.querySelector('.todo-list__list__todo__left__todo-text');
        const todo_circle = element.querySelector('.todo-list__list__todo__left__check-circle');

        if(toggleTheme) {
            todo_circle.classList.add('dark-circle');
            todo_text.classList.add('dark-text');

            if(isCompleted) {
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

            if(isCompleted) {
                if(todo_text.classList.contains('completed--text--dark')) {
                    todo_text.classList.remove('completed--text--dark');
                }
                todo_text.classList.add('completed--text--light');
            }
            else {
                todo_text.classList.remove('completed--text--light');
            }
        }

    }, [todo, toggleTheme, isCompleted]);

    function handleComplete() {
        setIsCompleted(!isCompleted);

        //  calls the function passed in as a prop, passes in the id of the todo
        handleCompleteTodo(todo.id);
    }

    return (
        <> 
            <div className="todo-list__list__todo__left" id={todo.id}>
                {/* renders a certain div based on the state of isCompleted */}
                {isCompleted ? 
                    <div className='todo-list__list__todo__left__check-circle completed--check-circle' onClick={handleComplete}>
                        <img src={check} alt='Completed'/>
                    </div>
                    : <div className='todo-list__list__todo__left__check-circle' onClick={handleComplete}></div>
                }
                <div className='todo-list__list__todo__left__todo-text'>{todo.text}</div>
            </div>
            <div className="todo-list__list__todo__right">
                {/* calls the function passed in as a prop, passes in the id of the todo */}
                <button onClick={() => handleDeleteTodo(todo.id)}>
                    <img src={cross} alt='Delete Todo' />
                </button>
            </div>
        </>
    )
}

export default TODO;
