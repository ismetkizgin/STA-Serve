const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validator, verifyToken, authorization } = require('../middleware');
const userTransactions = TransactionsFactory.creating('userTransactions');
const userValidator = validator.userValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;

router.get('/user', tokenControl, authControl, userValidator.list, async (req, res) => {
    try {
        const result = await userTransactions.list(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.delete('/user', tokenControl, authControl, userValidator.delete, async (req, res) => {
    try {
        const result = await userTransactions.delete(req.body.UserID);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

module.exports = router;