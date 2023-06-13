const Submit = require('../../models/Submit');
const axios = require('axios');
const Question = require('../../models/Question');
const Quiz = require('../../models/Quiz');
const Score = require('../../models/Score');
const User = require('../../models/User');
exports.getAnswers = async (req, res) => {
    try {
        const options = {
            upsert: true,
            new: true, // Return the updated document
        };
        const quizId = req.params.quizId;
        const submitedAnswers = [];

        let score = 0;
        var userId = req.tokenValue._id;

        userId = await User.findById(userId);
        const { answers } = req.body;
        const quiz = await Quiz.findById(quizId).populate('questions');
        console.log(`1`);

        if (!quiz) {
            throw new Error('Quiz not found');
        }

        // const questtions = await Question.find({ quizId }).populate('quizId');

        // if (questtions.length === 0) {
        //     throw new Error('No questions found for the specified quiz ID');
        // }
        // console.log(`questions`, quiz.questions.map((value)=>{
        //     return {
        //         correctAnswer:
        //     }
        // }));
        // console.log(`Well 😂😂`);
        // const fullQuiz = {
        //     title: questtions[0].quizId['title'],
        //     category: questtions[0].quizId['category'],
        //     description: questtions[0].quizId['description'],
        //     questions: formatQuestions,
        // };
        // const fullQuiz = await axios.get(
        //     `https://good-lime-horse-robe.cyclic.app/v1/test/${quizId}`
        // );
        const questions = quiz.questions;
        console.log(`fullQuiz`, questions, questions.length);

        for (let i = 0; i < questions.length; i++) {
            const questionId = questions[i]._id;
            const answer = answers[i];

            // ["true","Layla","Layla","Layla",true,true,true]

            if (questions[i].type == 'multiple_choice') {
                console.log(questions[i].correctAnswer, '=====', answers[i]);
                console.log(questions[i].correctAnswer == answers[i]);

                console.log(`-----------------------`);
                questions[i].correctAnswer === answer ? score++ : score;
                console.log(`score`, score);

                // Create a new Answer document for each question and answer'
                const filters = {
                    userId: userId._id,
                    quizId,
                    questionId,
                };
                const update = {
                    userId: userId._id,
                    quizId,
                    questionId,
                    answer,
                };

                const newanswer = await Submit.findOneAndUpdate(
                    filters,
                    update,
                    options
                );
                console.log(`Working`);

                submitedAnswers.push(newanswer);
            } else if (questions[i].type == 'true_false') {
                console.log(
                    questions[i].correctAnswer,
                    '=====',
                    JSON.parse(answer)
                );

                console.log(`-----------------------`);
                questions[i].correctAnswer === JSON.parse(answer)
                    ? score++
                    : score;
                // Create a new Answer document for each question and answer'
                const filters = {
                    userId: userId._id,
                    quizId,
                    questionId,
                };
                const update = {
                    userId: userId._id,
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
                // questions[i].correct_answer === answer
                return score++;
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
