const router = require('express')();
const jwt = require('jsonwebtoken');
const { tokenMessages } = require('../fixtures/messageStatus.json');
const TransactionsFactory = require('../database/transactionFactory');
const { validator, verifyToken, authorization } = require('../middleware');
const userTransactions = TransactionsFactory.creating('userTransactions');
const authValidator = validator.authValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;

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

router.post('/sign-up', tokenControl, authValidator.signUp, authControl, async (req, res) => {
    try {
        const result = await userTransactions.signUpAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.delete('/account-delete', tokenControl, authValidator.accountDelete, authControl, async (req, res) => {
    try {
        const result = await userTransactions.accountDelete(req.body.UserIdentityNo);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.get('/token-ping', tokenControl, async (req, res) => {
    res.json(tokenMessages.Token_Control);
});

module.exports = router;