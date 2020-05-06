import React, { useState } from 'react';
import TodoForm  from './components/TodoForm/TodoForm';
import TotdoList  from './components/TotdoList/TodoList';
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  const [todos, setTodos] = useState([]);
  const onAddTag = ({ title }) => {
      setTodos([...todos, title])
  };

  return (
    <div className="App">
      <h1>To do </h1>
      <TodoForm onAddTag={onAddTag} />
      <TotdoList list={todos} />
    </div>
  );
}

export default App;
