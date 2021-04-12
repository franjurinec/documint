import { Action } from "../actions/projectActions"

export interface ProjectState {
    displayedContent: string
}

const initialState = {
    displayedContent: "<p>No project is open.</p>"
}

export const projectReducer = (state: ProjectState = initialState, action: Action) => {
    switch (action.type) {
        case "SET_CONTENT":
            return { ...state, displayedContent: action.payload }
        default:
            return state
    }
}