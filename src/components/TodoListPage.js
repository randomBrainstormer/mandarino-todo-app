import React, { Component } from 'react';
import './TodoListPage.css';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, IconButton, Icon,
TextField, AppBar, Toolbar} from 'material-ui';
import { Link } from 'react-router-dom'; 

class TodoListPage extends Component {

  handleLogin = () => {
    console.log('Loging in....');
  }
  
  render() {
    return (
      <div className="TodoListPage">
        <AppBar position="static" color="default">
          <Toolbar className="Dashboard-toolbar">
          <Link to="/"><Icon>arrow_back</Icon></Link>
            <h2>TO-DO App</h2>
          </Toolbar>
        </AppBar>
        <div className="TodoListPage-add">
          <Icon className="TodoListPage-add-icon">add</Icon>
          <TextField className="TodoListPage-add-input" id="input-with-icon-grid" label="Aggiungi un ToDo" />
        </div>
        <List>
          <ListItem
            // key={i}
            role={undefined}
            dense
            button
            // onClick={this.handleToggle(value)}
            // className={classes.listItem}
          >
            <Checkbox
              // checked={this.state.checked.indexOf(value) !== -1}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={`Line item ${1 + 1}`} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Comments">
              <Icon>comment</Icon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    );
  }
}

export default TodoListPage;
