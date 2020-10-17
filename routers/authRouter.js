const router = require('express')();
const jwt = require('jsonwebtoken');
const TransactionsFactory = require('../database/transactionFactory');
const { validator, verifyToken } = require('../middleware');
const { authMessages } = require('../fixtures/messageStatus.json');
const userTransactions = TransactionsFactory.creating('userTransactions');
const authTransactions = TransactionsFactory.creating('authTransactions');
const authValidator = validator.authValidator;
const tokenControl = verifyToken.tokenControl;

router.post('/login', authValidator.login, async (req, res) => {
    try {
        const result = await userTransactions.loginAsync(req.body);
        const payload = { UserID: result.UserID, UserStatusName: result.UserStatusName, InstitutionID: result.InstitutionID }
        const token = jwt.sign(payload, req.app.get('api_key'), { expiresIn: '360d' });
        res.json({ result, token });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.delete('/my-account-delete', tokenControl, async (req, res) => {
    try {
        const result = await userTransactions.deleteAsync(req.decode.UserID);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.get('/role', tokenControl, async (req, res) => {
    try {
        const result = await authTransactions.additiveUserTypesAsync(req.decode.UserStatusName);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.put('/change-password', tokenControl, authValidator.changePassword, async (req, res) => {
    try {
        const result = await userTransactions.changePasswordAsync(Object.assign(req.body, { UserID: req.decode.UserID }));
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.get('/token-decode', tokenControl, async (req, res) => {
    res.json(req.decode);
});

module.exports = router;