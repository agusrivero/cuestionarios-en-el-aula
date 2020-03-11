const Sequelize = require("sequelize");
const {models} = require("../models");
const url = require('url');


exports.allowConections = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
}

exports.index = (req, res, next) => {
    const quizId = req.params.id;
    models.pregunta.findAll({where: quizId})
    .then(preguntas => {
        res.send(preguntas)
    })
    .catch(error => next(error))
}

exports.newQuestion = (req, res, next) => {
    const {id} = req.params;
    //const quizId = id;
    //const {pr, respuesta, respuesta2, respuesta3, respuesta4} = req.body;
    const {question, correct_answer, incorrect_answer1, incorrect_answer2, incorrect_answer3} = req.body;
    console.log("BODDYYYYYY", req.body)
    /*const pregunta = models.pregunta.build({
        question,
        respuesta,
        respuesta2,
        respuesta3,
        respuesta4,
        quizId
    })*/
    const preg = models.pregunta.build({
        question: question,
        answer_correct: correct_answer,
        answer_incorrect1: incorrect_answer1,
        answer_incorrect2: incorrect_answer2,
        answer_incorrect3: incorrect_answer3,
        quizId: id
    })
    //console.log(pregunta instanceof models.pregunta)
    //pregunta.save({fields: ["question", "answer_correct", "answer_incorrect1", "answer_incorrect2", "answer_incorrect3", "quizId"]})
    preg.save()
    .then(pregunta => {
        console.log("OKKKK")
        models.quiz.findByPk(id)
        .then(quiz => {
            res.send(true)
        })
    })
}

exports.deleteQuestion = (req, res, next) => {
    const {quizId, id} = req.params;
    console.log("MY IDDDDDDDDD", quizId)
    models.pregunta.findByPk(id, {where: {quizId: quizId}})
    .then(pregunta => {
        pregunta.destroy() 
        res.send(true)
    })
    .catch(error => next(error))
}

exports.editQuestion = (req, res, next) => {
    const id = req.params.id;
    const {question, correct_answer, incorrect_answer1, incorrect_answer2, incorrect_answer3} = req.body;
    models.pregunta.findByPk(id)
    .then(pregunta => {
        pregunta.question = question
        pregunta.answer_correct = correct_answer
        pregunta.answer_incorrect1 = incorrect_answer1
        pregunta.answer_incorrect2 = incorrect_answer2
        pregunta.answer_incorrect3 = incorrect_answer3
        pregunta.save({fields: ["question", "answer_correct", "answer_incorrect1", "answer_incorrect2", "answer_incorrect3"]})
        .then(pregunta => {
            
            res.send(pregunta)
        })
    })
    .catch(error => next(error))
}

exports.getQuestion = (req, res, next) => {
    const id = req.params.id
    models.pregunta.findByPk(id)
    .then(pregunta => {
        res.send(pregunta)
    })
    .catch(error => next(error))
}


