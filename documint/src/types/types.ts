export type Project = {
    name: string,
    type: "LOCAL" | "REMOTE",
    path: string,
    username?: string,
    password?: string,
    token?: string,
}

export type DocumentFile = {
    name: string
    project: Project,
    path: string
}