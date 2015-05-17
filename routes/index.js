var express = require('express');
var router = express.Router();
var quizController=require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz Show', errors: []});
});
router.param('quizId', quizController.load);
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);

/* GET author page. */
router.get('/author', function(req, res) {
  res.render('author');
});

module.exports = router;
