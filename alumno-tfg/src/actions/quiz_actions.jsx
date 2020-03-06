import axios from 'axios'
import {SET_QUIZ, GET_QUIZZES} from './constants'
import {setQuestion} from './question_actions'

export const createQuiz = (quizName, ownerId, history) => dispatch => {
    axios.post('/create/quiz', {quizName, ownerId})
    .then(res => {
        
        const quiz = res.data
        
        dispatch(setQuiz(quiz))
        history.push('/quiz/'+quiz.id+'/add')
        console.log("Created", quiz)
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
       
        dispatch({
            type: GET_QUIZZES,
            payload: res.data
        })
    })
}

export const getQuiz = id => dispatch => {
    axios.get('/quiz/'+id+'/view')
    .then(res => {
        console.log("Mi data", res.data)
        dispatch(setQuiz(res.data.quiz))
        dispatch(setQuestion(res.data.preguntas))
    })
}

export const deleteQuiz = id => dispatch => {
    axios.delete('/quiz/'+id+'/delete')
    .then(res => {
        console.log("Deleted")
    })
}