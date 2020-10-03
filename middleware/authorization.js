const TransactionsFactory = require('../database/transactionFactory');
const authTransactions = TransactionsFactory.creating('authTransactions');
const { authMessages } = require('../fixtures/messageStatus.json');
const { routerAuthorization } = require('../utils');

class Authorization {
    constructor() { }

    static async authControl(req, res, next) {
        try {
            const auth = routerAuthorization[req.originalUrl.replace(/[^a-zA-Z -]/g, '')][req.method].Authorize;
            if (!auth || auth.indexOf(req.decode.UserStatusName) != -1)
                next()
            else
                res.status(authMessages.Unauthorized.status).json({ message: authMessages.Unauthorized.message });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    static async userInsertAuthControl(req, res, next) {
        try {
            const result = await authTransactions.additiveUserTypesAsync(req.decode.UserStatusName);
            if (result.findIndex(
                (statusName) => statusName.UserStatusName == req.body.UserStatusName
            ) == -1)
                res.status(authMessages.Unauthorized.status).json({ message: authMessages.Unauthorized.message });
            else
                next();
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }
}

module.exports = Authorization;