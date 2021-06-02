import { DocumentFile, Project, RemoteFile, TimestampedContent } from "../types/types"

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

    let files = await fetch(currentProject.path + '/doc/all', {
        headers: new Headers({
            'X-access-token': currentProject.token
        })
    }).then(res => res.json()) as RemoteFile[]

    console.log(files)

    return files.map<DocumentFile>(file => {
        return {
            name: file.name,
            project: currentProject,
            category: file.category,
            path: file.id
        }
    })
}

export async function readRemoteFile(file: DocumentFile): Promise<TimestampedContent> {
    if (file.project.token === undefined) {
        return {
            content: "Failed to fetch remote file.",
            readTimestamp: Date.now()
        }
    }

    const res = await fetch(file.project.path + '/doc/' + file.path, {
        headers: new Headers({
            'X-access-token': file.project.token
        })
    })

    return await res.json() as TimestampedContent
}

export async function updateRemoteFile(file: DocumentFile, content: string) {
    if (file.project.token === undefined) {
        return false
    }

    await fetch(file.project.path + '/doc/update/' + file.path, {
        method: 'PUT',
        headers: new Headers({
            'content-type': 'application/json',
            'X-access-token': file.project.token
        }),
        body: JSON.stringify({
            content: content,
            readTimestamp: file.lastReadTimestamp
        })
    })
}

export async function deleteRemoteFile(file: DocumentFile) {
    if (file.project.token === undefined) {
        return false
    }

    await fetch(file.project.path + '/doc/delete/' + file.path, {
        headers: new Headers({
            'X-access-token': file.project.token
        })
    })

    return false
}

export async function addRemoteFile(file: DocumentFile) {
    if (file.project.token === undefined) {
        return false
    }

    await fetch(file.project.path + '/doc/create/', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
            'X-access-token': file.project.token
        }),
        body: JSON.stringify({name: file.name, category: file.category})
    })

    return false
}