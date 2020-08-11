const jwt = require('jsonwebtoken');
const { tokenMessage } = require('../fixtures/messageStatus.json');

class VerifyToken {
    constructor() { }

    static tokenControl = (req, res, next) => {
        const token = req.headers['token'] || req.body.token || req.query.token
        if (token) {
            jwt.verify(token, req.app.get('api_key'), (err, decoded) => {

                if (err) {
                    res.status(tokenMessage.Token_Invalid.status).json({ message: tokenMessage.Token_Invalid.message });
                } else {
                    req.decode = decoded,
                        next();
                }
            });

        } else {
            res.status(tokenMessage.Token_Null.status).json({ message: tokenMessage.Token_Null.message });
        }
    }
}

module.exports = VerifyToken;