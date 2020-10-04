const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { authMessages } = require('../fixtures/messageStatus.json');
const { validator, verifyToken, authorization } = require('../middleware');
const userTransactions = TransactionsFactory.creating('userTransactions');
const authTransactions = TransactionsFactory.creating('authTransactions');
const userValidator = validator.userValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const userInsertAuthControl = authorization.userInsertAuthControl;
let { routerAuthorization } = require('../utils');
routerAuthorization = routerAuthorization['user'];

router.get('/user', tokenControl, authControl, async (req, res) => {
    try {
        let result;
        if (routerAuthorization[req.method].Institution_Transactions.indexOf(req.decode.UserStatusName) === -1)
            result = await userTransactions.listAsync(Object.assign(req.body, { UserStatusName: req.decode.UserStatusName }));
        else
            result = await userTransactions.listInstitutionUser(Object.assign(req.body, req.decode));
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.get('/user/:UserID', tokenControl, userValidator.find, async (req, res) => {
    try {
        const result = await userTransactions.findAsync({ UserID: req.params.UserID, UserStatusName: req.decode.UserStatusName });
        if (req.params.UserID == req.decode.UserID || routerAuthorization[req.method].Find_Authorize.indexOf(req.decode.UserStatusName) != -1 || (routerAuthorization[req.method].Institution_Transactions.indexOf(req.decode.UserStatusName) != -1 && result.InstitutionID == req.decode.InstitutionID)) {
            res.json(result);
            return;
        }
        res.status(authMessages.Unauthorized.status).json({ message: authMessages.Unauthorized.message });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.delete('/user', tokenControl, userValidator.delete, authControl, async (req, res) => {
    try {
        const userResult = await userTransactions.findAsync(req.body.UserID);
        const statusResult = await authTransactions.additiveUserTypesAsync(req.decode.UserStatusName);
        if ((routerAuthorization[req.method].Institution_Transactions.indexOf(req.decode.UserStatusName) != -1
            && userResult.InstitutionID != req.decode.InstitutionID)
            || statusResult.findIndex((statusName) => statusName.UserStatusName == userResult.UserStatusName) === -1) {
            res.status(authMessages.Unauthorized.status).json({ message: authMessages.Unauthorized.message });
            return;
        }
        const result = await userTransactions.deleteAsync(req.body.UserID);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.post('/user', tokenControl, userValidator.insert, authControl, userInsertAuthControl, async (req, res) => {
    try {
        let body = req.body;
        if (routerAuthorization[req.method].Institution_Transactions.indexOf(req.decode.UserStatusName) != -1 && req.body.InstitutionID == req.decode.InstitutionID)
            body = Object.assign(body, { InstitutionID: req.decode.InstitutionID });
        else {
            res.status(authMessages.Unauthorized.status).json({ message: authMessages.Unauthorized.message });
            return;
        }
        const result = await userTransactions.insertAsync(body);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.put('/user', tokenControl, userValidator.update, authControl, userInsertAuthControl, async (req, res) => {
    try {
        const userResult = await userTransactions.findAsync(req.body.UserID);
        const statusResult = await authTransactions.additiveUserTypesAsync(req.decode.UserStatusName);
        if ((routerAuthorization[req.method].Institution_Transactions.indexOf(req.decode.UserStatusName) != -1
            && userResult.InstitutionID != req.decode.InstitutionID)
            || statusResult.findIndex((statusName) => statusName.UserStatusName == userResult.UserStatusName) === -1) {
            res.status(authMessages.Unauthorized.status).json({ message: authMessages.Unauthorized.message });
            return;
        }
        const result = await userTransactions.updateAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

module.exports = router;