import { Action } from "./actions"

export interface GlobalState {
    displayedContent: string,
    files: string[]
}

const initialState = {
    displayedContent: "<p>No project is open.</p>",
    files: []
}

export const projectReducer = (state: GlobalState = initialState, action: Action) => {
    switch (action.type) {
        case "SET_CONTENT":
            return { ...state, displayedContent: action.payload }
        case "LOAD_FILES":
            return {...state, files: action.payload}
        default:
            return state
    }
}