import React, { Component } from 'react';
import './LoginPage.css';
import { TextField, Paper, Button } from 'material-ui';

class LoginPage extends Component {

  handleLogin = () => {
    console.log('Loging in....');
  }
  
  render() {
    return (
      <div className="LoginPage">
        <Paper className="input-wrapper">
          <h2>Accedi</h2>
          <TextField 
            label={"Email"} 
            className="input-field"
          />
          <TextField 
            label={"Password"} 
            type="password" 
            className="input-field"
          />
          <a href="#" className="pw-link">Password dimenticata?</a>
          <Button 
            variant="raised" 
            color="secondary" 
            className="input-button"
            onClick={this.handleLogin}
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
        </Paper>
      </div>
    );
  }
}

export default LoginPage;
