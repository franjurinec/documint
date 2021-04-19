import { ipcRenderer } from 'electron';
import path from 'path'

export const userDataPath: string = ipcRenderer.sendSync('request-userdata-path')

export const projectsPath = path.join(userDataPath, '/projects')

export function getFilesPath(projectName: string) {
    return path.join(projectsPath, path.normalize(projectName))
}