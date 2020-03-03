import {combineReducers} from 'redux';
import loginReducer from './login_reducer'
import userReducer from './user_reducer'

const GlobalState = (combineReducers({
    login: loginReducer,
    user: userReducer
}))

export default GlobalState;