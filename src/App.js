import React, { Component } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

class App extends Component {
  state = {
    loggedIn: true
  };

  render() {
    return (
      <div className="App">
        {this.state.loggedIn ? <DashboardPage /> : <LoginPage />}
      </div>
    );
  }
}

export default App;
