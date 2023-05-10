const mongoose = require('mongoose');

const dashSchema = new mongoose.Schema({
    score: {
        ref: 'Score',
        type: mongoose.Schema.Types.ObjectId,
    },
    quizId: {
        ref: 'Quiz',
        type: mongoose.Schema.Types.ObjectId,
    },
    user: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
    },
});

const Dashboard = mongoose.model('Dashboard', dashSchema);

module.exports = Dashboard;
