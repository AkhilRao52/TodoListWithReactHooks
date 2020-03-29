import React, { useState } from 'react';
import './App.css';


function Todo({todo,index,completeTodo,IncompleteTodo,deleteTodo}) {

  let handleOnClick = () => {
    if(todo.completed){
      IncompleteTodo(index)
    } else {
      completeTodo(index)
    }
  }

  return (
      <div className={'todo'}
        style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
        {todo.text}
        <button onClick={handleOnClick}>
          { todo.completed ? 'Incomplete' : 'complete'}
        </button>
        <button onClick={() => deleteTodo(index)}>
          delete
        </button>
      </div>
  )
}

function TodoForm({addTodo}) {
  const [value, setValue] = useState('');

  let handleSubmit = e => {
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue('')
  }

  let handleChange = (e) => {
      setValue(e.target.value);
  }

  return (
      <form onSubmit={handleSubmit}>
        <input type = "text" className={"input"} value={value} onChange={ e => handleChange(e)}/>
      </form>
  )
}

function App() {

  const [todos, setTodos] = useState([
      {
        text:'Learn React Hooks',
        completed: true
      },
      {
        text:'Do your jira tasks',
        completed: false
      }
  ])

  let addTodo = text => {
    const newTodos = [...todos, {text}];
    setTodos(newTodos)
  };

  let completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].completed = true;
    setTodos(newTodos)
  }

  let IncompleteTodo = index => {
    const newTodos = [...todos];
    newTodos[index].completed = false;
    setTodos(newTodos)
  }

  let deleteTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index,1);
    setTodos(newTodos)
  }

  return (
    <div className={'app'}>
      <div>
        {todos.map((todo,index) =>
            <Todo key={index} index={index} todo={todo}
                  completeTodo={completeTodo}
                  IncompleteTodo={IncompleteTodo}
                  deleteTodo={deleteTodo}
            />
        )}
      </div>
        <TodoForm addTodo={addTodo}/>
    </div>
  );
}

export default App;
