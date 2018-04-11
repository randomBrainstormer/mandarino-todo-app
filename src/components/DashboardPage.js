import React, { Component } from 'react';
import { AppBar, Toolbar, ListItem, List, ListItemText, Grid, Button,
  Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField, 
  ListItemIcon, Icon} from 'material-ui';
import AddIcon from 'material-ui-icons/Add';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import './DashboardPage.css';

const testList = ['Home Shores', 'Work', 'Before Sunday'];

class DashboardPage extends Component {
  state = {
    open: false,
  };

  // Apertura del modal
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  // Chiusura del modal
  handleClose = () => {
    this.setState({ open: false });
  };

  handleAddList = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    data.append()
    
    this.props.addListAction(data);

    // chiudere la modal
    this.handleClose();
  }

  render() {
    return (
      <div className="DashboardPage">
        <AppBar position="static" color="default">
          <Toolbar className="Dashboard-toolbar">
            <h2>TO-DO App</h2>
          </Toolbar>
        </AppBar>
        <List component="nav">
        </List>
        {
          testList.map((list, i) => (
            <Link className="DashboardPage-list" to="/list/1">
              <ListItem key={i} button>
                <ListItemIcon>
                  <Icon>list</Icon>
                </ListItemIcon>
                <ListItemText primary={list} />
              </ListItem>
            </Link>
          ))
        }
        <Grid container wrap="wrap" spacing={16}>
          <Grid item xs>
            <Button variant="fab" color="primary" aria-label="add" className="" onClick={this.handleClickOpen}>
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={this.handleAddList}>
            <DialogTitle id="form-dialog-title">Inserisci nome lista</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Inserisci un nome per la tua lista
              </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="list-name"
                  name="list-name"
                  label="Nome Lista"
                  fullWidth
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Crea
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  addListAction: data => {
    fetch('/api/addList', { method: 'POST', body: data })
      .then(res => res.json())
      .then(json => {
        if (json.length > 0) {
          console.log('sucess.. dispatching USERS_LOGIN_SUCESS')
          dispatch({ type: 'USERS_LOGIN_SUCCESS', user: json[0] });
        }
        else {
          dispatch({ type: 'USERS_LOGIN_FAILURE', json });
        }
      })
      .catch(error => dispatch({ type: 'USERS_LOGIN_FAILURE', error }));
  }
});

export default connect(
  null,
  mapDispatchToProps
 )(DashboardPage);