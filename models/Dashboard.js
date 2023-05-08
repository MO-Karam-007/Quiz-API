const mongoose = require('mongoose');

const dashSchema = new mongoose.Schema({
    totalScore: {
        type: Number,
        default: 0,
    },
    quizId: {
        ref: 'Quiz',
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User id required'],
    },
});

const Dashboard = mongoose.model('Dashboard', dashSchema);

module.exports = Dashboard;
