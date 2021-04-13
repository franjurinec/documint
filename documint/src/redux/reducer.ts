import { Action } from "./actions"

export interface GlobalState {
    displayedContent: string,
    files: string[],
    projectOpen: boolean
    projectName: string
    windowMaximized: boolean
}

const initialState = {
    displayedContent: "<p>No project is open.</p>",
    files: [],
    projectOpen: false,
    projectName: "",
    windowMaximized: true
}

export const projectReducer = (state: GlobalState = initialState, action: Action) => {
    switch (action.type) {
        case "SET_CONTENT":
            return { ...state, displayedContent: action.payload }
        case "LOAD_FILES":
            return {...state, files: action.payload}
        case "SET_PROJECT":
            return {...state, projectName: action.payload, projectOpen: true}
        case "SET_MAXIMIZED":
            return {...state, windowMaximized: action.payload}
        default:
            return state
    }
}