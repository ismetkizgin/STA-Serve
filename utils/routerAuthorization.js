const roles = require('../models/roles');
const Roles = require('../models/roles');

module.exports = {
    institution: {
        POST: [Roles.Root, Roles.Administrator],
        PUT: [Roles.Root, Roles.Administrator],
        DELETE: [Roles.Root, Roles.Administrator],
    },
    user: {
        POST: [Roles.Root, Roles.Administrator],
        PUT: [Roles.Root, Roles.Administrator],
        DELETE: [Roles.Root, Roles.Administrator],
        GET: [Roles.Root, Roles.Administrator],
    }
}