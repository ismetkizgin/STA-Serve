const { mysqlDataContext } = require('../dataContexts');
const { userMessages } = require('../../fixtures/messageStatus.json');
const { helperTransactions } = require('../utils/');

class UserTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
        this._helperTransactions = new helperTransactions(this._datacontext);
    }

    async loginAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT * FROM tblUser where UserIdentityNo=? and UserPassword=?`, [values.UserIdentityNo, values.UserPassword], (error, result) => {
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
            this._datacontext.query(`INSERT INTO tblUser SET ?`, values, (error, result) => {
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

    async accountDelete(UserIdentityNo) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`DELETE FROM tblUser WHERE UserIdentityNo=1`, [UserIdentityNo], (error, result) => {
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

    async userList(values) {
        return this._helperTransactions.getDataList('tblUser', userMessages.userList.Not_Found, values);
    }
}

module.exports = UserTransactions;