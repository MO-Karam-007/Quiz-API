const Question = require('../../models/Questions');
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.getQuizQues = async (req, res) => {
    try {
        const quizId = req.quiz._id;
        const ques = await Question.find({ quizId });

        if (ques.length === 0) {
            return res.send({
                msg: 'No questions yet',
            });
        }
        console.log(`Lol`);

        res.json({
            quizes: ques,
        });
    } catch (error) {
        res.status(401).json({
            msg: error.message,
        });
    }
};
exports.questionsBank = async (req, res) => {
    try {
        let lecture_no = req.body.lecture_no;

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
        } = req.body;
        if (!type || !lecture_no) {
            throw new Error(
                'Select question type (multiple choice, true false, open ended ) and select lecture number'
            );
        }

        if (type == 'multiple_choice') {
            if (!options || options.length < 2) {
                throw new Error(
                    'Provide at least two options for multiple-choice questions'
                );
            }
        } else if (type == 'true_false') {
            if (typeof correctAnswer != 'boolean') {
                throw new Error(
                    'Provide a valid boolean answer for true/false questions'
                );
            }
        } else if (type == 'open_ended') {
            if (maxLength.length < 10) {
                throw new Error('Provide at least two or three words');
            }
        }

        const newquestion = await Question.create({
            type,
            question,
            correctAnswer,
            maxLength,
            options,
            quizId: req.quiz._id,
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
        const _id = req.params._id;
        console.log(`Delete method`);
        const deleted = await Question.deleteOne({ _id });
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
