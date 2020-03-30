import React, { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput/TodoInput';
import Todo from './components/Todo/Todo';
import Footer from './components/Footer/Footer';
import './App.css';


function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);  


  // Add todos
  const addTodo = text => {
    const tempTodo = {
      text,
      isCompleted: false
    };
    const url = "https://eupvcmbvv6.execute-api.us-east-2.amazonaws.com/notes-api/add";

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempTodo)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log("recieved response from add: " + JSON.stringify(data));
        const newTodos = [data, ...todos];
        setTodos(newTodos);
      })
      .catch(err => {
        throw err;
      });
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
        console.log(data);
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

  // update api to mark todo complete and then delete it from DB
  const completeTodo = (index) => {
    const todoToDelete = todos[index];
    const url = `https://eupvcmbvv6.execute-api.us-east-2.amazonaws.com/notes-api/add?id=${todoToDelete.id}`;

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log("removed todo: " + todoToDelete.text);

      })
      .catch(err => {
        throw err;
      });

    removeTodo(index);
  };

  // removes todos locally without making another GET request
  const removeTodo = (index) => {
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