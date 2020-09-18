const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validator, verifyToken, authorization } = require('../middleware');
const institutionTransactions = TransactionsFactory.creating('institutionTransactions');
const institutionValidator = validator.institutionValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;

router.post('/institution', tokenControl, authControl, institutionValidator.insert, async (req, res) => {
    try {
        const result = await institutionTransactions.insertAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.put('/institution', tokenControl, authControl, institutionValidator.update, async (req, res) => {
    try {
        const result = await institutionTransactions.updateAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.delete('/institution', tokenControl, authControl, institutionValidator.delete, async (req, res) => {
    try {
        const result = await institutionTransactions.deleteAsync(req.body.InstitutionID);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.get('/institution', tokenControl, authControl, institutionValidator.list, async (req, res) => {
    try {
        const result = await institutionTransactions.listAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

module.exports = router;