import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './redux/ReduxStore'
import { Provider } from 'react-redux'


const virtualDom=ReactDOM.createRoot(document.getElementById('root'))
virtualDom.render(<Provider store={store}><App/></Provider>)
