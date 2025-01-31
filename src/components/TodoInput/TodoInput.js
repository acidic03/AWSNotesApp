import React, { useState } from 'react';
import './TodoInput.css';

function TodoInput({addTodo}) {

    const [value, setValue] = useState("");

    const handleOnClick = () => {
        if(value) {
            addTodo(value);
        }
        setValue("");
    };

    return(
        <div className="todo-input">
            <input type="text" placeholder="Enter a task.." value={value} onChange={e => setValue(e.target.value)} />
            
            <svg onClick={handleOnClick} className="bi bi-plus-circle-fill" width="2.3em" height="2.3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z" clipRule="evenodd"/>
            </svg>
        </div>
    );
}

export default TodoInput;