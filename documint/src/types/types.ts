export type Project = {
    name: string,
    type: "LOCAL" | "REMOTE",
    path: string,
    token?: string,
}

export type DocumentFile = {
    name: string,
    project: Project,
    path: string,
    category: string | undefined,
    lastReadTimestamp?: number
}

export type RemoteFile = {
    id: string,
    name: string,
    category: string | undefined,
}

export type TimestampedContent = {
    content: string,
    readTimestamp: number
}