const mongoose = require('mongoose');

const scoreSchame = new mongoose.Schema({
    score: {
        type: Number,
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
        required: [true, 'User id required'],
    },
});

const Score = mongoose.model('Score', scoreSchame);

module.exports = Score;
