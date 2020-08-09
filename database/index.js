const transactions = require('./transactions');

class TransactionFactory {
    constructor() { }

    creating(provider, args) {
        let transaction = transactions[provider];
        if (!transaction)
            throw new Error('Database transaction is not found. Database transaction provider: ' + provider);
        return new transaction(args);
    }
}

module.exports = TransactionFactory;