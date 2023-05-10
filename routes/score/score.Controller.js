const Score = require('../../models/Score');

async function getScore(req, res) {
    try {
        const userId = req.user._id;
        const quizId = req.params.quizId;
        const score = await Score.find({
            userId,
            quizId,
        });
        res.json({ score });
    } catch (error) {
        res.status(401).json({
            msg: error.message,
        });
    }
}

async function getScores(req, res) {
    try {
        const userId = req.user._id;

        const score = await Score.find({
            userId,
        });

        res.json({ score });
    } catch (error) {
        res.status(401).json({
            msg: error.message,
        });
    }
}

module.exports = {
    getScores,
    getScore,
};
