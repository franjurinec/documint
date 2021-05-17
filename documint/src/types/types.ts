export type Project = {
    name: string,
    type: "LOCAL" | "REMOTE",
    path: string,
    token?: string,
}

export type DocumentFile = {
    name: string
    project: Project,
    path: string
}