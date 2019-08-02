import React from 'react';
import { removeTodo, removeTodoOffline } from '../actions/todos';
import { connect, useStore } from 'react-redux';

function RemoveTodoButton({ todoId, dispatch }) {
    const store = useStore(); // This hook should probably not be used frequently. Prefer useSelector() as your primary choice. However, this may be useful for less common scenarios that do require access to the store, such as replacing reducers.
    const state = store.getState();
    const isOnlineMode = state.isOnlineMode;
    return (
        <td onClick={
            () => {
                if(isOnlineMode) {
                    dispatch(removeTodo(todoId));
                }
                else {
                    dispatch(removeTodoOffline(todoId));
                }
            }
        }><button>Remove</button></td>
    );
}

export default connect()(RemoveTodoButton)