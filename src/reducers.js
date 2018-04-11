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
  switch (action.type) {
    case 'USERS_LOGIN_SUCCESS':
      return {...state, loggedIn: true, userId: action.user.id, name: action.user.name };
    default:
      return state
  }
}

const lists = (state = {lists: []}, action) => {
  switch (action.type) {
    case 'LISTS_UPDATE_SUCCESS':
    return {...state, lists: action.lists}
    case 'LISTS_ADD_SUCCESS':
      return {...state, lists: [...state.lists, action.list ]};
    case 'LISTS_DELETE_SUCCESS':
      return {...state, lists: state.lists.filter( item => Number(item.id) !== Number(action.id))};
    default:
      return state
  }
}

export default {
  todos,
  lists,
  login
  // visibilityFilter
};