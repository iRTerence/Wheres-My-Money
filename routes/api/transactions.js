const express = require('express');
const router = express.Router();
const Transaction = require('../../models/user');
const transactionCtrl = require('../../controllers/transactions');
const auth = require('../../config/auth')

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.get('/', transactionCtrl.showTransaction);
router.post('/add', transactionCtrl.addTransaction);
router.delete('/:id', transactionCtrl.deleteTransaction);
router.put('/:id', transactionCtrl.updateTransaction);



module.exports = router;
function isLoggedIn(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'NOT AUTHORIZED!!' });
  }