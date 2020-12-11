import React, { Component } from 'react';
import BudgetForm from '../../components/BudgetForm/BudgetForm'
import './HomePage.css';
import { Link } from 'react-router-dom';



class HomePage extends Component {
    state = {
        budget: 0,
        asset: 0,
    }
    
    render() {
        return (
            <>




            <div className="overlay">
            <div className="container">
            <div className="description centre" >
            <h1 className="centre">    Where is my money?</h1>  
            <p className="centre">Ever wonder where all your money is going? Sign up now so you don't have to! </p> 
            <Link to="/signup">
            <button class="btn btn-outline-secondary btn-lg">Sign Up</button>   
            </Link>
            </div>
            </div>
            </div>

            
            </>
        );
    }
}


export default HomePage;