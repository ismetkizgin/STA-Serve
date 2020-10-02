const { mysqlDataContext } = require('../dataContexts');
const { authMessages } = require('../../fixtures/messageStatus.json');

class AuthTransactions {
    constructor() {
        this.datacontext = mysqlDataContext.connection();
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