type SetContentAction = { type: "SET_CONTENT", payload: string }
type LoadFilesAction = { type: "LOAD_FILES", payload: string[] }
type SetProjectAction = { type: "SET_PROJECT", payload: string }
type MaximizeWindowAction = { type: "SET_MAXIMIZED", payload: boolean }
type SetOpenFileAction = { type: "SET_OPEN_FILE", payload: string }
type LoadProjectsAction = { type: "LOAD_PROJECTS", payload: string[] }
type OpenProjectAction = {type: "OPEN_PROJECT" }

export type Action = SetContentAction
    | LoadFilesAction
    | SetProjectAction
    | MaximizeWindowAction
    | SetOpenFileAction
    | LoadProjectsAction
    | OpenProjectAction

export const setContent = (content: string): Action => ({
    type: "SET_CONTENT",
    payload: content
})

export const loadFiles = (files: string[]): Action => ({
    type: "LOAD_FILES",
    payload: files
})

export const loadProjects = (projects: string[]): Action => ({
    type: "LOAD_PROJECTS",
    payload: projects
})

export const setProject = (projectName: string): Action => ({
    type: "SET_PROJECT",
    payload: projectName
})

export const openProject = (): Action => ({
    type: "OPEN_PROJECT"
})

export const setWindowMaximized = (maximized: boolean): Action => ({
    type: "SET_MAXIMIZED",
    payload: maximized
})

export const setOpenFile = (fileName: string): Action => ({
    type: "SET_OPEN_FILE",
    payload: fileName
})