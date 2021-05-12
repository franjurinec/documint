import { DocumentFile, Project } from '../types/types'
import { promises as fs } from 'fs'
import { htmlFromMD } from './markdownHandler'
import { getFilesPath, projectsPath } from './pathHandler'
import path from 'path'
import { getRemoteFileList, readRemoteFile, updateRemoteFile } from './remoteHandler'

export async function readMarkdownFile(file: DocumentFile) {
    if (file.project.type === 'REMOTE') {
        return await readRemoteFile(file)
    } else {
        return fs.readFile(file.path, 'utf-8')
    }   
}

export async function saveMarkdownFile(file: DocumentFile, content: string) {
    if (file.project.type === 'REMOTE') {
        return updateRemoteFile(file, content)
    } else {
        return fs.writeFile(file.path, content);
    }
}

export async function readMarkdownFileAsHTML(file: DocumentFile) {
    return readMarkdownFile(file).then(fileContent => htmlFromMD(fileContent))
}

export async function getFileList(currentProject: Project) {
    if (currentProject.type === 'REMOTE') {
        return await getRemoteFileList(currentProject)
    } else {
        let fileNames = await fs.readdir(currentProject.path)
        return fileNames.map<DocumentFile>(fileName => {
            return {
                name: fileName,
                project: currentProject,
                path: path.join(currentProject.path, fileName)
            }
        })
    }
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