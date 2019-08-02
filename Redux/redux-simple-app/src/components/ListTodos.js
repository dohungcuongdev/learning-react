import React, { useEffect } from "react";
import ToggleCompleteTodoButton from '../containers/ToggleCompleteTodoButton';
import RemoveTodoButton from '../containers/RemoveTodoButton';

// mapStateToProps will map todos to component's prop
function ListTodos({ children, todos, isOnlineMode, getTodosOnline, clearTodos }) {
    useEffect(() => {
        // componentDidMount
        /*if (isOnlineMode) {
            getTodosOnline();
        }*/

        // returned function will be called on component unmount 
        return () => {
            // componentWillUnmount
            clearTodos();
        }
    }, [clearTodos])
    useEffect(() => {
        // componentDidUpdated when isOnlineMode changed
        if (isOnlineMode) {
            getTodosOnline();
        }
    }, [isOnlineMode, getTodosOnline])
    return (
        <div>
            <h3>{children}</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UserID</th>
                        <th>Title</th>
                        <th>Completed</th>
                        <th>Toggle Completed</th>
                        <th>Remove Todo</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => {
                        return (
                            <tr key={todo.id}>
                                <td>{todo.id}</td>
                                <td>{todo.userId}</td>
                                <td>{todo.title}</td>
                                <td>{todo.completed.toString()}</td>
                                <ToggleCompleteTodoButton todo={todo} />
                                <RemoveTodoButton todoId={todo.id} />
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ListTodos