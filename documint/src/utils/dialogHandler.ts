import { remote } from "electron";
const dialog = remote.dialog

export async function getDirectoryDialog() {
    let result = await dialog.showOpenDialog({properties: ['openDirectory']})
    if (!result.canceled && result.filePaths.length > 0) {
        return result.filePaths[0]
    } else {
        return undefined
    }
}

export async function getFileDialog(filters: Electron.FileFilter[]) {
    let result = await dialog.showOpenDialog({properties: ['openFile'], filters: filters})
    if (!result.canceled && result.filePaths.length > 0) {
        return result.filePaths[0]
    } else {
        return undefined
    }
}