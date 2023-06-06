const Question = require('../../models/Questions');
const Quiz = require('../../models/Quiz');
const User = require('../../models/User');
exports.getQuizQues = async (req, res) => {
    try {
        const quizId = await Quiz.find({ _id: req.tokenValue._id });
        const ques = await Question.find({ quizId: quizId._id });

        if (ques.length === 0) {
            return res.send({
                msg: 'No questions yet',
            });
        }

        res.json({ quizes: ques });
    } catch (error) {
        res.status(401).json({
            msg: error.message,
        });
    }
};

exports.questionsBank = async (req, res) => {
    try {
        let lecture_no = req.query.no * 1;

        const questions = await Question.find({ lecture_no });

        res.json({
            questions,
        });
    } catch (error) {
        res.status(401).json({
            msg: error.message,
        });
    }
};

exports.createQues = async (req, res) => {
    try {
        const {
            lecture_no,
            type,
            question,
            correctAnswer,
            maxLength,
            options,
            openEndedSubmittedAnswer,
        } = req.body;
        if (!type) {
            console.log(`555`);
            throw new Error(
                'Select question type (multiple choice, true false, open ended )'
            );
        }
        if (!lecture_no) {
            throw new Error('You must specify a specific lecture number');
        }
        if (type == 'multiple_choice') {
            if (!options || options.length < 2) {
                throw new Error(
                    'Provide at least two options for multiple-choice questions'
                );
            }
        } else if (type == 'true_false') {
            if (correctAnswer != ('true' || 'fasle')) {
                throw new Error('Provide answer for true/false');
            }
        } 
        // else if (type == 'open_ended') {
        //     console.log(`555`);
        //     if (maxLength.length < 10) {
        //         throw new Error('Provide at least two or three words');
        //     }
        }
        const _id = req.tokenValue._id;
        const userId = await User.findById(_id);

        const newquestion = await Question.create({
            type,
            question,
            correctAnswer,
            maxLength,
            options,
            userId: userId._id,
            lecture_no,
        });

        res.json({
            questions: newquestion,
        });
    } catch (error) {
        res.status(401).json({
            msg: error.message,
        });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        const _id = req.params.id;
        const deleted = await Question.findByIdAndDelete(_id);
        res.json({
            deleted,
        });
    } catch (error) {
        res.json({
            msg: "The question didn't delete",
        });
    }
};
// exports.answers = async (req,res)=>{
//     const answers = req.body.answer;
//     const questionId =
//     const question = await Question.find({})
// }
