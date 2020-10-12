const Roles = require('../models/roles');

module.exports = {
    institution: {
        POST: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
        PUT: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
        DELETE: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
        GET: {
            Individual_Transactions: [Roles.Editor, Roles.InstitutionAdmin]
        }
    },
    user: {
        POST: {
            Authorize: [Roles.Root, Roles.Administrator, Roles.InstitutionAdmin],
            Institution_Transactions: [Roles.InstitutionAdmin]
        },
        PUT: {
            Authorize: [Roles.Root, Roles.Administrator, Roles.InstitutionAdmin],
            Institution_Transactions: [Roles.InstitutionAdmin]
        },
        DELETE: {
            Authorize: [Roles.Root, Roles.Administrator, Roles.InstitutionAdmin],
            Institution_Transactions: [Roles.InstitutionAdmin]
        },
        GET: {
            Authorize: [Roles.Root, Roles.Administrator, Roles.InstitutionAdmin],
            Institution_Transactions: [Roles.InstitutionAdmin],
            Find_Authorize: [Roles.Root, Roles.Administrator]
        }
    },
    userinstitution: {
        GET: {
            Authorize: [Roles.Root, Roles.Administrator]
        }
    },
    martyr: {
        PUT: {
            Institution_Transactions: [Roles.InstitutionAdmin, Roles.Editor],
        }
    }
}