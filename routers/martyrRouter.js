const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validator, verifyToken, authorization } = require('../middleware');
const martyrTransactions = TransactionsFactory.creating('martyrTransactions');
const martyrValidator = validator.martyrValidator;
const tokenControl = verifyToken.tokenControl;
let { routerAuthorization } = require('../utils');
routerAuthorization = routerAuthorization['martyr'];
const ImageUploadFactory = require('../middleware/imageUploads/imageUploadFactory');
const multerImageUpload = ImageUploadFactory.creating('multerImageUpload');
const { authMessages } = require('../fixtures/messageStatus.json');

router.post('/martyr', tokenControl, multerImageUpload.upload, martyrValidator.insert, async (req, res) => {
    try {
        const result = await martyrTransactions.insertAsync(Object.assign(req.body, { InstitutionID: req.decode.InstitutionID, MartyrImagePath: req.file.path }));
        res.json(result);
    } catch (error) {
        await multerImageUpload.remove(req.file.path);
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.put('/martyr', tokenControl, martyrValidator.update, async (req, res) => {
    try {
        const martyrFind = await martyrTransactions.findAsync(req.body.MartyrID);
        if (routerAuthorization[req.method].Institution_Transactions.indexOf(req.decode.UserStatusName) != -1
            && martyrFind.InstitutionID != req.decode.InstitutionID) {
            res.status(authMessages.Unauthorized.status).json({ message: authMessages.Unauthorized.message });
            return;
        }
        const result = await martyrTransactions.updateAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.delete('/martyr', tokenControl, martyrValidator.delete, async (req, res) => {
    try {
        const martyrFind = await martyrTransactions.findAsync(req.body.MartyrID);
        if (routerAuthorization[req.method].Institution_Transactions.indexOf(req.decode.UserStatusName) != -1
            && martyrFind.InstitutionID != req.decode.InstitutionID) {
            res.status(authMessages.Unauthorized.status).json({ message: authMessages.Unauthorized.message });
            return;
        }
        const result = await martyrTransactions.deleteAsync(req.body.MartyrID);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.get('/martyr', tokenControl, martyrValidator.list, async (req, res) => {
    try {
        let body = req.body;
        if (routerAuthorization[req.method].Institution_Transactions.indexOf(req.decode.UserStatusName) != -1)
            body = Object.assign(body, { InstitutionID: req.decode.InstitutionID });
        const result = await martyrTransactions.listAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.get('/martyr/:MartyrID', tokenControl, martyrValidator.find, async (req, res) => {
    try {
        const result = await martyrTransactions.findAsync(req.params.MartyrID);
        if (routerAuthorization[req.method].Institution_Transactions.indexOf(req.decode.UserStatusName) != -1
            && result.InstitutionID != req.decode.InstitutionID) {
            res.status(authMessages.Unauthorized.status).json({ message: authMessages.Unauthorized.message });
            return;
        }
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

module.exports = router;