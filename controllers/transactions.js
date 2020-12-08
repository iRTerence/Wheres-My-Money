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
    // User.update({_id: ObjectId(req.user._id)}, 
    // {$pull: {account: {_id: ObjectId(req.params.id )}}})


    // let x = await Transaction.findByIdAndRemove(req.params.id)
    // .then(() => res.json("Event deleted!"))
    // .catch(err => res.status(400).json('Error: ' + err));
    // console.log('This is response' + x)

  let x = await User.findOneAndUpdate({_id: req.user._id}, {
          account: { 
              $pull: {
            transaction: {_id: req.params.id}
          }
  }});
      console.log(x)
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
  };