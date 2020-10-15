const { mysqlDataContext } = require('../dataContexts');
const { rankMessages } = require('../../fixtures/messageStatus.json');

class MartyrTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }

    async listAsync() {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT * FROM tblRank`, (error, result) => {
                if (!error) {
                    if (result.length > 0)
                        resolve(result);
                    else
                        reject(rankMessages.list.Not_Found);
                }
                else {
                    reject({ status: 500, message: error.message });
                }
            });
        });
    }
}

module.exports = MartyrTransactions;
