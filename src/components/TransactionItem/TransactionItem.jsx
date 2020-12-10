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
            item: this.props.item.item,
            price: this.props.item.price,
            category: this.props.item.category
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

    handleUpdate = async (e) => {
        e.preventDefault()
        let totalExpense = 0
        let transaction =  {
            item: this.state.item,
            price: this.state.price,
            category: this.state.category,
        }

        this.setState({ isEditing: false })


       authAxios.put(this.props.id, transaction)      
        .then((res) => {
            this.props.update(res.data.account.transaction)

            this.props.transactions.forEach(element => 
                totalExpense = parseInt(element.price) + parseInt(totalExpense),
                )
                console.log(totalExpense)
           
                this.props.handleExpenseUpdate(totalExpense)
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
                    value={this.state.item}
                    placeholder="Add an Item"
                    name="item"
                    onChange={this.handleChange}
                    class = "form-control"
                    >
                    </input>
                    <label> Price </label>
                    <input
                    type='number'
                    min='-99999999999999999999'
                    max='999999999999999999999'
                    step='0.01'
                    value={this.state.price}
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
            <>

            <tr>
              <td>{this.props.item.item}</td>
              <td>{this.props.item.price}</td>
              <td>{this.props.item.category}</td>
              <td>{this.props.item.date}</td>
              <td><button onClick={this.handleRemove}>Delete</button></td>
              <td><button onClick={this.toggleForm}>Edit</button></td>
            </tr>


                

            </>
            )
        }
        return result
    }
}

export default TransactionItem;
