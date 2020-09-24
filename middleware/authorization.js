const TransactionsFactory = require('../database/transactionFactory');
const authTransactions = TransactionsFactory.creating('authTransactions');
const { authMessages } = require('../fixtures/messageStatus.json');

class Authorization {
    constructor() { }

    static async authControl(req, res, next) {
        try {
            const decode = req.decode;
            const UserStatusTransactionName = req.originalUrl.replace(/[^a-zA-Z]/g, '');
            const result = await authTransactions.authFindAsync({ UserStatusName: decode.UserStatusName, UserStatusTransactionName: UserStatusTransactionName });
            if (result)
                next();
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
            next();
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }
}

module.exports = Authorization;