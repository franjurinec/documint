type SetContentAction = { type: "SET_CONTENT", payload: string }
type LoadFilesAction = { type: "LOAD_FILES", payload: string[] }

export type Action = SetContentAction | LoadFilesAction

export const setContent = (content: string): Action => ({
    type: "SET_CONTENT",
    payload: content
})

export const loadFiles = (files: string[]) => ({
    type: "LOAD_FILES",
    payload: files
})