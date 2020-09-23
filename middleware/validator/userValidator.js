const { validateMessage } = require('../../fixtures/messageStatus.json');
const joi = require('joi');

class UserValidator {
    constructor() { }

    static async list(req, res, next) {
        try {
            await joi.object({
                limit: joi.number(),
                offset: joi.number()
            }).with('offset', 'limit').validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).json({ message: validateMessage.message });
        }
    }

    static async delete(req, res, next) {
        try {
            await joi.object({
                UserID: joi.number().required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).json({ message: validateMessage.message });
        }
    }
}

module.exports = UserValidator;