import React, { useState } from 'react';
import Todo from './components/Todo/Todo';
import Footer from './components/Footer/Footer';
import { v4 as uuidv4} from 'uuid';
import './App.css';



function App() {
  const [todos, setTodos] = useState([
    {
      id: uuidv4(),
      text: "Learn about react",
      isCompleted: false
    },
    {
      id: uuidv4(),
      text: "Learn about vue js",
      isCompleted: false
    },
    {
      id: uuidv4(),
      text: "Learn about amgular",
      isCompleted: false
    }
  ]);

  const [completedTodos, setCompletedTodos] = useState([]);

  const addTodo = text => {
    // call api to add todo
    const newTodos = [...todos, {text, id: uuidv4()}];
    setTodos(newTodos);
  };

  // const getTodos = () => {
  //   // call api to get all todos
  // };

  const completeTodo = (index) => {
    // update api to mark todo complete
    const newCompleted = [...completedTodos, todos[index]];
    removeTodo(index);
    setCompletedTodos(newCompleted);
  };

  const removeTodo = (index) => {
    // call api to remove todo
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };


  return (
    <div className="app">
      <div className="container">
        
        <h2 className="text-center title">TASKS</h2>
        <div className="todos-container">
          { todos.map((todo, index) => 
            <Todo key={todo.id} index={index} todo={todo} completeTodo={completeTodo} />
          ) }
        </div>
        
        <br />
        <br />
        <br />
        <br />
        

        <h2 className="text-center title">COMPLETED</h2>
        <div className="todos-container">
          { completedTodos.map((todo, index) => 
            <Todo key={todo.id} index={index} todo={todo} />
          ) }
        </div>

      </div>
      <Footer addTodo={addTodo} />
    </div>
  );
}

export default App;