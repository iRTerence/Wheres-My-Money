import axios from 'axios';
import React, { Component } from 'react';
import tokenService from '../../utils/tokenService'


const baseUrl = "/api/transactions/"

const authAxios = axios.create ({
    baseURL: baseUrl,
    headers: {
        Authorization: `Bearer ${tokenService.getToken()}`
    }

})

class TransactionItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            isEditing: false,
            item: "",
            price: "",
            category: "",
        }
    }

    handleRemove = () => {
        this.props.remove(this.props.id)
    }
    toggleForm = () => {
        this.setState({ isEditing: !this.state.isEditing })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleUpdate = (e) => {
        e.preventDefault()
        let transaction =  {
            item: this.state.item,
            price: this.state.price,
            category: this.state.category,
        }

        this.props.update(this.props.id, this.state.transaction)
        this.setState({ isEditing: false })


        authAxios.put(this.props.id, transaction)      
        .then((res) => {
            console.log(res.data)
            console.log('Transaction successfully updated')
          }).catch((error) => {
            console.log(error)
          })


    }



    render() {
        let result;
        if(this.state.isEditing) {
            result = (
                <div>
                    <form onSubmit={this.handleUpdate}>
                    <label>Item:</label>
                    <input
                    type='text'
                    value={this.state.task}
                    placeholder="Add an Item"
                    name="item"
                    onChange={this.handleChange}
                    >
                    </input>
                    <label> Price </label>
                    <input
                    type='number'
                    min='-99999999999999999999'
                    max='999999999999999999999'
                    step='0.01'
                    value={this.state.task}
                    placeholder="Item Price"
                    name="price"
                    onChange={this.handleChange}
                    >
                    </input>
                    <select value={this.state.category} onChange={this.handleChange} name="category">
                        <option value="Housing">Housing</option>
                        <option value="Transportation">Transportation</option>
                        <option selected value="Food">Food</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Insurance">Insurance</option>
                        <option value="Health">Health</option>
                        <option selected value="Debt">Debt</option>
                        <option value="Personal">Personal Spending</option>
                        <option value="Recreation">Recreation</option>
                        <option value="Misc">Misc</option>
                    </select>
                        <button onClick={this.handleUpdate}>Save</button>
                    </form>
                </div>
            )
        } else {
            result = (
            <div>
                Item: {this.props.item.item} Price: {this.props.item.price} Category: {this.props.item.category} 
                <button onClick={this.handleRemove}>Delete</button>
                <button onClick={this.toggleForm}>Edit</button>
            </div>
            )
        }
        return result
    }
}

export default TransactionItem;
