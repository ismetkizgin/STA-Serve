const TransactionsFactory = require('../database/transactionFactory');
const authTransactions = TransactionsFactory.creating('authTransactions');

class Authorization {
    constructor() { }

    static async authControl(req, res, next) {
        try {
            const decode = req.decode;
            console.log(req.body.UserIdentityNo, req.decode.UserIdentityNo)
            if (req.body.UserIdentityNo == req.decode.UserIdentityNo) {
                next();
            }
            else {
                const UserStatusTransactionName = req.originalUrl.replace('/', '');
                const result = await authTransactions.authFindAsync({ UserStatusID: decode.UserStatusID, UserStatusTransactionName: UserStatusTransactionName });
                if (result)
                    next();
            }
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }
}

module.exports = Authorization;