import { DocumentFile, Project } from "../types/types"

export async function getToken(url: string, username: string, password: string) {
    let credentials = {
        user: username,
        password: password
    }

    let res = await fetch(url + '/auth/token', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: new Headers({ 'content-type': 'application/json' })
    }).then(res => res.json()) as { auth: boolean, token: string }

    if (res.auth) {
        return res.token
    } else {
        return undefined
    }
}

export async function getRemoteFileList(currentProject: Project) {
    if (currentProject.token === undefined) {
        return []
    }

    let fileNames = await fetch(currentProject.path + '/doc/all', {
        headers: new Headers({
            'X-access-token': currentProject.token
        })
    }).then(res => res.json()) as string[]

    return fileNames.map<DocumentFile>((fileName, index) => {
        return {
            name: fileName,
            project: currentProject,
            path: String(index)
        }
    })
}

export async function readRemoteFile(file: DocumentFile) {
    if (file.project.token === undefined) {
        return "Failed to fetch remote file."
    }

    const res = await fetch(file.project.path + '/doc/' + file.path, {
        headers: new Headers({
            'X-access-token': file.project.token
        })
    })
    return await res.text()
}

export async function updateRemoteFile(file: DocumentFile, content: string) {
    if (file.project.token === undefined) {
        return false
    }

    await fetch(file.project.path + '/doc/update/' + file.path, {
        method: 'PUT',
        body: content,
        headers: new Headers({
            'content-type': 'text/plain',
            'X-access-token': file.project.token
        })
    })
}