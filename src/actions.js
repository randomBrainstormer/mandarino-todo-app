let nextTodoId = 0
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

// export const loginAction = (data) => {
//   return dispatch => {
//     fetch('/api/login', { method: 'POST', body: data })
//       .then(res => res.json())
//       .then(json => {
//         if (json.length > 0) {
//           console.log('sucess.. dispatching USERS_LOGIN_SUCESS')
//           dispatch({ type: 'USERS_LOGIN_SUCCESS', user: json[0] });
//         }
//         else {
//           dispatch({ type: 'USERS_LOGIN_FAILURE', json });
//         }
//       })
//       .catch(error => dispatch({ type: 'USERS_LOGIN_FAILURE', error }));
//   }
// }


// export const colorB = (state = 'green', action = null) => {
//   const {type, payload} = action;
//   switch (type) {
//     case 'myActionName_UpdateColor':
//       return payload;
//     default:
//       return state;
//   }
//  }