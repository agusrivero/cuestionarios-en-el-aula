import axios from 'axios';
import {history} from '../helpers/history';
import {combineReducers} from 'redux';

import {LOGIN_REQUEST} from './actions';

function user(state = {}, action = {}){
    switch(action.type){
        case LOGIN_REQUEST:
            const session = {
                token: action.payload.data.id,
                user: action.payload.data.username
            }
            localStorage.setItem("session", JSON.stringify(session))
            return state = action.payload.data;
        default:
            return state;
    }
}

// function logged(state = false, action = {}){
//     switch(action.type){
//         case LOGIN_REQUEST:
//             return state = true
//         default:
//             return state;
//     }
// }

const GlobalState = (combineReducers({
    user
}));

export default GlobalState;