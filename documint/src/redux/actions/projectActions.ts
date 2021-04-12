export type Action = { type: "SET_CONTENT", payload: string }

export const setContent = (content: string): Action => ({
    type: "SET_CONTENT",
    payload: content
})