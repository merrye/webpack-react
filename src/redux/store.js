import { createStore, applyMiddleware } from 'redux'
import conbineReducers from './reducers'
import thunkMiddleware from 'redux-thunk'

let store = createStore(conbineReducers, applyMiddleware(thunkMiddleware))

export default store
