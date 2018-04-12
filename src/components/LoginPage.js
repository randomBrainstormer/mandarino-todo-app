import React, { Component } from 'react';
import './LoginPage.css';
import { connect } from 'react-redux';
import { TextField, Paper, Button } from 'material-ui';
// import { loginAction } from '../actions';

class LoginPage extends Component {
  handleLogin = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    this.props.loginAction(data);
  }
  
  render() {
    return (
      <div className="LoginPage">
        <Paper className="input-wrapper">
          <h2>Accedi</h2>
          <form className="input-wrapper-form" onSubmit={this.handleLogin}>
            <TextField 
              label={"Email"} 
              name="email"
              className="input-field"
            />
            <TextField 
              label={"Password"} 
              type="password" 
              name="password"
              className="input-field"
            />
            <a href="#" className="pw-link">Password dimenticata?</a>
            <Button 
              variant="raised" 
              color="secondary" 
              className="input-button"
              type="submit"
              >
                Login
            </Button>
            <Button 
              variant="raised" 
              color="secondary" 
              className="input-button"
              disabled={true}
              >
                Registrati
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  // loginAction
  loginAction: data => {
    fetch('/api/login', { method: 'POST', body: data })
    .then(res => res.json())
    .then(json => {
      if (json.length > 0) {
        localStorage.setItem('mandarino-user', JSON.stringify(json[0]));
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
 )(LoginPage);