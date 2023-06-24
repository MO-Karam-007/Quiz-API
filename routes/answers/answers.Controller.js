const Submit = require('../../models/Submit');
const Quiz = require('../../models/Quiz');
const User = require('../../models/User');

exports.getAnswers = async (req, res) => {
    try {
        const options = {
            upsert: true, // if not found will insert if found will update
            new: true, // Return the updated document
        };
        const quizId = req.params.quizId;
        const submitedAnswers = [];
        let score = 0;
        var userId = req.tokenValue._id;
        userId = await User.findById(userId);

        //Check User If student
        if (userId.role != 'student') {
            throw new Error('Submition for students only');
        }
        //Check If submitted before
        const submittedBefore = await Submit.findOne({
            quizId,
            userId,
        });

        if (submittedBefore) {
            throw new Error('You submitted this exam before');
        }
        // Take the answers
        const { answers } = req.body;
        const quiz = await Quiz.findById(quizId).populate('questions');

        if (!quiz) {
            throw new Error('Quiz not found');
        }
        //What is happining behind the scene to submit answers
        // Compere correct answers with correct answers
        const questions = quiz.questions;
        const correct_answers = questions.map((value) => {
            return {
                correctAnswer: value.correctAnswer,
            };
        });

        for (let i = 0; i < questions.length; i++) {
            const answer = answers[i];

            if (questions[i].type == 'multiple_choice') {
                console.log(questions[i].correctAnswer, '=====', answer);
                console.log(questions[i].correctAnswer == answer);

                console.log(`----------------------- multiple_choice`);
                questions[i].correctAnswer === answer ? score++ : score;
                console.log(`score`, score);

                submitedAnswers.push(answer);
            } else if (questions[i].type == 'true_false') {
                console.log(questions[i].correctAnswer, '=====', answer);
                console.log(questions[i].correctAnswer == answer);

                console.log(`----------------------- true_false`);
                questions[i].correctAnswer === answer ? score++ : score;
                console.log(`score`, score);

                submitedAnswers.push(answer);
            } else if (questions[i].type == 'open_ended') {
                score++;

                submitedAnswers.push(answer);
            }
        }

        const addSubmition = await Submit.create({
            userId,
            quizId,
            score,
            answer: submitedAnswers,
        });
        // await Score.create({
        //     userId,
        //     quizId,
        //     score,
        // });
        res.json({
            addSubmition,
            correct_answers,
        });
    } catch (error) {
        res.status(401).json({
            msg: error.message,
        });
    }
};

exports.getDegress = async (req, res) => {
    try {
        var userId = req.tokenValue._id;
        // Collect data using map method to response with required data
        var score = await Submit.find({ userId })
            .populate('quizId')
            .sort({ createAt: 1 });
        var degress = score.map((value) => {
            return {
                _id: value.quizId._id,
                title: value.quizId.title,
                score: value.score,
                description: value.quizId.description,
                category: value.quizId.category,
            };
        });

        res.json({ degress });
    } catch (error) {
        res.json({
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
