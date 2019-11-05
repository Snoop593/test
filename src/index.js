import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import App from './client/components/App'
import {createStore, applyMiddleware}  from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './client/redux/reducers/reducers.js'

export default function render (initialState) {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      thunkMiddleware
    )
)	

  const content = renderToString(
    <Provider store={store} >
       <App />
    </Provider>
  );

  const preState = store.getState()
  return {content, preState};
}