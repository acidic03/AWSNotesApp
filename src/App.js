import React, { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput/TodoInput';
import Todo from './components/Todo/Todo';
import Footer from './components/Footer/Footer';
import { v4 as uuidv4} from 'uuid';
import './App.css';



function App() {
  // const [todos, setTodos] = useState([
  //   {
  //     id: uuidv4(),
  //     text: "Learn about react",
  //     isCompleted: false
  //   },
  //   {
  //     id: uuidv4(),
  //     text: "Learn about vue js",
  //     isCompleted: false
  //   },
  //   {
  //     id: uuidv4(),
  //     text: "Learn about amgular",
  //     isCompleted: false
  //   }
  // ]);

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);  

  const [completedTodos, setCompletedTodos] = useState([]);

  const addTodo = text => {
    // call api to add todo
    console.log("added todo:", text);
    const tempTodo = {
      id: uuidv4(),
      text,
      isCompleted: false
    };
    const newTodos = [tempTodo, ...todos];
    setTodos(newTodos);
  };

  const getTodos = () => {
    // call api to get all todos
    console.log("getting all todos from api");
    const url = "https://eupvcmbvv6.execute-api.us-east-2.amazonaws.com/notes-api/todos";
    fetch(url, {"mode": "cors"})
      .then(res => {
        return res.json();
      })
      .then(data => {
        const newTodos = [];
        data.forEach(r => {
          let t = {
            id: r.id,
            text: r.text,
            isCompleted: r.is_completed
          };
          newTodos.push(t);
        });

        setTodos(newTodos);
      })
      .catch(err => {
        console.log(err);
      })
  };

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