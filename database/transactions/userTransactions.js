const { mysqlDataContext } = require('../dataContexts');
const { userMessages } = require('../../fixtures/messageStatus.json');

class UserTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
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

    async insertAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`INSERT INTO tblUser SET ?`, values, (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve(userMessages.insert.Ok);
                    else
                        reject(userMessages.insert.Internal_Server_Error)
                }
                else {
                    reject(error.errno == 1062 ? userMessages.insert.Conflict : { status: 500, message: error.message });
                }
            });
        });
    }

    async deleteAsync(UserID) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`DELETE FROM tblUser WHERE UserID=?`, [UserID], (error, result) => {
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

    async updateAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`UPDATE tblUser SET ? WHERE UserID=?`, [values, values.UserID], (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve(userMessages.update.Ok);
                    else
                        reject(userMessages.update.Internal_Server_Error)
                }
                else {
                    reject(error.errno == 1062 ? userMessages.insert.Conflict : { status: 500, message: error.message });
                }
            });
        });
    }

    async listAsync(values) {
        const limitAndOffset = values.offset == null ? `${values.limit == null ? '' : `LIMIT ${values.limit}`}` : `LIMIT ${values.offset},${values.limit}`;
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT vwUserList.* FROM vwUserList LEFT JOIN tblUserStatus ON vwUserList.UserStatusName=tblUserStatus.UserStatusName WHERE tblUserStatus.UserStatusNumber<(SELECT UserStatusNumber FROM tblUserStatus WHERE UserStatusNAme=?) ORDER BY UserFirstName, UserLastName ASC ${limitAndOffset}`, [values.UserStatusName], (error, result) => {
                if (!error) {
                    if (result.length > 0)
                        resolve(result);
                    else
                        reject(userMessages.list.Not_Found);
                }
                else {
                    reject({ status: 500, message: error.message });
                }
            });
        });
    }

    async findAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT vwUserList.* FROM vwUserList LEFT JOIN tblUserStatus ON vwUserList.UserStatusName=tblUserStatus.UserStatusName WHERE tblUserStatus.UserStatusNumber<(SELECT UserStatusNumber FROM tblUserStatus WHERE UserStatusNAme=?) AND UserID=?`, [values.UserStatusName, values.UserID], (error, result) => {
                if (!error) {
                    if (result.length > 0)
                        resolve(result[0]);
                    else
                        reject(userMessages.list.Not_Found);
                }
                else {
                    reject({ status: 500, message: error.message });
                }
            });
        });
    }

    async listInstitutionUser(values) {
        const limitAndOffset = values.offset == null ? `${values.limit == null ? '' : `LIMIT ${values.limit}`}` : `LIMIT ${values.offset},${values.limit}`;
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT vwUserList.* FROM vwUserList LEFT JOIN tblUserStatus ON vwUserList.UserStatusName=tblUserStatus.UserStatusName WHERE tblUserStatus.UserStatusNumber<(SELECT UserStatusNumber FROM tblUserStatus WHERE UserStatusNAme=?) AND InstitutionID=? ORDER BY UserFirstName, UserLastName ASC ${limitAndOffset}`, [values.UserStatusName, values.InstitutionID], (error, result) => {
                if (!error) {
                    if (result.length > 0)
                        resolve(result);
                    else
                        reject(userMessages.list.Not_Found);
                }
                else {
                    reject({
                        status: 500, message: error.message
                    });
                }
            });
        });
    }
}

module.exports = UserTransactions;