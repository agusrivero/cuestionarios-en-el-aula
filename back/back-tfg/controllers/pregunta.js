const Sequelize = require("sequelize");
const {models} = require("../models");
const url = require('url');

exports.newQuestion = (req, res, next) => {
    const {id, left} = req.params;
    const quizId = id;
    const {question, respuesta, respuesta2, respuesta3, respuesta4} = req.body;

    const pregunta = models.pregunta.build({
        question,
        respuesta,
        respuesta2,
        respuesta3,
        respuesta4,
        quizId
    })
    console.log(pregunta instanceof models.pregunta)
    pregunta.save({fields: ["question", "answer_correct", "answer_incorrect1", "answer_incorrect2", "answer_incorrect3", "quizId"]})
    .then(pregunta => {
        console.log("OKKKK")
        models.quiz.findByPk(id)
        .then(quiz => {
            left--;
            const questionsLeft = left;
            res.render('user/questions/new', {quiz, questionsLeft})
        })
    })
}


