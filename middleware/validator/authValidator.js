const { validateMessage } = require('../../fixtures/messageStatus.json');
const joi = require('joi');

class AuthValidator {
    constructor() { }

    static async login(req, res, next) {
        try {
            await joi.object({
                UserIdentityNo: joi.number().required(),
                UserPassword: joi.string().max(99).required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).json({ message: validateMessage.message });
        }
    }
}

module.exports = AuthValidator;