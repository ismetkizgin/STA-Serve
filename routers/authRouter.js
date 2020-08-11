const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const userTransactions = TransactionsFactory.creating('userTransactions');
const { authValidator } = require('../middleware').validator;
const jwt = require('jsonwebtoken');

router.post('/login', authValidator.login, async (req, res) => {
    try {
        const result = await userTransactions.loginAsync(req.body);
        const payload = { UserID: result.UserID, UserIdentityNo: result.UserIdentityNo, UserStatusID: result.UserStatusID, InstitutionID: result.InstitutionID }
        const token = jwt.sign(payload, req.app.get('api_key'), { expiresIn: 720 });
        res.json({ result, token });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.post('/sign-up', authValidator.signUp, async (req, res) => {
    try {
        const result = await userTransactions.signUpAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

module.exports = router;