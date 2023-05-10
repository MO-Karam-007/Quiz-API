const Question = require('../../models/Questions');
const Submit = require('../../models/Submit');
const axios = require('axios');
const Score = require('../../models/Score');
const Quiz = require('../../models/Quiz');

exports.getAnswers = async (req, res) => {
    try {
        const answers = req.body.answers;
        const quizId = req.params.quizId;
        const userId = req.user._id;
        console.log(`answers`, answers);
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            throw new Error('Quiz not found');
        }

        const fullQuiz = await axios.get(
            `http://localhost:5050/v1/test/${quizId}`
        );
        const { questions } = fullQuiz.data;
        console.log(`questions.length`, questions.length);
        for (let i = 0; i < questions.length; i++) {
            const questionId = questions[i]._id;
            const answer = answers[i];
            console.log(`questionId`, questionId);
            console.log(`answer`, answer);
            // Create a new Answer document for each question and answer
            const newAnswer = new Submit.create({
                userId,
                quizId,
                questionId,
                answer,
            });
            await newAnswer.save();
        }
        console.log(`Out`);
        res.json({
            newAnswer,
        });
    } catch (error) {}
};
// exports.getAnswers = async (req, res) => {
//     try {
//         const quizId = req.params.quizId;
//         var score = 0;
//         const { answer } = req.body;
//         const userId = req.user._id;
//         const questionId = req.query.q1;
//         const question = await Question.find({ _id: questionId });
//         const quiz = await axios.get(`http://localhost:5050/v1/test/${quizId}`);
//         const options = { upsert: true, new: true };
//         const { questions } = quiz.data;

//         if (!answer) {
//             throw new Error('Select one option');
//         }

//         const questionCheck = questions.find((q) => q._id == questionId);
//         console.log(`Here`);
//         if (questionCheck.correct_answer == JSON.parse(answer)) {
//             score = score + 1;
//         }
//         let submittedAnswer;
//         const findSubmit = await Submit.find({ userId, questionId });

//         if (findSubmit.length == 0) {
//             submittedAnswer = await Submit.create({
//                 userId,
//                 questionId,
//                 answer,
//             });
//         } else {
//             submittedAnswer = await Submit.updateOne(
//                 { userId, questionId },
//                 {
//                     answer,
//                 },
//                 { options }
//             );
//         }

//         const degree = await Score.create({
//             score,
//             userId,
//             quizId,
//         });

//         res.json({
//             submittedAnswer,
//             degree,
//         });
//     } catch (error) {
//         res.status(401).json({
//             msg: error.message,
//         });
//     }
// };
