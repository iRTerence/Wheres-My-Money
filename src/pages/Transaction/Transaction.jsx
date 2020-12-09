import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TransactionItem from '../../components/TransactionItem/TransactionItem'
import TransactionForm from '../../components/TransactionForm/TransactionForm'
import BudgetForm from '../../components/BudgetForm/BudgetForm'
import axios from 'axios';
import tokenService from '../../utils/tokenService'
import './Transaction.css';




const baseUrl = "/api/transactions/"
const authAxios = axios.create ({
    baseURL: baseUrl,
    headers: {
        Authorization: `Bearer ${tokenService.getToken()}`
    }

})

class Transaction extends Component {
    constructor(props){
        super(props)
        this.state = {
            transaction: [],
            
        }

    }
    
    // componentDidUpdate = () => {
    //   authAxios.get("budgetandexpense")
    //   .then(response => {
    //     let totalExpense = 0
    //     response.data.user.account.transaction.forEach(element => 
    //      totalExpense = element.price + totalExpense,
    //      )
          
    //      this.props.handleExpenseUpdate(totalExpense)

    //   })
    // }



    remove = (id) => {
        authAxios.delete(id)
            .then(res=>console.log(res.data))      
        this.setState({
            transaction: this.state.transaction.filter(t => t._id !== id)
        })
    }

    update = (id, updatedTransaction) => {
        const updatedTransactions = this.state.transaction.map(transactions => {
            if(transactions._id == id) {
                return{...transactions, transaction: updatedTransaction}
            }
            return transactions;
        })
        console.log(updatedTransactions)
        this.setState({ transaction: updatedTransactions})
    }

    create = (newTransaction) => {
        this.setState((prevState) => {
           return {transaction: [ ...prevState.transaction, newTransaction]}
        })
    }

    componentDidMount =  () => {
         authAxios.get()
        .then(response => {
            this.setState({transaction: response.data.transactions})
        })
        .catch (function (e) {
            console.log(e)
        })
    }

    generateTransactions = () => {
        if (this.state.transaction.length > 0) {
           return this.state.transaction.map(
            transaction => {
                return <TransactionItem 
                item={transaction} 
                key={transaction._id} 
                id={transaction._id} 
                remove={this.remove}
                update={this.update}
                />  
            })
    } else {
        return []
        }
    }



    render() {
        return (
        <div>
            
<div class="container-fluid">
  <div class="row">
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <div class="nav-link " aria-current="page">
              <span data-feather="home"></span>
              <Link to="/" >Dashboard</Link> 
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#">
              <span data-feather="file"></span>
              Transaction
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="shopping-cart"></span>
              Budgets
            </a>
          </li>
        </ul>
      </div>
    </nav>
            
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Transactions</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
            <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
          </div>
          <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
            <span data-feather="calendar"></span>
            This week
          </button>
        </div>
      </div>
      <BudgetForm handleBudget={this.props.handleBudget}/>
      <canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas>
     <TransactionForm create={this.create} user={this.props.user}/>
      <h2>Transactions</h2>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Category</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
          {this.generateTransactions()}

          </tbody>
        </table>
      </div>
    </main>
  </div>
</div>

        </div>
        );
    }
}

export default Transaction;