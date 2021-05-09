import { DocumentFile, Project } from '../types/types'
import { promises as fs } from 'fs'
import { htmlFromMD } from './markdownHandler'
import { getFilesPath, projectsPath } from './pathHandler'
import path from 'path'

export async function readMarkdownFileAsHTML(file: DocumentFile) {
    return readMarkdownFile(file).then(fileContent => htmlFromMD(fileContent))
}

export async function readMarkdownFile(file: DocumentFile) {
    return fs.readFile(file.path, 'utf-8')
}

export async function saveMarkdownFile(file: DocumentFile, content: string) {
    return fs.writeFile(file.path, content);
}

export async function getFileList(currentProject: Project) {
    let fileNames = await fs.readdir(currentProject.path)
    return fileNames.map<DocumentFile>(fileName => {
        return {
            name: fileName,
            path: path.join(currentProject.path, fileName)
        }
    })
}

export async function getProjectList(): Promise<Project[]> {
    await fs.mkdir(projectsPath, {recursive: true})
    let projectNames = await fs.readdir(projectsPath)
    return projectNames.map<Project>(projectName => { 
        return {
            name: projectName,
            type: "LOCAL",
            path: getFilesPath(projectName)
        }
    })
}