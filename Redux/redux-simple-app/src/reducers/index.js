import { combineReducers } from 'redux'
import todos from './todos'
import isOnlineMode from './isOnlineMode'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
  todos,
  isOnlineMode,
  visibilityFilter
  // other reducers
})