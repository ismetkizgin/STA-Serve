const { validator } = require('../../utils');
const { validateMessage } = require('../../fixtures/messageStatus.json');

class AuthValidator {
    constructor() { }

    static login(req, res, next) {
        const body = req.body;
        if (validator.isInt(body.UserIdentityNo) && !validator.isEmpty(body.UserPassword))
            next();
        else
            res.status(validateMessage.status).json({ message: validateMessage.message });
    }
}

module.exports = AuthValidator;