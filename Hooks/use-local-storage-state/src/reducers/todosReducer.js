export const todosReducer = (todos, action) => {
  switch (action.type) {
    case "ADD_TODO":
      console.log(todos)
      todos.unshift({ text: action.text, complete: false });
      return;
    case "TOGGLE_COMPLETE":
      todos[action.i].complete = !todos[action.i].complete
      return;
    case "RESET":
      return [];
    default:
      return todos;
  }
};