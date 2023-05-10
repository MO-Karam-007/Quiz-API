const express = require('express');
const scoreController = require('./score.Controller');
const scoreRoute = express.Router();
const { verfyToken } = require('../../middlewares/jwt');
scoreRoute.route('/:quizId/score').get(verfyToken, scoreController.getScore);

scoreRoute.route('/quizzes_score').get(verfyToken, scoreController.getScores);

module.exports = scoreRoute;
