const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validator, verifyToken, authorization } = require('../middleware');
const martyrTransactions = TransactionsFactory.creating('martyrTransactions');
const martyrValidator = validator.martyrValidator;
const tokenControl = verifyToken.tokenControl;
let { routerAuthorization } = require('../utils');
routerAuthorization = routerAuthorization['martry'];
const ImageUploadFactory = require('../middleware/imageUploads/imageUploadFactory');
const multerImageUpload = ImageUploadFactory.creating('multerImageUpload');


router.post('/martry', tokenControl, multerImageUpload.upload, martyrValidator.insert, async (req, res) => {
    try {
        const result = await martyrTransactions.insertAsync(Object.assign(req.body, { InstitutionID: req.decode.InstitutionID, MartyrImagePath: req.file.path }));
        res.json(result);
    } catch (error) {
        await multerImageUpload.remove(req.file.path);
        res.status(error.status || 500).json({ message: error.message });
    }
});

module.exports = router;