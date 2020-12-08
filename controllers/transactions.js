const User = require('../models/user');


async function addTransaction(req, res) {
    let curUser = await User.findById(req.user._id)
    console.log(curUser)
    User.findById(req.user._id, function(err, user) {
        user.account.transaction.push(req.body);
        user.save()
    });

}

async function showTransaction(req, res) {
    console.log(req.user)
    let id = req.user._id
    await User.findById(id).then(user => {
        console.log(user)
        res.json({ transactions: user.account.transaction })

    })
    
}


module.exports = {
    addTransaction,
    showTransaction
  };