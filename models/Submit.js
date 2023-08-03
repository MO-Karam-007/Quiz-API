const mongoose = require('mongoose');

const submitSchame = new mongoose.Schema({
    answer: {
        type: [String],
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

const Submit = mongoose.model('Submit', submitSchame);

module.exports = Submit;
