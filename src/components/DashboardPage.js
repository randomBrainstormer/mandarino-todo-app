import React, { Component } from 'react';
import { AppBar, Toolbar, ListItem, List, ListItemText, Grid, Button,
  Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField, 
  ListItemIcon, Icon} from 'material-ui';
import AddIcon from 'material-ui-icons/Add';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import './DashboardPage.css';

class DashboardPage extends Component {
  state = {
    open: false,
  };

  componentDidMount(){
    this.props.getListsAction(this.props.userId);
  }

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
    data.append('userId', this.props.userId);
    
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
          this.props.lists.map((list, i) => (
            <Link key={list.id} className="DashboardPage-list" to={`/list/${list.id}`}>
              <ListItem key={list.id} button>
                <ListItemIcon>
                  <Icon>list</Icon>
                </ListItemIcon>
                <ListItemText primary={list.name} />
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
                  name="name"
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

const mapStateToProps = (state) => ({
  userId: state.login.userId,
  lists: state.lists.lists
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addListAction: data => {
    fetch('/api/add-list', { method: 'POST', body: data })
    .then(res => res.json())
    .then(json => {
      if (json.length > 0) {
        dispatch({ type: 'LISTS_ADD_SUCCESS', list: json[0] });
      }
      else {
        dispatch({ type: 'REQUEST_FAILURE', json });
      }
    })
    .catch(error => dispatch({ type: 'LIST_ADD_FAILURE', error }));
  },
  getListsAction: userId => {
    fetch(`/api/lists?userId=${userId}`)
    .then(res => res.json())
    .then(json => dispatch({ type: 'LISTS_UPDATE_SUCCESS', lists: json }))
    .catch(error => dispatch({ type: 'REQUEST_FAILURE', error }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
 )(DashboardPage);