import React, { useEffect, useState } from 'react'

function TODO({ todo, handleDeleteTodo }) {
    const [isCompleted, setIsCompleted] = useState(false);
    const [task, setTask] = useState("");
    
    useEffect (() => {
        setIsCompleted(todo.isCompleted);
    }, [todo]);

    return (
        <> 
            <div className='todo-list__list__todo__check-circle'></div>
            <div className='todo-list__list__todo__todo-text'>{todo.text}</div>
            <div>{isCompleted ? 'true' : 'false'}</div>
            <button onClick={() => handleDeleteTodo(todo.id)}>click</button>
        </>
    )
}

export default TODO;
