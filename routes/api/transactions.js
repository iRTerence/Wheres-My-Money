const express = require('express');
const router = express.Router();
const Transaction = require('../../models/user');
const transactionCtrl = require('../../controllers/transactions');
const auth = require('../../config/auth')

/*---------- Public Routes ----------*/

// router.post('/add', require('../../config/auth'), isLoggedIn, transactionCtrl.addTransaction);
// router.get('/', require('../../config/auth'), isLoggedIn, transactionCtrl.showTransaction);

/*---------- Protected Routes ----------*/
router.get('/', transactionCtrl.showTransaction);
router.post('/add', transactionCtrl.addTransaction);



module.exports = router;
function isLoggedIn(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'NOT AUTHORIZED!!' });
  }