import axios from 'axios'
import {SET_QUIZ, GET_QUIZZES} from './constants'

export const createQuiz = (quizName, ownerId) => dispatch => {
    axios.post('/create/quiz', {quizName, ownerId})
    .then(res => {
        const quiz = {
            quizName: res.data.name,
            ownerId: res.data.userId
        }
        dispatch(setQuiz(quiz))
    })
}

export const setQuiz = quiz => {
    return {
        type: SET_QUIZ,
        payload: quiz
    }
}

export const getQuizzes = id => dispatch => {

    axios.get('/view/quizzes/'+id)
    .then(res => {
        console.log("Mis quizzes action: ", res.data)
        dispatch({
            type: GET_QUIZZES,
            payload: res.data
        })
    })
}

export const deleteQuiz = id => dispatch => {
    axios.delete('/quiz/'+id+'/delete')
    .then(res => {
        console.log("Deleted")
    })
}