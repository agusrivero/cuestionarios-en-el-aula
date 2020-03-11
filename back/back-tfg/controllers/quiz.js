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
        userId: ownerId
    })

    quiz.save()
    .then(quiz => {
        // res.redirect('/view/quizzes')
        //res.render('user/questions/new', {quiz, questionsLeft})
        res.send(quiz)
    })
    .catch(error => next(error))
}

exports.deleteQuiz = (req, res, next) => {
    const quizId = req.params.id;
    models.quiz.findByPk(quizId)
    .then(quiz => {
        quiz.destroy()
        models.pregunta.destroy({where: {quizId: quiz.id}})
        res.send(true)
    })
    .catch(error => next(error))
}

exports.viewQuiz = (req, res, next) => {
    const quizId = req.params.id;
    models.quiz.findByPk(quizId, {include: [models.alumno, models.pregunta]})
    .then(quiz => {
        res.send(quiz)
        /*models.pregunta.findAll({where: {quizId: quiz.id}})
        .then(preguntas => {
            models.alumno.findAll({where: {quizId: quiz.id}})
            .then(alumnos => {
                res.send({quiz, preguntas, alumnos})
            })
            
        })*/
        
    })
    .catch(error => next(error))
}

exports.viewAlumnos = (req, res, next) => {
    const id = req.params.id;
    models.alumno.findAll({where: {quizId: id}})
    .then(alumnos => {
        res.send(alumnos)
    })
}

exports.startQuiz = (req, res, next) => {
    const id = req.params.id;
    models.quiz.findByPk(id)
    .then(quiz => {
        quiz.started = true;
        quiz.save()
        res.send(quiz)
    })
    .catch(error => next(error))
}

exports.checkStarted = (req, res, next) => {
    const accessId = req.params.accessId;
    models.quiz.findOne({where: {accessId: accessId}})
    .then(quiz => {
        if(quiz.started){
            res.send(true)
        }else{
            res.send(false)
        }
    })
    .catch(error => next(error))
}