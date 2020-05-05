import React, { useState } from 'react';
import TodoForm  from './components/TodoForm/TodoForm'
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  const [todos, setTodos] = useState([]);
  const onAddTag = (tag) => {

  };

  return (
    <div className="App">
      <h1>To do </h1>
      <TodoForm onAddTag={onAddTag} />
    </div>
  );
}

export default App;
