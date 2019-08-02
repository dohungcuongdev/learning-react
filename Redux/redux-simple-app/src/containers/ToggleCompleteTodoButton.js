import React from 'react';
import { toggleTodoCompletion } from '../actions/todos';
import { connect, useStore } from 'react-redux';

function ToggleCompleteTodoButton({ todo, dispatch }) {
    const store = useStore(); // This hook should probably not be used frequently. Prefer useSelector() as your primary choice. However, this may be useful for less common scenarios that do require access to the store, such as replacing reducers.
    const state = store.getState();
    const isOnlineMode = state.isOnlineMode;
    return (
        <td><button onClick={() => {
            if(isOnlineMode) {
                dispatch(toggleTodoCompletion(todo));
            } else {
                dispatch({type:'TOGGLE_COMPLETION_OFFLINE', id: todo.id});
            }
        }}>{todo.completed?'Rework Todo':'Complete Todo'}</button></td>
    );
}

export default connect()(ToggleCompleteTodoButton)