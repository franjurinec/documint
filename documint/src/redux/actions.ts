type SetContentAction = { type: "SET_CONTENT", payload: string }
type LoadFilesAction = { type: "LOAD_FILES", payload: string[] }
type SetProjectAction = { type: "SET_PROJECT", payload: string }
type MaximizeWindowAction = { type: "SET_MAXIMIZED", payload: boolean }

export type Action = SetContentAction
    | LoadFilesAction
    | SetProjectAction
    | MaximizeWindowAction

export const setContent = (content: string): Action => ({
    type: "SET_CONTENT",
    payload: content
})

export const loadFiles = (files: string[]): Action => ({
    type: "LOAD_FILES",
    payload: files
})

export const setProject = (projectName: string): Action => ({
    type: "SET_PROJECT",
    payload: projectName
})

export const setWindowMaximized = (maximized: boolean): Action => ({
    type: "SET_MAXIMIZED",
    payload: maximized
})