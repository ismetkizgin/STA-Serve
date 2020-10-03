const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validator, verifyToken, authorization } = require('../middleware');
const { authMessages } = require('../fixtures/messageStatus.json');
const institutionTransactions = TransactionsFactory.creating('institutionTransactions');
const institutionValidator = validator.institutionValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
let { routerAuthorization } = require('../utils');
routerAuthorization = routerAuthorization['institution'];

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

router.get('/institution', tokenControl, institutionValidator.list, async (req, res) => {
    try {
        let result;
        if (routerAuthorization[req.method].Institution_Transactions.indexOf(req.decode.UserStatusName) === -1)
            result = await institutionTransactions.listAsync(req.body);
        else
            result = await institutionTransactions.findAsync(req.decode.InstitutionID);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.get('/institution/:InstitutionID', tokenControl, institutionValidator.find, async (req, res) => {
    try {
        if (routerAuthorization[req.method].Institution_Transactions.indexOf(req.decode.UserStatusName) === -1 || req.params.InstitutionID == req.decode.InstitutionID) {
            result = await institutionTransactions.findAsync(req.params.InstitutionID);
            res.json(result);
        }
        else {
            res.status(authMessages.Unauthorized.status).json({ message: authMessages.Unauthorized.message });
        }
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

module.exports = router;