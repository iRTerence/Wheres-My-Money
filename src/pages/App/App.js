import './App.css';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage'
import userService from '../../utils/userService';
import NavBar from '../../components/NavBar/NavBar'
import LoginPage from '../LoginPage/LoginPage'

class App extends Component {
  constructor() {
    super();
    this.state = {user: userService.getUser()};
  }


  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  render() {
    return (
      <div className="App">
          <Route exact path='/signup' render={({ history }) => 
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
          <NavBar handleLogout={this.handleLogout} user={this.state.user}/>
          <Route exact path='/login' render={({ history }) => 
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
      </div>
   );
  }
}

export default App;


