import { createStore } from 'redux'
import { projectReducer } from './reducers/projectReducer'

export const store = createStore(projectReducer)