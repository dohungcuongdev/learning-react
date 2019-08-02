import axios from 'axios';

// This file is similar to actions in Vuex

const API_HOST = 'http://localhost:8081'
const API_ENDPOINT = 'todos';
let apiHost = (API_HOST.charAt(API_HOST.length - 1) === '/') ? API_HOST : API_HOST + '/';
let apiEndpoint = (API_ENDPOINT.charAt(API_HOST.length - 1) === '/') ? API_ENDPOINT : API_ENDPOINT + '/';
const API_URL = apiHost + apiEndpoint;

var todoIDOflineAutoIncrement = 0;

export const addTodo = (userId, title) => {
  const todo = {
    userId,
    title,
    completed: false
  }
  return dispatch => {
    axios.post(API_URL, todo)
      .then((response) => {
        console.log(response);
        dispatch(commitAddTodo(response.data));
        ++todoIDOflineAutoIncrement; // sync offline
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

export const addTodoOffline = (userId, title) => {
  const todo = {
    id: ++todoIDOflineAutoIncrement,
    userId,
    title,
    completed: false
  }
  return dispatch => dispatch(commitAddTodo(todo));
}

export const commitAddTodo = todo => {
  return {
    type: "ADD_TODO",
    todo
  }
}

export const getTodosOnline = () => {
  return dispatch => {
    axios.get(API_URL)
      .then((response) => {
        console.log(response);
        dispatch(syncTodos(response.data));
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

export const syncTodos = todos => {
  let maxid = 0;
  todos.forEach(todo => {
    if (todo.id > maxid) {
      maxid = todo.id;
    }
  });
  todoIDOflineAutoIncrement = maxid;
  return dispatch => dispatch(commitSetTodos(todos));
}

export const commitSetTodos = todos => {
  return {
    type: "SET_TODOS",
    todos
  }
}

export const toggleTodoCompletion = todo => {
  const newTodo = { ...todo, completed: !todo.completed };
  return dispatch => {
    axios.put(API_URL + todo.id, newTodo)
      .then((response) => {
        console.log(response);
        dispatch(commitToggleTodoCompletion(response.data));
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

export const commitToggleTodoCompletion = todo => {
  return {
    type: "TOGGLE_COMPLETION",
    todo
  }
}

export const removeTodo = id => {
  return dispatch => {
    axios.delete(API_URL + id)
      .then((response) => {
        console.log(response);
        dispatch(commitRemoveTodo(id));
        if (id === todoIDOflineAutoIncrement) { // sync offline
          --todoIDOflineAutoIncrement;
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

export const removeTodoOffline = id => {
  if (id === todoIDOflineAutoIncrement) {
    --todoIDOflineAutoIncrement;
  }
  return dispatch => dispatch(commitRemoveTodo(id));
}

export const commitRemoveTodo = id => {
  return {
    type: "REMOVE_TODO",
    id
  }
}

export const clearTodos = () => {
  todoIDOflineAutoIncrement = 0;
  return {
    type: "CLEAR_TODOS"
  }
}