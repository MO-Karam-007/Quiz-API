const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        requied: true,
    },
    type: {
        type: String,
        enum: ['quiz', 'final', 'mid_term'],
    },
    description: {
        type: String,
        requied: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        requied: true,
    },
    photo: {
        type: String,
        default: 'no-photo.jpg',
    },
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
