const express = require('express');
const quizRouter = express.Router();
const quesController = require('./questions.Controller');
const {verfyQuizToken} = require('../../middlewares/jwt')
quizRouter
    .route('/questions')
    .get(verfyQuizToken, quesController.getQuizQues)
    .post(verfyQuizToken, quesController.createQues);
// quizRouter.route('/quiz/:id')
// quizRouter.route('/createTask').post();
// quizRouter.route('/getResult');
// quizRouter.route('/getResults');
module.exports = quizRouter;
