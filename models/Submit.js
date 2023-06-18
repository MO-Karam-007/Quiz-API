const mongoose = require('mongoose');

const submitSchame = new mongoose.Schema({
    answer: {
        type: [String],
        default: 0,
    },
    userId: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User id required'],
    },

    quizId: {
        ref: 'Quiz',
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Quiz id required'],
    },
    score: {
        type: Number,
        default: 0,
    },
});
submitSchame.index({ userId: 1, questionId: 1 }, { unique: true });
const Submit = mongoose.model('Submit', submitSchame);

module.exports = Submit;
