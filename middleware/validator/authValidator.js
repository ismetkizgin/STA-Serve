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

    static async signUp(req, res, next) {
        try {
            await joi.object({
                UserFirstName: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
                UserLastName: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
                UserIdentityNo: joi.number().min(10000000000).max(99999999999).required(),
                UserEmail: joi.string().email().required(),
                UserPassword: joi.string().max(99).required(),
                UserPhone: joi.string().min(11).max(11).pattern(new RegExp('^[0-9]+$')).required(),
                UserStatusID: joi.number().required(),
                InstitutionID: joi.number.required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).json({ message: validateMessage.message });
        }
    }

    static accountDelete(req, res, next) {
        try {
            joi.object({
                UserIdentityNo: joi.number().min(10000000000).max(99999999999).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).json({ message: validateMessage.message });
        }
    }

    static async userList(req, res, next) {
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
}

module.exports = AuthValidator;