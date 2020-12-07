import React, { Component } from 'react';

class TransactionItem extends Component {

    render(props) {
        return (
        <div>
            Item: {this.props.item.item} Price: {this.props.item.price} Category: {this.props.item.category}
            <button>x</button><button>edit</button>
        </div>
        );
    }
}

export default TransactionItem;
