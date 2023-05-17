const Submit = require('../../models/Submit');
const axios = require('axios');
const Quiz = require('../../models/Quiz');
const Score = require('../../models/Score');
exports.getAnswers = async (req, res) => {
    try {
        const options = {
            upsert: true,
            new: true, // Return the updated document
        };
        const quizId = req.params.quizId;
        const submitedAnswers = [];

        let score = 0;
        const userId = req.user._id;
        const answers = req.body.answers;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            throw new Error('Quiz not found');
        }

        const fullQuiz = await axios.get(
            `https://good-lime-horse-robe.cyclic.app/v1/test/${quizId}`
        );
        const { questions } = fullQuiz.data;

        

        for (let i = 0; i < questions.length; i++) {
            const questionId = questions[i]._id;
            const answer = answers[i];

            if (
                questions[i].type == 'true_false' ||
                questions[i].type == 'multiple_choice'
            ) {
                console.log(`I am in`);
                if (questions[i].correct_answer === JSON.parse(answer)) {
                    score++;
                }

                // Create a new Answer document for each question and answer'
                const filters = {
                    userId,
                    quizId,
                    questionId,
                };
                const update = {
                    userId,
                    quizId,
                    questionId,
                    answer,
                };

                const newanswer = await Submit.findOneAndUpdate(
                    filters,
                    update,
                    options
                );
                submitedAnswers.push(newanswer);
            } else if (questions[i].type == 'open_ended') {
                // answer
                
            }
        }

        await Score.findOneAndUpdate(
            { userId, quizId },
            { userId, quizId, score },
            options
        );

        res.json({
            score,
            submitedAnswers,
        });
    } catch (error) {
        res.status(401).json({
            msg: error.message,
        });
    }
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
