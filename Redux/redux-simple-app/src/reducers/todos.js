// This file is similar to mutations in Vuex

const todosInitialState = [];

const todos = (state = todosInitialState, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      // the new todos is equals to parameter todos
      return action.todos;
    case 'ADD_TODO':
      // The new todos is equal to the old todos concatenated with a single new item at the end
      return [
        ...state,
        action.todo
      ]
    case "TOGGLE_COMPLETION":
      return state.map(todo =>
        todo.id === action.todo.id ? action.todo : todo
      );
    case "TOGGLE_COMPLETION_OFFLINE":
      console.log(action.id)
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "REMOVE_TODO":
      return state.filter(todo => todo.id !== action.id);
    case "CLEAR_TODOS":
      return todosInitialState;
    default:
      return state
  }
}

export default todos