var express = require('express');
var multer = require('multer');
var router = express.Router();
var quizController=require('../controllers/quiz_controller');
var commentController=require('../controllers/comment_controller');
var sessionController=require('../controllers/session_controller');
var userController=require('../controllers/user_controller');
var authorController=require('../controllers/author_controller');
var favController = require('../controllers/favourites_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz Show', errors: []});
});
router.param('quizId', quizController.load);
router.param('commentId', commentController.load);
router.param('userId', userController.load);


router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

router.get('/user', userController.new); // formulario sign un
router.post('/user', userController.create); // registrar usuario
router.get('/user/:userId(\\d+)/edit', sessionController.auto_logout, sessionController.loginRequired, userController.ownershipRequired, userController.edit);
router.put('/user/:userId(\\d+)', sessionController.auto_logout, sessionController.loginRequired, userController.ownershipRequired, userController.update);
router.delete('/user/:userId(\\d+)', sessionController.auto_logout, sessionController.loginRequired, userController.ownershipRequired, userController.destroy);
router.get('/user/:userId(\\d+)/quizes', quizController.index); 

router.get('/quizes', sessionController.auto_logout, quizController.index);
router.get('/quizes/:quizId(\\d+)', sessionController.auto_logout, quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', sessionController.auto_logout, quizController.answer);

router.get('/quizes/new', sessionController.auto_logout, sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.auto_logout, sessionController.loginRequired, multer({ dest: './public/media/'}), quizController.create);
router.put('/quizes/:quizId(\\d+)', sessionController.auto_logout, sessionController.loginRequired, multer({ dest: './public/media/'}), quizController.ownershipRequired, quizController.update);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.auto_logout, sessionController.loginRequired, quizController.ownershipRequired, quizController.edit);
router.delete('/quizes/:quizId(\\d+)', sessionController.auto_logout, sessionController.loginRequired, quizController.ownershipRequired, quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', sessionController.auto_logout, commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', sessionController.auto_logout, commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.auto_logout, sessionController.loginRequired, commentController.ownershipRequired, commentController.publish);

router.get('/author', sessionController.auto_logout, authorController.author);
router.get('/quizes/statistics', sessionController.auto_logout, quizController.statistics);

// Definición de rutas de favoritos
router.get('/user/:userId(\\d+)/favourites',  favController.show);  // ver los favoritos de un usuario
router.put('/user/:userId(\\d+)/favourites/:quizId(\\d+)',  sessionController.loginRequired, favController.update);
router.delete('/user/:userId(\\d+)/favourites/:quizId(\\d+)',  sessionController.loginRequired, favController.destroy)



module.exports = router;
