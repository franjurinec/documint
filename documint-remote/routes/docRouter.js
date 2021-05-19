const router = require('express').Router();
const verifyToken = require('../auth/verifyToken')
const fileHandler = require('../utils/fileHandler')

router.use(verifyToken)

router.get('/me', (req, res) => {
    res.status(200).send(req.user)
})

router.post('/create/:name', async (req, res) => {
    await fileHandler.createFile(req.params.name, req.body)
    res.send("Successfully added!")
})

router.put('/update/:id', async (req, res) => {
    let docId = req.params.id
    await fileHandler.updateFile(docId, req.body)
    res.send('Successfully updated!')
})

router.get('/delete/:id', async (req, res) => {
    await fileHandler.deleteFile(req.params.id)
    res.send('Successfully deleted!')
})

router.get('/all', (_req, res) => {
    res.send(fileHandler.getFiles())
})

router.get('/:id', async (req, res) => {
    let docId = req.params.id
    res.setHeader('content-type', 'text/plain')
    res.send(await fileHandler.getFile(docId))
})

module.exports = router