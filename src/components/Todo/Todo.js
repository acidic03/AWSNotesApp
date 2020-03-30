import React from 'react';
import './Todo.css';
import 'animate.css';

function Todo({index, todo, completeTodo}) {

    const handleClick = () => {
        if (completeTodo) {
            completeTodo(index);
        }
    }

    let checkbox = 
        <label className="control control-checkbox">
            <input type="checkbox" onClick={handleClick} />
            <div className="control_indicator"></div>
        </label>
    ;
    
    if (todo) {
        return(
            <div className="todo animated fadeInRight">
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