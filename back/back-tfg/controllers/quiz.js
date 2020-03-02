const Sequelize = require("sequelize");
const {models} = require("../models");
const url = require('url');

exports.index = (req, res, next) => {
    const id = req.session.user.id;
    models.user.findByPk(id)
    .then(user => {
        const userId = user.id;
        models.quiz.findAll({where: {userId}})
        .then(quizzes => {
            res.render('user/quizzes', {quizzes})
        })
    })
    .catch(error => next(error))
    // const userId = req.session.user.id;
    // models.quiz.findAll({where:userId})
    // .then(quizzes => {
    //     res.render('user/quizzes', {quizzes})
    // })
    // .catch(error => next(error))
};

exports.newQuiz = (req, res, next) => {
    res.render('user/newQuiz');
}

exports.createQuiz = (req, res, next) => {
    const {quizName, questionNumber} = req.body;
    const accessId = Math.floor(Math.random() * 10000);
    const questionsLeft = questionNumber;

    const quiz = models.quiz.build({
        accessId: accessId,
        name: quizName,
        questionNumber: questionNumber,
        userId: req.session.user.id
    })

    quiz.save()
    .then(quiz => {
        // res.redirect('/view/quizzes')
        res.render('user/questions/new', {quiz, questionsLeft})
    })
}

exports.deleteQuiz = (req, res, next) => {
    const quizId = req.params.id;
    models.quiz.findByPk(quizId)
    .then(quiz => {
        quiz.destroy()
        res.redirect('/view/quizzes')
    })
    .catch(error => next(error))
}

exports.viewQuiz = (req, res, next) => {
    const quizId = req.params.id;
    models.quiz.findByPk(quizId)
    .then(quiz => {
        models.pregunta.findAll({where: quiz.id})
        .then(preguntas => {
            res.render('user/quiz', {quiz, preguntas})
        })
        
    })
}