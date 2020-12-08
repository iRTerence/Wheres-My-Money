import React, { Component } from 'react';
import axios from 'axios'
import tokenService from '../../utils/tokenService'

const baseUrl = "/api/transactions/"

const authAxios = axios.create ({
    baseURL: baseUrl,
    headers: {
        Authorization: `Bearer ${tokenService.getToken()}`
    }

})

class TransactionForm extends Component {
    constructor(props){
        super(props)
        this.state = { 
            item: "",
            price: 0,
            category: "",

         }
    }
    componentDidMount() {
        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.create(this.state)
        authAxios.post("add", this.state)
            .then(res => console.log(res.user))
            .catch(function (error) {
                console.log(error)
            })

        this.setState({ item : "", price: 0 })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
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
                    min='0.01'
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
                <button>Add</button>

                </form>
                
            </div>
        );
    }
}

export default TransactionForm;