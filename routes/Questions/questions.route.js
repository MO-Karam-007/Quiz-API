const express = require('express');
const quizRouter = express.Router();
const quesController = require('./questions.Controller');
const { verfyQuizToken } = require('../../middlewares/jwt');
quizRouter
    .route('/questions')
    .get(verfyQuizToken, quesController.getQuizQues)
    .post(verfyQuizToken, quesController.createQues);

//NEW
quizRouter.route('/questionsbank').get(quesController.questionsBank);
quizRouter.route('/question/:_id').delete(quesController.deleteQuestion);
module.exports = quizRouter;
