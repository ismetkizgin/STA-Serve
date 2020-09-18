const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validator, verifyToken, authorization } = require('../middleware');
const institutionTransactions = TransactionsFactory.creating('institutionTransactions');
const institutionValidator = validator.institutionValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;

router.post('/institution', institutionValidator.insert, async (req, res) => {
    try {
        const result = await institutionTransactions.insertAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

module.exports = router;