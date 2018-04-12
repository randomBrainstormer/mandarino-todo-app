
const todos = (state = {todos: []}, action) => {
  // console.log('state in reducer', state, action);
  switch (action.type) {
    case 'ADD_TODO':
      return {...state, todos: [...state.todos, action.todo ]};
    case 'TODOS_UPDATE_SUCCESS':
      return {...state, todos: action.todos};
    case 'TODOS_DELETE_SUCCESS':
      console.log('filtering id', action.id);
      return {...state, todos: state.todos.map(todo => todo.id === action.id ? action.todo : todo)};
    default:
      return state
    }
  }
  
let user = JSON.parse(localStorage.getItem('mandarino-user'));
const authInitialState = user ? { loggedIn: true, user, snackOpen: false } : {loggedIn: false, snackOpen: false};

const login = (state = authInitialState, action) => {
  switch (action.type) {
    case 'USERS_LOGIN_SUCCESS':
      return {...state, loggedIn: true, user: action.user };
    case 'USERS_LOGIN_FAILURE':
      return {snackOpen: true};
    case 'USERS_LOGIN_SNACK_CLOSE':
      return {snackOpen: false};
    case 'USERS_LOGOUT':
      return {};    
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
  login,
};