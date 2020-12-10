import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './LoginPage.css';
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
      this.props.history.push('/');
    } catch (err) {
      alert('Invalid Credentials!');
    }
  }

  render() {
    return (
      <>
      <div className="LoginPage">
        <header className="header-footer">Log In</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <div className="col-sm-12">
              <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default">Log In</button>&nbsp;&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
      <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
				<form className="login100-form validate-form flex-sb flex-w"
        onSubmit={this.handleSubmit}>
					<span className="login100-form-title p-b-32 text-center">
						Account Login
					</span>

					<span className="txt1 p-b-11">
						Username
					</span>
					<div className="wrap-input100 validate-input m-b-36" data-validate = "Username is required">
						<input className="input100"  
             type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange}
            
            />
						<span className="focus-input100"></span>
					</div>
					
					<span className="txt1 p-b-11">
						Password
					</span>
					<div className="wrap-input100 validate-input m-b-12" data-validate = "Password is required">
						<span className="btn-show-pass">
							<i className="fa fa-eye"></i>
						</span>
						<input 
            type="password" className="form-control input100" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} />
						<span className="focus-input100"></span>
					</div>
					

					<div className="container-login100-form-btn text-center">
						<button className="login100-form-btn text-center" >
							Login
						</button>
					</div>
          <Link to='/'>Cancel</Link>


				</form>
			</div>
		</div>
	</div>
	
</>
    );
  }
}

export default LoginPage;
