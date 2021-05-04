import { promises as fs } from 'fs'
import { htmlFromMD } from './markdownHandler'
import { getFilesPath, projectsPath } from './pathHandler'
import path from 'path'

export async function readMarkdownFileAsHTML(projectName: string, fileName: string) {
    return readMarkdownFile(projectName, fileName).then(fileContent => htmlFromMD(fileContent))
}

export async function readMarkdownFile(projectName: string, fileName: string) {
    const filePath = path.join(getFilesPath(projectName), fileName);
    return fs.readFile(filePath, 'utf-8')
}

export async function getFileList(projectName: string) {
    console.log('Looking for files in ' + getFilesPath(projectName))
    return fs.readdir(getFilesPath(projectName))
}

export async function getProjectList() {
    console.log('Looking for projects in ' + projectsPath)
    await fs.mkdir(projectsPath, {recursive: true})
    return fs.readdir(projectsPath)
}