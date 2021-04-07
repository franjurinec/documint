const jwt = require('jsonwebtoken')
const config = require('../config.json')

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token']
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.password, function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
        req.user = decoded.user;
        next();
    });
}

module.exports = verifyToken