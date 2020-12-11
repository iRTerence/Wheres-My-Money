import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TransactionItem from '../../components/TransactionItem/TransactionItem'
import TransactionForm from '../../components/TransactionForm/TransactionForm'
import BudgetForm from '../../components/BudgetForm/BudgetForm'
import Chartjs from '../../components/Chartjs/Chartjs'
import axios from 'axios';
import tokenService from '../../utils/tokenService'
import './Transaction.css';
import Loader from "react-loader-spinner";


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
            isLoading: true,
            
        }

    }



    remove = (id) => {
      authAxios.delete(id)
      .then(res=>console.log(res.data))      
        this.setState({
            transaction: this.state.transaction.filter(t => t._id !== id)
        })
    }


    update = async (updatedTransaction) => {
        this.setState({ transaction: updatedTransaction})
    }

    create = (newTransaction) => {
        this.setState((prevState) => {
           return {transaction: [ ...prevState.transaction, newTransaction]}
        })
    }



    generateCategorySum = () => {
      var sums = {}, obj, i;
      for (i = 0; i < this.state.transaction.length; i++){
          obj = this.state.transaction[i];
          if (!sums[obj.category]) {
              sums[obj.category] = 0;
          }
          sums[obj.category] += +obj.price;
      }
      return sums
    }

    componentWillMount = async () => {
       let x = await authAxios.get()
          this.setState({transaction: x.data.transactions,
          isLoading: false})


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
                handleExpenseUpdate={this.props.handleExpenseUpdate} 
                transactions={this.state.transaction}

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
  {this.state.isLoading
  ? <Loader type="Puff" color="#00BFFF" height="800" width="800" />
  :<div class="row">
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
        </ul>
      </div>
    </nav>
            
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Where is your money?</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
            <span data-feather="calendar"></span>
            This Month
          </button>
        </div>
      </div>
      {/* <BudgetForm handleBudget={this.props.handleBudget}/> */}
      <Chartjs 
        transactions={this.state.transaction}
        budget={this.props.budget}
        expense={this.props.expense}
        category={this.generateCategorySum()}
        rerender={this.generateCategorySum}
      />
      <canvas class="my-4 w-100" id="myChart" width="1000" height="0">
        
      </canvas>
      
     <TransactionForm 
     create={this.create} 
     user={this.props.user} 
     handleExpenseUpdate={this.props.handleExpenseUpdate} 
     transactions={this.state.transaction}
     />
      <h2>Transactions</h2>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Category</th>
              <th>Date</th>
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
    }
</div>

        </div>
        );
    }
}

export default Transaction;