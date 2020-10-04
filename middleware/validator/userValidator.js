const { validateMessage } = require('../../fixtures/messageStatus.json');
const joi = require('joi');

class UserValidator {
    constructor() { }

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

    static async insert(req, res, next) {
        try {
            await joi.object({
                UserFirstName: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                UserLastName: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                UserIdentityNo: joi.number().min(10000000000).max(99999999999).required(),
                UserEmail: joi.string().email().required(),
                UserPassword: joi.string().max(99).required(),
                UserPhone: joi.string().min(11).max(11).pattern(new RegExp('^[0-9]+$')).required(),
                UserStatusName: joi.string().required(),
                InstitutionID: joi.number().required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).json({ message: validateMessage.message });
        }
    }

    static async update(req, res, next) {
        try {
            await joi.object({
                UserID: joi.number().required(),
                UserFirstName: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                UserLastName: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                UserIdentityNo: joi.number().min(10000000000).max(99999999999).required(),
                UserEmail: joi.string().email().required(),
                UserPhone: joi.string().min(11).max(11).pattern(new RegExp('^[0-9]+$')).required(),
                UserStatusName: joi.string().required(),
                InstitutionID: joi.number().required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).json({ message: validateMessage.message });
        }
    }

    static async find(req, res, next) {
        try {
            await joi.object({
                UserID: joi.number().min(1).required(),
            }).validateAsync({ UserID: parseInt(req.params.UserID) });
            next();
        } catch (error) {
            res.status(validateMessage.status).json({ message: validateMessage.message });
        }
    }

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
}

module.exports = UserValidator;