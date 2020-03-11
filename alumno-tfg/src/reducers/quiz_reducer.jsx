import {SET_QUIZ, GET_QUIZZES, QUIZ_STARTED} from '../actions/constants';

const initialState = {
    quiz: {},
    quizzes: [],
    started: false
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_QUIZ:
            return {
                ...state,
                quiz: action.payload
            }
        case GET_QUIZZES:
            return {
                ...state,
                quizzes: action.payload
            }
        case QUIZ_STARTED:
            return {
                ...state,
                strated: action.payload
            }
        default:
            return state;
    }
}