const express = require('express');
const quizRouter = express.Router();
const quizController = require('./quiz.Controller');
const { generateToken, verfyToken } = require('../../middlewares/jwt');

quizRouter
    .route('/quiz')
    .get(verfyToken, quizController.getUserQuiz)
    .post(verfyToken, quizController.createQuiz);

module.exports = quizRouter;
