const validator = require('validator');

class Validator {
    constructor() { }

    static isInt(value) { return value == null ? false : validator.isInt(value) }
    static isEmpty(value) { return value == null ? true : validator.isEmpty(value) }
    static isAlpha(value) { return value == null ? false : validator.isAlpha(value, ['tr-TR']) }
    static isMobilePhone(value) { return value == null ? false : validator.isMobilePhone(value, ['tr-TR']) }
    static isEmail(value) { return value == null ? false : validator.isEmail(value) }
}

module.exports = Validator;