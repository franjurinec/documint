import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { App } from '../react/App'
import { store } from '../redux/store'

// Initialize react root
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
