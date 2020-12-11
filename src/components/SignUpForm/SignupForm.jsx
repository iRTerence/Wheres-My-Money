import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';

class SignupForm extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    passwordConf: ''
  };

  handleChange = (e) => {
    this.props.updateMessage('');
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(this.state);
      this.props.handleSignupOrLogin();
      this.props.history.push('/transactions');
    } catch (err) {
      this.props.updateMessage(err.message);
    }
  }

  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <>
      <main class="form-signin">
  <form onSubmit={this.handleSubmit}>
    <h1 class="h3 mb-3 fw-normal">Please Sign Up</h1>
    <label htmlFor="Name" class="visually-hidden">Name</label>
    <input type="text" className="form-control" placeholder="Name" value={this.state.name} name="name" onChange={this.handleChange} />
    <label htmlFor="email" class="visually-hidden">Email</label>
    <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange}/>
    <label htmlFor="password" class="visually-hidden">Password</label>
    <input type="password" className="form-control" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange}/>
    <label htmlFor="passwordconfirm" class="visually-hidden">Email</label>
    <input type="password" className="form-control" placeholder="Confirm Password" value={this.state.passwordConf} name="passwordConf" onChange={this.handleChange}/>
    <div class="checkbox mb-3">
    </div>
    <button class="w-100 btn btn-lg btn-primary" disabled={this.isFormInvalid()}>Sign in</button>
    <Link to='/'>Cancel</Link>
  </form>
  
</main>


      </>
    );
  }
}

export default SignupForm;
