var express = require('express');
var router = express.Router();

const sessionController = require("../controllers/session");
const userController = require("../controllers/user");
const quizController = require("../controllers/quiz");
const preguntaController = require("../controllers/pregunta");
const alumnoController = require("../controllers/alumno");

router.all('*', sessionController.deleteExpiredUserSession);

//-----------------------------------------------------------

// History: Restoration routes.

// Redirection to the saved restoration route.
function redirectBack(req, res, next) {
  const url = req.session.backURL || "/";
  delete req.session.backURL;
  res.redirect(url);
}

router.get('/goback', redirectBack);

// Save the route that will be the current restoration route.
function saveBack(req, res, next) {
  req.session.backURL = req.url;
  next();
}

// Restoration routes are GET routes that do not end in:
//   /new, /edit, /play, /check, /session, or /:id.
router.get([
  '/',
  '/admin',
  '/users',
  '/users/:id(\\d+)/quizzes',
  '/quizzes'], saveBack);

//-----------------------------------------------------------

router.all('*',sessionController.deleteExpiredUserSession);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


//routes for /session
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.delete('/logout', sessionController.destroy);

//edit user
router.get('/:id(\\d+)/edit', userController.viewUser);

//routes for /admin
router.get('/admin/create', sessionController.adminRequired, userController.newUser);
router.post('/admin/create', userController.createUser);
router.get('/admin/index', userController.index);
router.get('/admin/view/:id(\\d+)',sessionController.adminOrMyselfRequired, userController.viewUser);
router.get('/get/:id(\\d+)', userController.editUser);
router.put('/edit/:id(\\d+)', userController.edit);
router.delete('/admin/view/:id(\\d+)', userController.deleteUser);

//routes for /user
router.get('/user/:id(\\d+)', userController.viewUser);
router.get('/create/quiz', quizController.newQuiz);
router.get('/view/quizzes/:id(\\d+)', quizController.index);
router.get('/quiz/:id(\\d+)/view', quizController.viewQuiz);
router.post('/create/quiz', quizController.createQuiz);
router.delete('/quiz/:id(\\d+)/delete', quizController.deleteQuiz);

//rooutes for /quiz
router.post('/new/question/:id(\\d+)', preguntaController.newQuestion);
router.get('/quiz/alumnos', quizController.viewAlumnos);
router.post('/quiz/start/:id(\\d+)', quizController.startQuiz)
router.get('/quiz/started/:accessId(\\d+)', quizController.checkStarted)

//routes for /question
router.get('/quiz/:id(\\d+)/questions', preguntaController.index);
router.delete('/quiz/:quizId(\\d+)/delete/question/:id(\\d+)', preguntaController.deleteQuestion)
router.put('/edit/question/:id(\\d+)', preguntaController.editQuestion)
router.get('/get/question/:id(\\d+)', preguntaController.getQuestion)


//routes for /alumno
router.post('/alumno/join', alumnoController.joinQuiz)

module.exports = router;
