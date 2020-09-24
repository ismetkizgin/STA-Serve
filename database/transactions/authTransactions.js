const { mysqlDataContext } = require('../dataContexts');
const { authMessages } = require('../../fixtures/messageStatus.json');

class AuthTransactions {
    constructor() {
        this.datacontext = mysqlDataContext.connection();
    }

    async authFindAsync(values) {
        return new Promise((resolve, reject) => {
            this.datacontext.query(`SELECT * FROM vwAuth WHERE UserStatusName=? AND UserStatusTransactionName=?`, [values.UserStatusName, values.UserStatusTransactionName], (error, result) => {
                if (!error) {
                    if (result.length)
                        resolve(true);
                    else
                        reject(authMessages.Unauthorized);
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }

    async additiveUserTypesAsync(UserStatusName) {
        return new Promise((resolve, reject) => {
            this.datacontext.query(`CALL prAdditiveUserTypes(?)`, [UserStatusName], (error, result) => {
                if (!error) {
                    if (result[0].length)
                        resolve(result[0]);
                    else
                        reject(authMessages.Not_found);
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
}

module.exports = AuthTransactions;