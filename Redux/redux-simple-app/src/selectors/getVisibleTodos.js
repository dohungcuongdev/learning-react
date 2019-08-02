import { createSelector } from 'reselect'

const getVisibilityFilter = (state) => state.visibilityFilter;
const getTodos = (state) => state.todos;

export const getVisibleTodos = createSelector(
  [ getVisibilityFilter, getTodos ],
  (visibilityFilter, todos) => { // only trigger if visibilityFilter or todos changed
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos;
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed);
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed);
      default:
        return todos;
    }
  }
)

export default getVisibleTodos