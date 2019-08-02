/*
Container Components

Technically, a container component is just a React component that uses store.subscribe() to read a part of the Redux state tree and supply props to a presentational component it renders. You could write a container component by hand, but we suggest instead generating container components with the React Redux library's connect() function, which provides many useful optimizations to prevent unnecessary re-renders. (One result of this is that you shouldn't have to worry about the React performance suggestion of implementing shouldComponentUpdate yourself.)
To use connect(), you need to define a special function called mapStateToProps that describes how to transform the current Redux store state into the props you want to pass to a presentational component you are wrapping. 
*/

import React from 'react';
import { addTodo, addTodoOffline } from '../actions/todos';
import { connect } from 'react-redux';

// Once you have connected your component in this way, your component receives props.dispatch. You may use it to dispatch actions to the store.
const AddTodo = ({ children, dispatch, isOnlineMode }) => {
  let inputUserId, inputTitle;
  return (
    <div>
      <h3>{children}</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!inputUserId.value.trim() || !inputTitle.value.trim()) {
            return;
          }
          if (isOnlineMode) {
            dispatch(addTodo(inputUserId.value, inputTitle.value));
          } else {
            dispatch(addTodoOffline(inputUserId.value, inputTitle.value));
          }
          inputUserId.value = '';
          inputTitle.value = '';
        }}
      >
        <p>Input UserID</p><input ref={node => (inputUserId = node)} />
        <p>Input Title</p><input ref={node => (inputTitle = node)} />
        <br /><br /><button type="submit">Add Todo</button>
      </form>
    </div>
  )
}

// like mapGetters in Vuex
const mapStateToProps = (state) => {
  return { isOnlineMode: state.isOnlineMode };
}

export default connect(mapStateToProps)(AddTodo)