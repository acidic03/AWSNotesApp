import React from 'react';
import './Todo.css';
import 'animate.css';

function Todo({index, todo, completeTodo}) {

    const handleClick = (ele) => {
        if (completeTodo) {
            document.getElementById(todo.id).classList.add("fadeOutDown");
            setTimeout(completeTodo, 600, index);
        }
    }

    let checkbox = 
        <label className="control control-checkbox">
            <input type="checkbox" onClick={(ele) => handleClick(ele)} />
            <div className="control_indicator"></div>
        </label>
    ;
    
    if (todo) {
        return(
            <div id={todo.id} className="todo animated fadeInRight">
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