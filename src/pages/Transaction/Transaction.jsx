import React, { Component } from 'react';
import TransactionItem from '../../components/TransactionItem/TransactionItem'
import TransactionForm from '../../components/TransactionForm/TransactionForm'



class Transaction extends Component {
    constructor(props){
        super(props)
        this.state = {
            item: []
        }
    }

    create = (newItem) => {
        this.setState({
            item: [...this.state.item, newItem]
        })
    }

    render() {
        const items = this.state.item.map(
            item => {
                return <TransactionItem item={item} />
            }
        )
        return (
        <div>
            <h1> This is working </h1>
            {items}
            <TransactionForm create={this.create}/>
        </div>
        );
    }
}

export default Transaction;