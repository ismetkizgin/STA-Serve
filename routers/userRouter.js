const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validator, verifyToken, authorization } = require('../middleware');
const userTransactions = TransactionsFactory.creating('userTransactions');
const userValidator = validator.userValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const userInsertAuthControl = authorization.userInsertAuthControl;

router.get('/user', tokenControl, userValidator.list, authControl, async (req, res) => {
    try {
        const result = await userTransactions.listAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.get('/user/:UserID', tokenControl, userValidator.find, authControl, async (req, res) => {
    try {
        const result = await userTransactions.findAsync(req.params.UserID);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.delete('/user', tokenControl, userValidator.delete, authControl, async (req, res) => {
    try {
        const result = await userTransactions.deleteAsync(req.body.UserID);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.post('/user', tokenControl, userValidator.insert, authControl, userInsertAuthControl, async (req, res) => {
    try {
        const result = await userTransactions.insertAsync(Object.assign(req.body, { InstitutionID: req.decode.InstitutionID }));
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.put('/user', tokenControl, userValidator.update, authControl, userInsertAuthControl, async (req, res) => {
    try {
        const result = await userTransactions.updateAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

module.exports = router;