import React, { Component } from 'react';
import './TodoListPage.css';
import { List, ListItem, ListItemText, Checkbox, Icon,
TextField, AppBar, Toolbar, Button} from 'material-ui';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import TodoItem from './TodoItem';

class TodoListPage extends Component {

  componentDidMount() {
    this.props.getTodosAction(this.props.match.params.id);
  }

  handleLogin = () => {
    console.log('Loging in....');
  }

  handleAddTodo = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    data.append('listId', this.props.match.params.id);

    this.props.addToDoAction(data);

    event.target.reset();
  }
  
  handleTodoComplete = (e) => {
    console.log(e.target);
  }

  render() {
    return (
      <div className="TodoListPage">
        <AppBar position="static" color="default">
          <Toolbar className="Dashboard-toolbar">
            <Link to="/"><Icon>arrow_back</Icon></Link>
            <h2>TO-DO APP</h2>
          </Toolbar>
        </AppBar>
        <div className="TodoListPage-add">
          <Icon className="TodoListPage-add-icon">add</Icon>
          <form className="TodoListPage-form" onSubmit={this.handleAddTodo}>
            <TextField className="TodoListPage-add-input" name="name" id="input-with-icon-grid" label="Aggiungi un To-Do" />
            <Button className="TodoListPage-add-btn" color="primary" type="submit">Add</Button>
          </form>
        </div>
        <List>
          {
            this.props.todos.map((todo, i) => <TodoItem item={todo} key={`${i}-${todo.id}`} unmountOnExit index={i}/> )
          }          
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.login.user,
  todos: state.todos.todos.filter(item => Number(item.listId) === Number(ownProps.match.params.id)),
  listId: state.router.location.pathname,
  auth: state.login.loggedIn
});

const mapDispatchToProps = (dispatch) => ({
  addToDoAction: data => {
    fetch('/api/add-todo', { method: 'POST', body: data })
    .then(res => res.json())
    .then(json => {
      if (json.length > 0) {
        dispatch({ type: 'ADD_TODO', todo: json[0] });
      }
      else {
        dispatch({ type: 'REQUEST_FAILURE', json });
      }
    })
    .catch(error => dispatch({ type: 'TODOS_ADD_FAILURE', error }));
  },
  getTodosAction: listId => {
    fetch(`/api/todos?listId=${listId}`)
    .then(res => res.json())
    .then(json => dispatch({ type: 'TODOS_UPDATE_SUCCESS', todos: json }))
    .catch(error => dispatch({ type: 'REQUEST_FAILURE', error }));
  },
  deleteTodoAction: todo => {
    fetch(`/api/deleteTodo?todoId=${todo.todoId}&listId=${todo.listId}`, { method: 'delete'})
    .then(json => dispatch({ type: 'TODOS_DELETE_SUCCESS', id:todo.todoId }))
    .catch(error => dispatch({ type: 'REQUEST_FAILURE', error }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
 )(TodoListPage);
