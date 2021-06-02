const router = require('express').Router();
const verifyToken = require('../auth/verifyToken')
const fileHandler = require('../utils/fileHandler')

router.use(verifyToken)

router.get('/me', (req, res) => {
    res.status(200).send(req.user)
})

router.post('/create', async (req, res) => {
    await fileHandler.createFile(req.body.name, req.body.category, "")
        .then(() => res.json({success: true}))
        .catch(() => res.json({success: false}))
})

router.put('/update/:id', async (req, res) => {
    await fileHandler.updateFile(req.params.id, req.body.content, req.body.readTimestamp, req.user)
        .then(() => res.json({success: true}))
        .catch(() => res.json({success: false}))
})

router.get('/delete/:id', async (req, res) => {
    await fileHandler.deleteFile(req.params.id)
        .then(() => res.json({success: true}))
        .catch(() => res.json({success: false}))
})

router.get('/all', async (_req, res) => {
    // Match RemoteFile[] type
    res.json(await fileHandler.getFiles())
})

router.get('/:id', async (req, res) => {
    let doc = await fileHandler.getFile(req.params.id)

    // Match TimestampedContent type
    res.json({content: doc.content, readTimestamp: Date.now()})
})

module.exports = router