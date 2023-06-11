const Quiz = require('../../models/Quiz');
const User = require('../../models/User');

const Question = require('../../models/Question');
const { generateToken } = require('../../middlewares/jwt');
exports.getLastExam = async (req, res) => {
    try {
        const time = new Date(Date.now() - 3600000 * 24);
        const lastExam = await Quiz.findOne({
            status: 'publish',
            createdAt: { $gte: time },
        }).sort({ createdAt: -1 });

        res.json({ lastExam });
    } catch (error) {
        res.json({
            status: 'fail',
            Error: error.message,
        });
    }
};
exports.getById = async (req, res) => {
    try {
        const quizId = req.params.id;
        const quiz = await Quiz.findById(quizId).populate('questions');

        const token = generateToken(quiz._id);

        res.json({
            status: 'true',
            quiz,
            token,
        });
    } catch (error) {
        res.json({
            status: 'fail',
            Error: error.message,
        });
    }
};
exports.getUserQuiz = async (req, res) => {
    try {
        const createdBy = req.tokenValue._id;
        const quiz = await Quiz.find({ createdBy }).populate('questions');
        // .populate({
        //     path: 'questions',
        //     model: 'Question',
        // });

        if (quiz.length === 0) {
            return res.send({
                msg: 'No quizzes found for the specified creator',
            });
        }

        res.json({
            quizes: quiz,
        });
    } catch (error) {
        res.json({
            status: 'fail',
            Error: error.message,
        });
    }
};
exports.getQuizViaCategory = async (req, res) => {
    try {
        const _id = req.tokenValue._id;
        const category = req.query.category;
        const quiz = await Quiz.find({
            createdBy: _id,
            category,
            status: 'publish',
        }).populate('createdBy');

        res.json({
            quiz,
        });
    } catch (error) {
        res.json({
            status: 'fail',
            Error: error.message,
        });
    }
};

exports.createQuiz = async (req, res) => {
    try {
        const id = req.tokenValue._id;
        const user = await User.findById(id);
        if (user.role != 'instructor')
            throw new Error('Restricted to teachers only');

        const { description, title, photo, category, time, status, questions } =
            req.body;

        if (!category || !title) {
            throw new Error(
                'You have Enter title and select category between [final,mid_term,quiz]'
            );
        }
        if (!status) {
            throw new Error('select post status ');
        }

        const midTermState = await Quiz.find({
            createdBy: id,
            status: 'draft',
            category: 'mid_term',
        });
        const finalState = await Quiz.find({
            createdBy: id,
            status: 'draft',
            category: 'final',
        });
        const quizState = await Quiz.find({
            createdBy: id,
            status: 'draft',
            category: 'quiz',
        });

        if (category === 'mid_term') {
            if (midTermState.length != 0) {
                throw new Error('There is one midterm in archive');
            }
        }

        if (category === 'final') {
            if (finalState.length != 0) {
                throw new Error('There is one final in archive');
            }
        }
        if (category === 'quiz') {
            if (quizState.length != 0) {
                throw new Error('There is one quiz in archive');
            }
        }
        const createdBy = id;

        let quiz = await Quiz.create({
            title,
            description,
            photo,
            createdBy,
            category,
            status,
            questions,
        });

        const token = generateToken(quiz._id);
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

exports.getQuiz = async (req, res) => {
    try {
        const quizId = req.params.quizId;
        console.log(quizId);

        const questtions = await Question.find({ quizId }).populate('quizId');
        if (questtions.length === 0) {
            throw new Error('No questions found for the specified quiz ID');
        }

        const formatQuestions = questtions.map((question) => {
            return {
                _id: question._id,
                question: question.question,
                options: question.options,
                correct_answer: question.correctAnswer,
                lecture_no: question.lecture_no,
                type: question.type,
            };
        });

        res.json({
            title: questtions[0].quizId['title'],
            category: questtions[0].quizId['category'],
            description: questtions[0].quizId['description'],
            questions: formatQuestions,
        });
    } catch (error) {
        res.status(401).json({
            msg: error.message,
        });
    }
};
