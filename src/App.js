import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

/**
 * Questo componente sarebbe il placeholder dove si verifica qualche 
 * token/cookies dall utente. Per fine di demo, default loggin = false.
 */
class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.loggedIn ? <DashboardPage /> : <LoginPage />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn,
  }
};

export default connect(
  mapStateToProps,
  null
 )(App);
