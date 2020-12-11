import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import userService from '../../utils/userService';

class LoginPage extends Component {
  
  state = {
    email: '',
    pw: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(this.state);
      this.props.handleSignupOrLogin();
      this.props.history.push('/transactions');
    } catch (err) {
      alert('Invalid Credentials!');
    }
  }

  render() {
    return (
      <>



<main class="form-signin">
  <form onSubmit={this.handleSubmit}>
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
    <label htmlFor="inputEmail" class="visually-hidden">Email address</label>
    <input 
      type="email" 
      id="inputEmail" 
      required 
      autofocus
      className="form-control" 
      placeholder="Email" 
      value={this.state.email} 
      name="email" 
      onChange={this.handleChange}
      />
    <label htmlFor="inputPassword" class="visually-hidden">Password</label>
    <input 
      type="password" 
      id="inputPassword" 
      required
      className="form-control" 
      placeholder="Password" 
      value={this.state.pw} 
      name="pw" 
      onChange={this.handleChange}/>
    <div class="checkbox mb-3">
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    <Link to='/'>Cancel</Link>
  </form>
  
</main>

	
</>
    );
  }
}

export default LoginPage;
