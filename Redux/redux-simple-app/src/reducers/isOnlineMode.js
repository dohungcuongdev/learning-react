// This file is similar to mutations in Vuex

const modeInitialState = false;

const isOnlineMode = (state = modeInitialState, action) => {
  switch (action.type) {
    case 'SET_MODE':
      if(action.mode === 'ONLINE')
        return true
      return false
    default:
      return state
  }
}

export default isOnlineMode