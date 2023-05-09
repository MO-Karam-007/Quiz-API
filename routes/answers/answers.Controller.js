const Question = require('../../models/Questions');
const Submit = require('../../models/Submit');
const axios = require('axios');
const Score = require('../../models/Score');
exports.getAnswers = async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const score = 0;
        const { answer } = req.body;
        const userId = req.user._id;
        const questionId = req.query.q1;
        const question = await Question.find({ _id: questionId });
        const quiz = await axios.get(`http://localhost:5050/v1/test/${quizId}`);
        const { questions } = quiz.data;

        if (!answer) {
            throw new Error('Select one option');
        }

        const questionCheck = questions.find((q) => q._id == questionId);
        if (questionCheck.correct_answer == answer) {
            score++;
        }

        const submittedAnswer = await Submit.create({
            answer: JSON.parse(answer),
            userId,
            questionId,
        });
        const degree = await Score.create({
            score,
            userId,
            quizId,
        });

        res.json({
            submittedAnswer,
            degree,
        });
    } catch (error) {
        res.status(401).json({
            msg: error.message,
        });
    }
};
