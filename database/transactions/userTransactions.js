const { mysqlDataContext } = require('../dataContexts');
const { userMessages } = require('../../fixtures/messageStatus.json');

class UserTransactions {
    constructor() { }
    datacontext = mysqlDataContext.connection();

    async loginAsync(values) {
        return new Promise((resolve, reject) => {
            this.datacontext.query(`SELECT * FROM tblUser where UserIdentityNo=? and UserPassword=?`, [values.UserIdentityNo, values.UserPassword], (error, result) => {
                if (!error) {
                    if (result.length)
                        resolve(result[0]);
                    else
                        reject(userMessages.Not_Found);
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
}

module.exports = UserTransactions;