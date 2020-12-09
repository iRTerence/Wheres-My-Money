const express = require('express');
const router = express.Router();
const Transaction = require('../../models/user');
const transactionCtrl = require('../../controllers/transactions');
const auth = require('../../config/auth')

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.get('/', transactionCtrl.showTransaction);
router.post('/add', transactionCtrl.addTransaction);
router.post('/budget', transactionCtrl.addBudget);
router.delete('/:id', transactionCtrl.deleteTransaction);
router.put('/:id', transactionCtrl.updateTransaction);
router.get('/budgetandexpense', transactionCtrl.showBudgetAndExpense);




module.exports = router;
function isLoggedIn(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'NOT AUTHORIZED!!' });
  }