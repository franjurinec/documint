type LoadFilesAction = { type: "SET_FILES_LIST", payload: string[] }
type SetProjectAction = { type: "SET_PROJECT", payload: string }
type MaximizeWindowAction = { type: "SET_MAXIMIZED", payload: boolean }
type SetOpenFileAction = { type: "SET_OPEN_FILE", payload: string }
type setProjectListAction = { type: "SET_PROJECTS_LIST", payload: string[] }

export type Action = LoadFilesAction
    | SetProjectAction
    | MaximizeWindowAction
    | SetOpenFileAction
    | setProjectListAction

export const setFilesList = (files: string[]): Action => ({
    type: "SET_FILES_LIST",
    payload: files
})

export const setProjectList = (projects: string[]): Action => ({
    type: "SET_PROJECTS_LIST",
    payload: projects
})

export const setProject = (projectName: string): Action => ({
    type: "SET_PROJECT",
    payload: projectName
})

export const setWindowMaximized = (maximized: boolean): Action => ({
    type: "SET_MAXIMIZED",
    payload: maximized
})

export const setOpenFile = (fileName: string): Action => ({
    type: "SET_OPEN_FILE",
    payload: fileName
})