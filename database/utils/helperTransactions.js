class HelperTransactions {
    constructor(datacontext) {
        this.datacontext = datacontext;
    }

    async getDataList(tblName, errorMessage, values) {
        const limitAndOffset = values.offset == null ? `${values.limit == null ? '' : `LIMIT ${values.limit}`}` : `LIMIT ${values.offset},${values.limit}`;
        return new Promise((resolve, reject) => {
            this.datacontext.query(`SELECT * FROM ${tblName} ORDER BY UserID DESC ${limitAndOffset}`, (error, result) => {
                if (!error) {
                    if (result.length > 0)
                        resolve(result);
                    else
                        reject(errorMessage);
                }
                else {
                    reject({ status: 500, message: error.message });
                }
            });
        });
    }
}

module.exports = HelperTransactions;