const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/', transactionController.createTransaction);
router.put('/:id/return', transactionController.returnBook);
router.get('/', transactionController.getAllTransactions);

module.exports = router;
