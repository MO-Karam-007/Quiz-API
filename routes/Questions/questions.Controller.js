const Question = require('../../models/Questions');

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
        const questions = await Question.find();

        res.json({
            quizes: questions,
        });
    } catch (error) {
        res.status(401).json({
            msg: error.message,
        });
    }
};
exports.createQues = async (req, res) => {
    try {
        const { type, question, correctAnswer, maxLength, options } = req.body;
        if (!type) {
            throw new Error(
                'Select question type (multiple choice, true false, open ended )'
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
