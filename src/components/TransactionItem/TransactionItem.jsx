import React, { Component } from 'react';

class TransactionItem extends Component {
    constructor(props){
        super(props)
    }

    handleRemove = () => {
        this.props.remove(this.props.id)
    }

    render(props) {
        return (
        <div>
            Item: {this.props.item.item} Price: {this.props.item.price} Category: {this.props.item.category} 
            <button onClick={this.handleRemove}>Delete</button>
            <button>Edit</button>
        </div>
        );
    }
}

export default TransactionItem;
