const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../config.json')

router.post('/token', (req, res) => {
    console.log(req.body)
    if (req.body && req.body.password && req.body.user && req.body.password == config.password) {
        let token = jwt.sign({ user: req.body.user }, config.password, {
            expiresIn: 7 * 86400 // 7 days
        })
        res.status(200).send({ auth: true, token: token })
    } else {
        return res.status(401).send({ auth: false, message: 'Invalid data provided.' })
    }
})

router.get('/me', function (req, res) {
    var token = req.headers['x-access-token']
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' })

    jwt.verify(token, config.password, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
        res.status(200).send(decoded)
    })
})

module.exports = router