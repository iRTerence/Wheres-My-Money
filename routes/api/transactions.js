const express = require('express');
const router = express.Router();
const Transaction = require('../../models/user');
const transactionCtrl = require('../../controllers/transactions');

/*---------- Public Routes ----------*/
router.post('/add', transactionCtrl.addTransaction);


/*---------- Protected Routes ----------*/




module.exports = router;