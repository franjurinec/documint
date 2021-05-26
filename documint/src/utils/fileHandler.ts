import { DocumentFile, Project } from '../types/types'
import { promises as fs, existsSync } from 'fs'
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

export async function getFileList(currentProject: Project | undefined) {
    if (currentProject === undefined) return []

    let fileList: DocumentFile[] = []

    if (currentProject.type === 'REMOTE') {
        return await getRemoteFileList(currentProject)
    } else {
        let fileNames = await fs.readdir(currentProject.path)
        await Promise.all(fileNames.map(async fileName => {
            let filePath = path.join(currentProject.path, fileName)
            let fileStats = await fs.lstat(filePath)

            // Treat first level directories as 'categories', first level files as 'undefined category' files

            // Categories
            if (fileStats.isDirectory()) {
                let innerDirPath = path.join(currentProject.path, fileName)
                let innerFileNames = await fs.readdir(innerDirPath)

                // Categorised files
                await Promise.all(innerFileNames.map(async innerFileName => {
                    let filePath = path.join(innerDirPath, innerFileName)
                    let fileStats = await fs.lstat(filePath)

                    if (fileStats.isFile() && innerFileName.endsWith('.md')) {
                        fileList.push({
                            name: innerFileName.slice(0, -3),
                            project: currentProject,
                            path: filePath,
                            category: fileName
                        })
                    }
                }))
            }

            // Top-level files
            if (fileStats.isFile() && fileName.endsWith('.md')) {
                fileList.push({
                    name: fileName.slice(0, -3),
                    project: currentProject,
                    path: filePath,
                    category: undefined
                })
            }
        }))
    }

    return fileList
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
        let dirName = path.dirname(file.path)
        if (!existsSync(dirName)) {
            fs.mkdir(dirName, { recursive: true })
        }
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