import React, { Component } from 'react';
import TransactionItem from '../../components/TransactionItem/TransactionItem'
import TransactionForm from '../../components/TransactionForm/TransactionForm'
import axios from 'axios';
import tokenService from '../../utils/tokenService'


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
    
    remove = (id) => {
        authAxios.delete(id)
            .then(res=>console.log(res.data))      
        this.setState({
            transaction: this.state.transaction.filter(t => t._id !== id)
        })
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
                return <TransactionItem item={transaction} key={transaction._id} id={transaction._id} remove={this.remove}/>  
            })
    } else {
        return []
        }
    }



    render() {
        return (
        <div>
            <h1> This is working </h1>
            {this.generateTransactions()}
            <TransactionForm create={this.create} user={this.props.user}/>
        </div>
        );
    }
}

export default Transaction;