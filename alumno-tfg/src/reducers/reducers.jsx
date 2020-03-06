import {combineReducers} from 'redux';
import loginReducer from './login_reducer'
import userReducer from './user_reducer'
import quizReducer from './quiz_reducer'
import questionReducer from './pregunta_reducer'

const GlobalState = (combineReducers({
    login: loginReducer,
    user: userReducer,
    quiz: quizReducer,
    questions: questionReducer
}))

export default GlobalState;