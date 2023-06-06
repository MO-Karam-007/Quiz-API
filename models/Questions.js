const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['multiple_choice', 'true_false', 'open_ended'],
        required: true,
    },
    lecture_no: {
        type: Number,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: function () {
            return this.type === 'multiple_choice';
        },
    },
    correctAnswer: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    maxLength: {
        type: Number,
        required: function () {
            return this.type === 'open_ended';
        },
    },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
