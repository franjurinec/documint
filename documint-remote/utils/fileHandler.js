const fs = require('fs').promises

let fileList = []
fs.readdir('./documents').then(fileNames => fileList = fileNames)

const updateFileList = () => {
    fs.readdir('./documents').then(fileNames => {
        fileNames.forEach(fileName => {
            if (!fileList.includes(fileName)) 
                fileList.push(fileName)
        })
    })
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

module.exports = {
    getFiles, getFile, updateFileList, updateFile
}