import React from 'react';
import './Todo.css';

function Todo({index, todo, completeTodo}) {

    const handleClick = () => {
        if (completeTodo) {
            completeTodo(index);
        }
    }

    let checkbox = 
    <div className="todo-mark">
        <input type="checkbox" name="completed" onClick={handleClick} />
    </div>
    ;
    
    if (todo) {
        return(
            <div className="todo">
                {completeTodo ? checkbox : ""}
    
                <p>{ todo.text }</p>
            </div>
        );
    } else {
        return(
            <div></div>
        );
    }
}


export default Todo;