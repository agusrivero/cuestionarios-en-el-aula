import {GET_USERS, GET_USER} from '../actions/constants';

const intialState = {
    user: {},
    users: []
}

export default function(state = intialState, action){
    switch(action.type){
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}