export type Project = {
    name: string,
    type: "LOCAL" | "REMOTE",
    path: string,
}

export type DocumentFile = {
    name: string
    path: string
}