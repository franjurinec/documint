import { Action } from "../actions/projectActions"

export interface ProjectState {
    displayedContent: string,
    files: string[]
}

const initialState = {
    displayedContent: "<p>No project is open.</p>",
    files: []
}

export const projectReducer = (state: ProjectState = initialState, action: Action) => {
    switch (action.type) {
        case "SET_CONTENT":
            return { ...state, displayedContent: action.payload }
        case "LOAD_FILES":
            return {...state, files: action.payload}
        default:
            return state
    }
}