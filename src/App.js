import React, { useState } from 'react';
import TodoInput from './components/TodoInput/TodoInput';
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
    console.log("added todo:", text);
    const newTodos = [{text, id: uuidv4()}, ...todos];
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


  return(
    <div>
      <div className="app">
      <h1 className="text-center mb-4">Todo List</h1>
      <TodoInput addTodo={addTodo} />
      
      <br />

      {todos.length > 1 ? (
        <p>You have {todos.length} tasks to complete</p>
      ) : todos.length === 0 ? (
        <p className="text-center">Awesome! All tasks are completed.</p>
      ) : (
        <p>You have {todos.length} task to complete</p>
      )}
      
      <div className="todos-container">
      { todos.map((todo, index) => 
          <Todo key={todo.id} index={index} todo={todo} completeTodo={completeTodo} />
        ) }
      </div>
    </div>

      <Footer />
    </div>
  );
}

export default App;