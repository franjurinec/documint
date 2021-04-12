import { createStore } from 'redux'
import { projectReducer } from './reducer'

export const store = createStore(projectReducer)