const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { verifyToken } = require('../middleware');
const rankTransactions = TransactionsFactory.creating('rankTransactions');
const tokenControl = verifyToken.tokenControl;

router.get('/rank', tokenControl, async (req, res) => {
    try {
        const result = await rankTransactions.listAsync();
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

module.exports = router;