const express = require('express');
const quizRouter = express.Router();
const quizController = require('./quiz.Controller');
const { generateToken, verfyToken } = require('../../middlewares/jwt');

quizRouter
    .route('/quiz')
    .get(verfyToken, quizController.getUserQuiz)
    .post(verfyToken, quizController.createQuiz);

quizRouter.route('/quizbycategory').get(quizController.getQuizViaCategory);
quizRouter.route('/test/:quizId').get(quizController.getQuiz);

quizRouter.route('/last_exam').get(quizController.getLastExam);
module.exports = quizRouter;
