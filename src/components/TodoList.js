import React from "react";
import axios from "axios";

function TodoList({ todos, fetchTodos }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      fetchTodos(); // Refresh tasks
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        todos.map((todo) => (
          <li key={todo._id} style={{ marginBottom: "10px" }}>
            {todo.task}
            <button onClick={() => handleDelete(todo._id)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </li>
        ))
      )}
    </ul>
  );
}

export default TodoList;
