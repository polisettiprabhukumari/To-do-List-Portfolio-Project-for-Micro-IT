import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the todos!', error);
      });
  }, []);

  const addTodo = () => {
    if (newTodo) {
      axios.post('http://localhost:5000/api/todos', { text: newTodo })
        .then((response) => {
          setTodos([...todos, response.data]);
          setNewTodo('');
        })
        .catch((error) => {
          console.error('There was an error adding the todo!', error);
        });
    }
  };

  const toggleCompleted = (id, completed) => {
    axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !completed })
      .then(() => {
        setTodos(todos.map(todo => todo._id === id ? { ...todo, completed: !completed } : todo));
      })
      .catch((error) => {
        console.error('Error toggling completed status', error);
      });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting todo', error);
      });
  };

  return (
    <div>
      <h1>To-Do App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
              onClick={() => toggleCompleted(todo._id, todo.completed)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;