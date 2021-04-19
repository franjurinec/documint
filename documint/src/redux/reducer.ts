import { Action } from "./actions"

export interface GlobalState {
    projects: string[]
    projectOpen: boolean,
    projectName: string,
    files: string[],
    openFile: string,
    displayedContent: string,
    windowMaximized: boolean
}

const initialState = {
    projects: [],
    projectOpen: false,
    projectName: "",
    files: [],
    openFile: "",
    displayedContent: "<p>No project is open.</p>",
    windowMaximized: true
}

export const projectReducer = (state: GlobalState = initialState, action: Action) => {
    switch (action.type) {
        case "SET_CONTENT":
            return { ...state, displayedContent: action.payload }
        case "LOAD_FILES":
            return { ...state, files: action.payload }
        case "SET_PROJECT":
            return { ...state, projectName: action.payload }
        case "OPEN_PROJECT":
            return { ...state, projectOpen: true }
        case "SET_MAXIMIZED":
            return { ...state, windowMaximized: action.payload }
        case "SET_OPEN_FILE":
            return { ...state, openFile: action.payload }
        case "LOAD_PROJECTS":
            return { ...state, projects: action.payload }
        default:
            return state
    }
}