const User = require('../models/user');
const Transaction = require('../models/user');

const mongoose = require('mongoose');

function addTransaction(req, res) {
    User.findById(req.user._id, async function(err, user) {
        user.account.transaction.push(req.body);
        let saved = await user.save()
        console.log(saved.data)
        res.send(saved)
    });

}

async function addBudget (req,res) {
  let x = await User.findById(req.user._id)
    x.account.Budget = req.body.budget
    let saved = await x.save()
    res.send(saved)
}

async function deleteTransaction(req,res) {

    let user = await User.findById(req.user._id)
    for(i=0; i<user.account.transaction.length; i++) {
        if(user.account.transaction[i]._id == req.params.id) {
            user.account.transaction.splice(i,1)
            let saved = await user.save()
            res.send(saved)
            break;
        } 
    }
        res.send('Transactionitem was not deleted')
}


    
async function updateTransaction(req,res) {
    let money = await User.findById(req.user._id)
    let x  = money.account.transaction
    objIndex = money.account.transaction.findIndex((obj => obj._id == req.params.id))
    x[objIndex].item = req.body.item
    x[objIndex].price = req.body.price
    x[objIndex].category = req.body.category
    money.save().then(user => {
        res.json(user)
    })


}

async function showBudgetAndExpense(req, res) {
    let id = req.user._id
    await User.findById(id).then(user => {
        res.json({ 
           user
        })
    })
}

async function showTransaction(req, res) {
    let id = req.user._id
    await User.findById(id).then(user => {
        res.json({ transactions: user.account.transaction })
    })
}


module.exports = {
    addTransaction,
    showTransaction,
    deleteTransaction,
    updateTransaction,
    addBudget,
    showBudgetAndExpense,
  };