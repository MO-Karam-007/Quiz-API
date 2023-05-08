const Quiz = require('../../models/Quiz');
const { generateToken } = require('../../middlewares/jwt');
const jwt = require('jsonwebtoken');

exports.getUserQuiz = async (req, res) => {
    try {
        const createdBy = req.user._id;
        const quiz = await Quiz.find({ createdBy });
        const token = jwt.sign({ _id: quiz._id }, process.env.JWT_KEY, {
            expiresIn: '2h',
        });

        quiz.token = token;
        if (quiz.length === 0) {
            return res.send({
                msg: 'No quizzes found for the specified creator',
                token: quiz.token,
            });
        }

        res.json({
            quizes: quiz,
            token: quiz.token,
        });
    } catch (error) {
        res.json({
            status: 'fail',
            Error: error.message,
        });
    }
};

exports.createQuiz = async (req, res) => {
    if (req.user.role != 'instructor') throw new Error('You are not a teacher');
    console.log(`User `, req.user);
    try {
        const { description, title, photo } = req.body;
        const createdBy = req.user._id;
        const quiz = await Quiz.create({
            description,
            title,
            photo,
            createdBy,
        });

        const token = jwt.sign({ _id: quiz._id }, process.env.JWT_KEY, {
            expiresIn: '2h',
        });
        quiz.token = token;
        res.json({
            quizes: quiz,
            token: quiz.token,
        });
    } catch (error) {
        res.json({
            status: 'fail',
            Error: error.message,
        });
    }
};
