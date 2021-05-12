const config = require('./config.json')
const express = require('express');
const authRouter = require('./routes/authRouter')
const docRouter = require('./routes/docRouter')

const app = express()

app.use(express.json())
app.use(express.text())

app.use('/auth', authRouter)
app.use('/doc', docRouter)
app.get('/', (_, res) => {
    res.status(200).send('Documint server running.')
})

app.listen(config.serverPort, () => {
    console.log(`Documint server started at http://localhost:${config.serverPort}`)
})