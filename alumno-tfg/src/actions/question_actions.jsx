import axios from 'axios'

import {SET_QUESTION} from './constants'

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
        type: SET_QUESTION,
        payload: preguntas
    })
}