import {combineReducers} from 'redux';
import loginReducer from './login_reducer'

const GlobalState = (combineReducers({
    login: loginReducer
}))

export default GlobalState;