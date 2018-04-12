import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, Icon, Button } from 'material-ui';
import { Link, Redirect } from 'react-router-dom'; 
import './Header.css';

class Header extends Component {
  handleLogout = () => {
    localStorage.removeItem('mandarino-user');
    this.props.logOutAction();
  }

  render() {
    return (
      <AppBar position="static" color="default">
        {!this.props.auth && <Redirect to="/" />}
        <Toolbar className="Header-toolbar">
          <div className="Header-toolbar-left">
            {this.props.link && <Link to={this.props.link}><Icon>arrow_back</Icon></Link>}
          </div>            
          <h2 className="Header-toolbar-center">TO-DO App</h2>
          <div className="Header-toolbar-right">
            {this.props.user && `Ciao ${this.props.user.name}`}
            <Button onClick={this.handleLogout}>
              <Icon>exit_to_app</Icon>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.login.user,
  auth: state.login.loggedIn
});

const mapDispatchToProps = (dispatch) => ({
  logOutAction: () => dispatch({ type: 'USERS_LOGOUT' })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
 )(Header);
