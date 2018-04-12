import React, { Component } from 'react';
import { Zoom, ListItem, ListItemText, Checkbox} from 'material-ui';
import { connect } from 'react-redux';

class TodoItem extends Component {
  state = {
    checked: false,
  };

  handleTodoComplete = () => {
    this.setState({ checked: !this.state.checked });
    console.log(this.props.item);
    this.props.deleteTodoAction(this.props.item);
  }

  render() {
    return (
      <div className={'TodoItem'}>
        <Zoom in={!this.state.checked} style={{ transitionDelay: 250 }} unmountOnExit timeout={500}>
          <ListItem
            role={undefined}
            dense
            button
            // onClick={this.handleToggle(value)}
          >
            <Checkbox
              // checked={this.state.checked.indexOf(value) !== -1}
              tabIndex={this.state.checked ? this.props.index : this.props.index + 2}
              disableRipple
              onClick={this.handleTodoComplete}
            />
            <ListItemText primary={this.props.item.name} />
          </ListItem>
        </Zoom>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteTodoAction: todo => {
    fetch(`/api/deleteTodo?todoId=${todo.id}&listId=${todo.listId}`, { method: 'delete'})
    .then(json => dispatch({ type: 'TODOS_DELETE_SUCCESS', todo: { ...todo, completed: true } }))
    .catch(error => dispatch({ type: 'REQUEST_FAILURE', error }));
  }
});

export default connect(
  null,
  mapDispatchToProps
 )(TodoItem);
