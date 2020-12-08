const User = require('../models/user');
const Transaction = require('../models/user');

const mongoose = require('mongoose');

async function addTransaction(req, res) {
    User.findById(req.user._id, function(err, user) {
        user.account.transaction.push(req.body);
        user.save()
    });

}


async function deleteTransaction(req,res) {

    let user = await User.findById(req.user._id)
    console.log(user.account.transaction)
    for(i=0; i<user.account.transaction.length; i++) {
        if(user.account.transaction[i]._id == req.params.id) {
            user.account.transaction.splice(i,1)
            user.save()
            break;
        }
    console.log(user)
    }


}
    
async function updateTransaction(req,res) {
    let money = await User.findById(req.user._id)
    let x  = money.account.transaction
    objIndex = money.account.transaction.findIndex((obj => obj._id == req.params.id))
    console.log("Before update: ", money.account.transaction[objIndex])
    x[objIndex].item = req.body.item
    x[objIndex].price = req.body.price
    x[objIndex].category = req.body.category
    money.save()


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
  };