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

class BudgetForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            budget: 0,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleBudget(this.state.budget)
        authAxios.post("budget", this.state)
            .then(res => console.log(res.user))
            .catch(function (error) {
                console.log(error)
            })

        this.setState({ 
            budget: 0

        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    render() {
        return (
            <div>
            {/* <label for="budget">Budget</label> */}
            <form onSubmit={this.handleSubmit}>
            <input  
                type="number"
                onChange={this.handleChange}
                name="budget"
                min="0"
                defaultValue={this.props.budget}
                value={this.state.budget}
            > 
            </input>
            <button>Submit Budget</button>
            </form>
        </div>
        );
    }
}

export default BudgetForm;