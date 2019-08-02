import React from "react";
import { produce } from 'immer';

import { todosReducer } from './reducers/todosReducer';

import Form from "./forms/TodoForm";

function useImmerReducer(reducer, initialState) {
  return React.useReducer(produce(reducer), initialState)
};

export default () => {
  const [todos, dispatch] = useImmerReducer(todosReducer, []);

  return (
    <div className="App">
      <p>Input Todo and Submit</p>
      <Form dispatch={dispatch} />
      <p>List Todos</p>
      <div>
        {todos.map(({ text, complete }, i) => (
          <div
            key={text}
            style={{
              textDecoration: complete ? "" : "line-through"
            }}
          >
            {text}
            <button 
              style={{
                marginLeft: '10px'
              }}
              onClick={() => dispatch({ type: "TOGGLE_COMPLETE", i })}>{complete ? "Complete":"Rework"}</button>
          </div>
        ))}
      </div>
      <button onClick={() => dispatch({ type: "RESET" })}>reset</button>
    </div>
  );
};