import { combineReducers } from 'redux'

const todos = (state = {}, action) => {
  // console.log('state in reducer', state, action);
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      )
    default:
      return state
  }
}

const login = (state = {loggedIn: false}, action) => {
  console.log('state and action', state, action);
  switch (action.type) {
    case 'USERS_LOGIN_SUCCESS':
      return {...state, loggedIn: true, userId: action.user.id, name: action.user.name };
    default:
      return state
  }
}

export default {
  todos,
  login
  // visibilityFilter
};