import React from 'react';
import { connect } from 'react-redux';

const FilterTodos = ({ dispatch }) => (
  <div>
    <span>Show: </span>
    <button onClick={() => dispatch({ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' })}>All</button>
    <button onClick={() => dispatch({ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ACTIVE' })}>Active</button>
    <button onClick={() => dispatch({ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_COMPLETED' })}>Completed</button>
  </div>
)

export default connect()(FilterTodos)