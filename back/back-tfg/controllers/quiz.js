const Sequelize = require("sequelize");
const {models} = require("../models");
const url = require('url');

exports.allowConections = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
}

exports.index = (req, res, next) => {
    
    const id = req.params.id;
    models.user.findByPk(id)
    .then(user => {
        const userId = user.id;
        models.quiz.findAll({where: {userId}})
        .then(quizzes => {
            res.send(quizzes)
        })
    })
    .catch(error => next(error))
};

exports.newQuiz = (req, res, next) => {
    res.render('user/newQuiz');
}

exports.createQuiz = (req, res, next) => {
    const {quizName, ownerId} = req.body;
    const accessId = Math.floor(Math.random() * 10000);
    
    const quiz = models.quiz.build({
        accessId: accessId,
        name: quizName,
        questionNumber: 10,
        userId: ownerId
    })

    quiz.save()
    .then(quiz => {
        // res.redirect('/view/quizzes')
        //res.render('user/questions/new', {quiz, questionsLeft})
        res.send(quiz)
    })
}

exports.deleteQuiz = (req, res, next) => {
    const quizId = req.params.id;
    models.quiz.findByPk(quizId)
    .then(quiz => {
        quiz.destroy()
        res.send(true)
    })
    .catch(error => next(error))
}

exports.viewQuiz = (req, res, next) => {
    const quizId = req.params.id;
    models.quiz.findByPk(quizId)
    .then(quiz => {
        models.pregunta.findAll({where: quiz.id})
        .then(preguntas => {
            res.send({quiz, preguntas})
        })
        
    })
}