const Transaction = require('../models/user');


function addTransaction(req, res) {
    console.log(req.body)
    let transaction = new Transaction(req.body)
    transaction.save()        
    .then(transaction => {
        res.status(200).json({'transaction': 'transaction added successfully'});
    })
    .catch(err => {
        console.log(err.message)
        res.status(400).send('adding new todo failed');
    });
};


module.exports = {
    addTransaction
  };