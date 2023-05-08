const mongoose = require('mongoose');

const scoreSchame = new mongoose.Schema({
    score: {
        type: Number,
        default: 0,
    },
    Quizfinal: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User id required'],
    },
    Quiz: {
        ref: 'Quiz',
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User id required'],
    },
});

const Score = mongoose.model('Sco`re', scoreSchame);

module.exports = {
    Score,
};
