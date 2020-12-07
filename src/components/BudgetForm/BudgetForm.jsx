import React from 'react';

const BudgetForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
            <input  
                type="text"
                onChange={props.handleChange}
                name="budget"
                defaultValue={props.budget}
            > 
            </input>
            <button>x</button>
            </form>
        </div>
    );
};

export default BudgetForm;