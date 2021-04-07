const router = require('express').Router();
const verifyToken = require('../auth/verifyToken')

router.use(verifyToken)

router.get('/me', (req, res) => {
    res.status(200).send(req.user)
})

module.exports = router