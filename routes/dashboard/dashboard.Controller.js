const Quiz = require('../../models/Quiz');
const Score = require('../../models/Score');
const User = require('../../models/User');

async function cheakMyDashboard(req, res) {
    try {
        const userId = req.user._id;
        let data = await Score.find({ userId })
            .populate('userId')
            .populate('quizId');

        data = data.map((value) => {
            return {
                quizType: value.quizId.category,
                quizTitle: value.quizId.title,
                score: value.score,
                studentName:
                    value.userId.first_name + ' ' + value.userId.last_name,
            };
        });
        res.json({
            data,
        });
    } catch (error) {
        res.status(401).json({
            msg: error.message,
        });
    }
}

async function fullDashboard(req, res) {
    try {
        let data = await Score.find().populate('userId').populate('quizId');
        let mappedata = data.map((value) => {
            return {
                quizType: value.quizId.category,
                quizTitle: value.quizId.title,
                score: value.score,
                studentName:
                    value.userId.first_name + ' ' + value.userId.last_name,
            };
        });
        res.json({
            mappedata,
        });
    } catch (error) {
        res.status(401).json({
            msg: error.message,
        });
    }
}

module.exports = {
    fullDashboard,
    cheakMyDashboard,
};
