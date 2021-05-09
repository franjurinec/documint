import { Project, DocumentFile } from "../types/types"
import { Action } from "./actions"

export interface GlobalState {
    projects: Project[]
    currentProject: Project | undefined,
    files: DocumentFile[],
    currentFile: DocumentFile | undefined,
    windowMaximized: boolean
}

const initialState = {
    projects: [],
    currentProject: undefined,
    files: [],
    currentFile: undefined,
    windowMaximized: true
}

export const projectReducer = (state: GlobalState = initialState, action: Action) => {
    switch (action.type) {
        case "SET_MAXIMIZED":
            return { ...state, windowMaximized: action.payload }
        case "SET_PROJECTS_LIST":
            return { ...state, projects: action.payload }
        case "SET_FILES_LIST":
            return { ...state, files: action.payload }
        case "SET_OPEN_PROJECT":
            return { ...state, currentProject: action.payload }
        case "SET_OPEN_FILE":
            return { ...state, currentFile: action.payload }
        default:
            return state
    }
}