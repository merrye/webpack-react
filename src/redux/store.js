import { createStore, applyMiddleware } from 'redux'
import conbineReducers from './reducers'
// import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from './middleware/promiseMiddleware'

let store = createStore(conbineReducers, applyMiddleware(promiseMiddleware))

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextCombineReducers = require('./reducers').default
    store.replaceReducer(nextCombineReducers)
  })
}

export default store
