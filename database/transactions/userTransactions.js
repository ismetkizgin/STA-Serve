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
                        reject(userMessages.login.Not_Found);
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }

    async signUpAsync(values) {
        return new Promise((resolve, reject) => {
            this.datacontext.query(`INSERT INTO tblUser SET ?`, values, (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve(userMessages.signup.Ok);
                    else
                        reject(userMessages.signup.Internal_Server_Error)
                }
                else {
                    reject(error.errno == 1062 ? userMessages.signup.Conflict : { status: 500, message: error.message });
                }
            });
        });
    }

    async accountDelete(UserID) {
        return new Promise((resolve, reject) => {
            this.datacontext.query(`DELETE FROM tblUser WHERE UserID=?`, [UserID], (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve(userMessages.accountDelete.Ok);
                    else
                        reject(userMessages.accountDelete.Gone);
                }
                else {
                    reject({ status: 500, message: error.message });
                }
            });
        });
    }
}

module.exports = UserTransactions;