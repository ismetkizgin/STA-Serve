const { validateMessage } = require('../../fixtures/messageStatus.json');
const joi = require('joi');
const ImageUploadFactory = require('../imageUploads/imageUploadFactory');
const multerImageUpload = ImageUploadFactory.creating('multerImageUpload');


class MartyrValidator {
    constructor() { }

    static async insert(req, res, next) {
        try {
            await joi.object({
                MartyrFirstName: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                MartyrLastName: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                MartyrDateOfBrith: joi.date().required(),
                MartyrDateOfDeath: joi.date().required(),
                Rank: joi.string().min(2).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                MartyrCity: joi.string().min(2).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
                MartyrDistrict: joi.string().min(2).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                MartyrPlaceOfDeath: joi.string().min(2).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                MartyrContent: joi.string().required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            await multerImageUpload.remove(req.file.path);
            res.status(validateMessage.status).json({ message: validateMessage.message });
        }
    }

    static async update(req, res, next) {
        try {
            await joi.object({
                MartyrID: joi.number().required(),
                MartyrFirstName: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                MartyrLastName: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                MartyrDateOfBrith: joi.date().required(),
                MartyrDateOfDeath: joi.date().required(),
                Rank: joi.string().min(2).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                MartyrCity: joi.string().min(2).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
                MartyrDistrict: joi.string().min(2).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                MartyrPlaceOfDeath: joi.string().min(2).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                MartyrContent: joi.string().required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).json({ message: validateMessage.message });
        }
    }

    static async delete(req, res, next) {
        try {
            await joi.object({
                MartyrID: joi.number().required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).json({ message: validateMessage.message });
        }
    }
}

module.exports = MartyrValidator;