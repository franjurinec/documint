import { DocumentFile, Project } from '../types/types'
import { promises as fs } from 'fs'
import { htmlFromMD } from './markdownHandler'
import { userDataPath } from './pathHandler'
import path from 'path'
import { addRemoteFile, deleteRemoteFile, getRemoteFileList, readRemoteFile, updateRemoteFile } from './remoteHandler'

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

export async function getFileList(currentProject: Project|undefined) {
    if (currentProject === undefined) return []

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
    let projectsString = await fs.readFile(path.join(userDataPath, 'projects.json'), 'utf-8')
    let projects: Project[] = JSON.parse(projectsString)
    if (projects) 
        return projects
    else 
        return []
}

export async function appendProjectsFile(project: Project) {
    let projectsString = await fs.readFile(path.join(userDataPath, 'projects.json'), 'utf-8')
    let projects: Project[] = JSON.parse(projectsString)
    
    if (!projects) {
        projects = []
    }

    if (!projects.some(existingProj => existingProj.path === project.path)) {
        projects.push(project)
    }

    let updatedProjectsString = JSON.stringify(projects)
    await fs.writeFile(path.join(userDataPath, 'projects.json'), updatedProjectsString, 'utf-8')
}

export async function removeFromProjectsFile(project: Project) {
    let projectsString = await fs.readFile(path.join(userDataPath, 'projects.json'), 'utf-8')
    let projects: Project[] = JSON.parse(projectsString)
    
    if (!projects) return

    projects = projects.filter(existingProj => existingProj.path !== project.path)

    let updatedProjectsString = JSON.stringify(projects)
    await fs.writeFile(path.join(userDataPath, 'projects.json'), updatedProjectsString, 'utf-8')
}

export async function addFile(file: DocumentFile) {
    if (file.project.type === 'REMOTE') {
        return await addRemoteFile(file)
    } else {
        return await fs.writeFile(file.path, "")
    }  
}

export async function deleteFile(file: DocumentFile) {
    if (file.project.type === 'REMOTE') {
        return await deleteRemoteFile(file)
    } else {
        return await fs.rm(file.path)
    }  
}