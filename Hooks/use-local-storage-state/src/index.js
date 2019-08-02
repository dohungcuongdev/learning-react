import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import './style.css';
import Todo from './Todo.jsx'

function useLocalStorageState(key, defaultValue) {
  const [state, setState] = useState(() => {
    let value
    try {
      value = JSON.parse(
        window.localStorage.getItem(key) || JSON.stringify(defaultValue)
      )
    } catch (e) {
      value = defaultValue;
    }
    return value;
  })

  useEffect(() => {
    window.localStorage.setItem('my-app-count', state);
  }, [state])

  return [state, setState];
}

function App() {
  const [count, setCount] = useLocalStorageState('my-app-count', 0);
  return (
    <>
      <button onClick={() => setCount(0)}>clear</button>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <hr/>
      <Todo />
    </>

  );
}

render(<App />, document.getElementById('root'));
