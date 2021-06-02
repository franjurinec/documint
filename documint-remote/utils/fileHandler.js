const fs = require('fs').promises
const { v4: uuidv4 } = require('uuid');
const path = require('path')

fs.mkdir('./documents').catch(() => console.log("Documents folder already initialized."))

const getFiles = async () => {
    let IDs = await fs.readdir('./documents/')

    let fileList = await Promise.all(IDs.map(async id => {
        id = id.slice(0, -5)
        let doc = await getFile(id)
        return {
            id: id,
            name: doc.name,
            category: doc.category
        }
    }))

    return fileList
}

const getFile = async id => {
    let docString = await fs.readFile(path.join('./documents/', id + ".json"), 'utf-8')
    let doc = JSON.parse(docString)
    return {
        name: doc.name,
        category: doc.category,
        content: doc.content,
        lastUpdated: doc.lastUpdated
    }
}

const updateFile = async (id, content, readTimestamp, user) => {
    let oldDoc = await getFile(id)

    if (readTimestamp < oldDoc.lastUpdated) {
        id = uuidv4()

        let newDoc = {
            name: oldDoc.name + ' - ' + user,
            category: oldDoc.category,
            content: content,
            lastUpdated: Date.now()
        }
    
        await fs.writeFile(path.join('./documents/', id + ".json"), JSON.stringify(newDoc))
    } else {
        let newDoc = {
            name: oldDoc.name,
            category: oldDoc.category,
            content: content,
            lastUpdated: Date.now()
        }
    
        await fs.writeFile(path.join('./documents/', id + ".json"), JSON.stringify(newDoc))
    }

    
}

const createFile = async (name, category, content) => {
    let id = uuidv4()

    let doc = {
        name: name,
        category: category,
        content: content,
        lastUpdated: Date.now()
    }

    await fs.writeFile(path.join('./documents/', id + ".json"), JSON.stringify(doc))
}

const deleteFile = async id => {
    await fs.rm(path.join('./documents/', id + ".json"))
}

module.exports = {
    getFiles, getFile, updateFile, createFile, deleteFile
}