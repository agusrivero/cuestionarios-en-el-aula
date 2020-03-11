import axios from 'axios'
import {SET_QUIZ, GET_QUIZZES, QUIZ_STARTED} from './constants'
import {setQuestion, deleteQuestion} from './question_actions'

export const createQuiz = (quizName, ownerId, qNumber, history) => dispatch => {
    axios.post('/create/quiz', {quizName, ownerId, qNumber})
    .then(res => {
        
        const quiz = res.data
        
        dispatch(setQuiz(quiz))
        //history.push('/quiz/'+quiz.id+'/add')
        history.push('/view/quiz/'+quiz.id)
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
        //console.log("Mi quiz en las actions", res.data)
        dispatch(setQuiz(res.data))
        dispatch(setQuestion(res.data.pregunta))
    })
}

export const deleteQuiz = id => dispatch => {
    axios.delete('/quiz/'+id+'/delete')
    .then(res => {
        console.log("Deleted")
        //dispatch(deleteQuestion(id))
    })
}

export const startQuiz = id => dispatch => {
    axios.post('/quiz/start/'+id)
    .then(res => {
        console.log("Quiz started", res.data)
    })
}

/*export const checkQuiz = accessId => dispatch => {
    axios.get('/quiz/started/'+accessId)
    .then(res => {

    })
}*/