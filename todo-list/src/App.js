import React from 'react';
import TodoForm  from './components/TodoForm/TodoForm'
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  return (
    <div className="App">
      <h1>To do </h1>
      <TodoForm test={"test"} />
    </div>
  );
}

export default App;
