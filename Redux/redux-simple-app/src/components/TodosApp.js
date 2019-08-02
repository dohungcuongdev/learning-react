import React from 'react';
import AddTodo from '../containers/AddTodo';
import ListVisibleTodos from '../containers/ListVisibleTodos';
import ChangeMode from '../containers/ChangeMode';
import FilterTodos from '../containers/FilterTodos';

function TodosApp() {
  return (
    <div className="Todos">
      <h2>Hello from Todos App</h2>
      <ChangeMode/>
      <hr/>
      <AddTodo>Add Todo</AddTodo>
      <hr/>
      <ListVisibleTodos>List Todos</ListVisibleTodos>
      <hr/>
      <FilterTodos/>
    </div>
  );
}

export default TodosApp;
