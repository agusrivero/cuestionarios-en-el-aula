const Sequelize = require("sequelize");
const {models} = require("../models");
const url = require('url');

exports.allowConections = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
}

exports.joinQuiz = (req, res, next) => {
    //const accesId = req.params.accesId;
    const {accessId, username} = req.body
    models.quiz.findOne({where: {accesId: accessId}})
    .then(quiz => {
        const alumno = models.alumno.build({
            username: username,
            quizId: quiz.id
        })
        alumno.save()
        res.send(true)
    })
    .catch(error => next(error))
}