import { promises as fs } from 'fs'
import { htmlFromMD } from './markdownHandler'

export async function readMarkdownFileAsHTML(filepath: string) {
    return fs.readFile(filepath, 'utf-8').then(fileContent => htmlFromMD(fileContent))
}

export async function getFileList() {
    return fs.readdir('resources/docs')
}