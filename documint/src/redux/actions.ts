import { DocumentFile, Project } from "../types/types"


type MaximizeWindowAction = { type: "SET_MAXIMIZED", payload: boolean }
type SetFileListAction = { type: "SET_FILES_LIST", payload: DocumentFile[] }
type SetOpenFileAction = { type: "SET_OPEN_FILE", payload: DocumentFile }
type SetProjectListAction = { type: "SET_PROJECTS_LIST", payload: Project[] }
type SetOpenProjectAction = { type: "SET_OPEN_PROJECT", payload: Project|undefined }
type AddProjectToListAction = { type: "ADD_PROJECT_TO_LIST", payload: Project }

export type Action = MaximizeWindowAction
    | SetFileListAction
    | SetOpenFileAction
    | SetProjectListAction
    | SetOpenProjectAction
    | AddProjectToListAction

export const setFilesList = (files: DocumentFile[]): Action => ({
    type: "SET_FILES_LIST",
    payload: files
})

export const setOpenFile = (fileName: DocumentFile): Action => ({
    type: "SET_OPEN_FILE",
    payload: fileName
})

export const setProjectList = (projects: Project[]): Action => ({
    type: "SET_PROJECTS_LIST",
    payload: projects
})

export const addProjectToList = (project: Project): Action => ({
    type: "ADD_PROJECT_TO_LIST",
    payload: project
})

export const setOpenProject = (projectName: Project|undefined): Action => ({
    type: "SET_OPEN_PROJECT",
    payload: projectName
})

export const setWindowMaximized = (maximized: boolean): Action => ({
    type: "SET_MAXIMIZED",
    payload: maximized
})