const express = require('express');
const answerRouter = express.Router();
const answerController = require('./answers.Controller');
const { verfyToken } = require('../../middlewares/jwt');
answerRouter
    .route('/:quizId/answer')
    .post(verfyToken, answerController.getAnswers);
// .post(verfyToken, quizController.answers);

// quizRouter.route('/quizbycategory').get(quizController.getQuizViaCategory);

// // Quiz
// quizRouter.route('/test/:quizId').get(quizController.getQuiz);

// quizRouter.route('/last_exam').get(quizController.getLastExam);
module.exports = answerRouter;
