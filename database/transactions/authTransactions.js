const { mysqlDataContext } = require('../dataContexts');
const { authMessages } = require('../../fixtures/messageStatus.json');

class AuthTransactions {
    constructor() {
        this.datacontext = mysqlDataContext.connection();
    }

    async additiveUserTypesAsync(UserStatusName) {
        return new Promise((resolve, reject) => {
            this.datacontext.query(`SELECT UserStatusName FROM tblUserStatus WHERE UserStatusNumber<(SELECT UserStatusNumber FROM tblUserStatus WHERE UserStatusName=?)`, [UserStatusName], (error, result) => {
                if (!error) {
                    if (result.length)
                        resolve(result);
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