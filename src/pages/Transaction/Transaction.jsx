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
    

    create = (newTransaction) => {
        this.setState((prevState) => {
        console.log(prevState);
           return {transaction: [ ...prevState.transaction, newTransaction]}
        })
    }




    componentDidMount =  () => {
         authAxios.get()
        .then(response => {
            console.log(response)
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
                return <TransactionItem item={transaction} />  
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