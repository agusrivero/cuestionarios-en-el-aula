import {SET_QUESTION} from '../actions/constants'

const initialState = {
    preguntas: []
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_QUESTION:
            return {
                ...state,
                preguntas: action.payload
            }
        default:
            return state
    }
}