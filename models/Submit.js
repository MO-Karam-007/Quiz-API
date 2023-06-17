const mongoose = require('mongoose');

const submitSchame = new mongoose.Schema({
    answer: {
        type: mongoose.Schema.Types.Mixed,
        default: 0,
    },
    userId: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User id required'],
    },
    // questionId: {
    //     ref: 'Question',
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: [true, 'Question id required'],
    // },
    quizId: {
        ref: 'Quiz',
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Quiz id required'],
    },
});
submitSchame.index({ userId: 1, questionId: 1 }, { unique: true });
const Submit = mongoose.model('Submit', submitSchame);

module.exports = Submit;
