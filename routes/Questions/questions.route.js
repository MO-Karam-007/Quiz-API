const express = require('express');
const quizRouter = express.Router();
const quesController = require('./questions.Controller');
const { verfyToken } = require('../../middlewares/jwt');

// Rapid add
quizRouter
    .route('/questions')
    .get(verfyToken, quesController.getQuizQues)
    .post(verfyToken, quesController.createQues);

//NEW
quizRouter.route('/questionsbank').get(quesController.questionsBank);
quizRouter.route('/question/:id').delete(quesController.deleteQuestion);

// one Instructor add quiz instructor add to database from headers and quiz from :id
// quizRouter.route('/updateQuizQuestions/').post(quesController.addQuestions)
module.exports = quizRouter;
