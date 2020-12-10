import './App.css';
import axios from 'axios';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage'
import userService from '../../utils/userService';
import NavBar from '../../components/NavBar/NavBar'
import LoginPage from '../LoginPage/LoginPage'
import HomePage from '../HomePage/HomePage'
import Transaction from '../Transaction/Transaction.jsx'
import tokenService from '../../utils/tokenService'


const baseUrl = "/api/transactions/"
const authAxios = axios.create ({
    baseURL: baseUrl,
    headers: {
        Authorization: `Bearer ${tokenService.getToken()}`
    }

})

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      expenses: 0,
      budget: 0,
      
    };
  }

  submitBudget = (incBudget) => { 
    this.setState({budget: incBudget})
  }

  updateExpense = (updateExpense) => {
    this.setState({expenses: updateExpense})
  }

  componentDidMount =  () => {
    authAxios.get("budgetandexpense")
   .then(response => {
     let totalExpense = 0
     response.data.user.account.transaction.forEach(element => 
      totalExpense = element.price + totalExpense,
      )

       this.setState({
         expenses: totalExpense,
         budget: response.data.user.account.Budget,

      })
   })
   .catch (function (e) {
       console.log(e)
   })
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
      <NavBar handleLogout={this.handleLogout} user={this.state.user}/>

          <Route exact path='/' render={({ history }) => 
            <HomePage
              history={history}
            />
          }/>
          <Route exact path='/transactions' render={({ history }) => 
            <Transaction
              history={history}
              user={this.state.user}
              handleBudget={this.submitBudget}
              handleExpenseUpdate={this.updateExpense}
            />
          }/>
          <Route exact path='/signup' render={({ history }) => 
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
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


