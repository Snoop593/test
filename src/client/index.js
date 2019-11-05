import React from 'react'
import {hydrate} from 'react-dom'
import {Provider} from 'react-redux'
import App from './components/app'
import reducer from './redux/reducers/reducers.js'
import {createStore, applyMiddleware}  from 'redux'
import thunkMiddleware from 'redux-thunk'

const state = window.__STATE__;

 const store = createStore(
    reducer,
    state,
    applyMiddleware(
      thunkMiddleware
    )
)	

hydrate(
  <Provider store={store} >
     <App />
  </Provider>,
  document.querySelector('#root')
)
