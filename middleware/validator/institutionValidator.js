const { validateMessage } = require('../../fixtures/messageStatus.json');
const joi = require('joi');

class InstitutionValidator {
    constructor() { }

    static async insert(req, res, next) {
        try {
            await joi.object({
                InstitutionName: joi.string().min(3).required(),
                InstitutionCity: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
                InstitutionDistrict: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
                InstitutionEmail: joi.string().email().required(),
                InstitutionPhone: joi.string().min(11).max(11).pattern(new RegExp('^[0-9]+$')).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).json({ message: validateMessage.message });
        }
    }
}

module.exports = InstitutionValidator;