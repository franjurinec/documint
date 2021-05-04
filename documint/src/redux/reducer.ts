import { Action } from "./actions"

export interface GlobalState {
    projects: string[]
    projectName: string,
    files: string[],
    openFile: string,
    windowMaximized: boolean
}

const initialState = {
    projects: [],
    projectName: "",
    files: [],
    openFile: "",
    windowMaximized: true
}

export const projectReducer = (state: GlobalState = initialState, action: Action) => {
    switch (action.type) {
        case "SET_FILES_LIST":
            return { ...state, files: action.payload }
        case "SET_PROJECT":
            return { ...state, projectName: action.payload }
        case "SET_MAXIMIZED":
            return { ...state, windowMaximized: action.payload }
        case "SET_OPEN_FILE":
            return { ...state, openFile: action.payload }
        case "SET_PROJECTS_LIST":
            return { ...state, projects: action.payload }
        default:
            return state
    }
}