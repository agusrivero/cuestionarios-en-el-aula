import axios from 'axios'

import {SET_QUESTION, SET_QUESTIONS} from './constants'

export const newQuestion = (quizId, pregunta, history) => disptach => {
    const question = pregunta.question;
    const correct_answer = pregunta.correct_answer;
    const incorrect_answer1 = pregunta.answer2;
    const incorrect_answer2 = pregunta.answer3;
    const incorrect_answer3 = pregunta.answer4;
    axios.post('/new/question/'+quizId, {question, correct_answer, incorrect_answer1, incorrect_answer2, incorrect_answer3})
    .then(res => {
        console.log("Added")
        history.push('/view/quiz/'+quizId)
    })
}

export const setQuestion = preguntas => disptach => {
    
        disptach({
            type: SET_QUESTIONS,
            payload: preguntas
        })
   
    
}

export const getQuestion = id => dispatch => {
    axios.get('/get/question/'+id)
    .then(res => {
        console.log("Mi pregunta a editar", res.data)
        dispatch({
            type: SET_QUESTION,
            payload: res.data
        })
    })
}

export const deleteQuestion = (id, quizId) => dispatch => {
    //const quizId = state.quizId
    //const id = state.id
    axios.delete('/quiz/'+quizId+'/delete/question/'+id)
    .then(res => {
        console.log("Deleted")
    })
}  

export const editQuestion = (id, pregunta, history) => dispatch => {
    console.log("entrando en el put")
    const question = pregunta.question;
    const correct_answer = pregunta.correct_answer;
    const incorrect_answer1 = pregunta.answer2;
    const incorrect_answer2 = pregunta.answer3;
    const incorrect_answer3 = pregunta.answer4;
    axios.put('/edit/question/'+id, {question, correct_answer, incorrect_answer1, incorrect_answer2, incorrect_answer3})
    .then(res => {
        console.log("Question Edited", res.data)
        history.push('/view/quiz/'+res.data.quizId)
    })
}
