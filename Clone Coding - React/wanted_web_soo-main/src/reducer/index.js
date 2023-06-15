import {combineReducers} from 'redux'
import signupReducer from './signupReducer'
import tokenReducer from './tokenReducer'
import bookmarkReducer from './bookmarkReducer'
import modalReducer from './modalReducer'
const rootReducer = combineReducers({
    signupReducer, tokenReducer, bookmarkReducer, modalReducer
})

export default rootReducer