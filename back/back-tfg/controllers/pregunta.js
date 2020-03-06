const Sequelize = require("sequelize");
const {models} = require("../models");
const url = require('url');


exports.allowConections = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
}

exports.index = (req, res, next) => {
    const quizId = req.params;
    models.quiz.findByPk(quizId)
    .then(quiz => {
        res.send(quiz.pregunta)
    })
    .catch(error => next(error))
}

exports.newQuestion = (req, res, next) => {
    const {id} = req.params;
    const quizId = id;
    const {question, respuesta, respuesta2, respuesta3, respuesta4} = req.body;
    console.log(req.body)
    const pregunta = models.pregunta.build({
        question,
        respuesta,
        respuesta2,
        respuesta3,
        respuesta4,
        quizId
    })
    //console.log(pregunta instanceof models.pregunta)
    pregunta.save({fields: ["question", "answer_correct", "answer_incorrect1", "answer_incorrect2", "answer_incorrect3", "quizId"]})
    .then(pregunta => {
        console.log("OKKKK")
        models.quiz.findByPk(id)
        .then(quiz => {
            res.send(true)
        })
    })
}


