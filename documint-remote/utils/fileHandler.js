const fs = require('fs').promises

let fileList = []
fs.readdir('./documents').then(fileNames => fileList = fileNames)

const updateFileList = () => {
    fs.readdir('./documents').then(fileNames => fileList = fileNames)
}

const getFiles = () => {
    return fileList
}

const getFile = (index) => {
    return fs.readFile('./documents/' + fileList[index], 'utf-8')
}

const updateFile = async (index, content) => {
    await fs.writeFile('./documents/' + fileList[index], content)
}

const createFile = async (name, content) => {
    await fs.writeFile('./documents/' + name, content)
    updateFileList()
}

const deleteFile = async (index) => {
    await fs.rm('./documents/' + fileList[index])
    updateFileList()
}

module.exports = {
    getFiles, getFile, updateFileList, updateFile, createFile, deleteFile
}