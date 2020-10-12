const { mysqlDataContext } = require('../dataContexts');
const { martyrMessages } = require('../../fixtures/messageStatus.json');

class MartyrTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }

    async insertAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`INSERT INTO tblMartyr SET ?`, values, (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve(martyrMessages.insert.Ok);
                    else
                        reject(martyrMessages.insert.Internal_Server_Error)
                }
                else {
                    reject(error.errno == 1062 ? martyrMessages.insert.Conflict : { status: 500, message: error.message });
                }
            });
        });
    }
}

module.exports = MartyrTransactions;