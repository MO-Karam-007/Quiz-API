const Quiz = require('../../models/Quiz');
const User = require('../../models/User');
exports.getallArchive = async (req, res) => {
    const allArchives = await Quiz.find({ status: 'draft' });
    res.json({
        msg: allArchives,
    });
};

exports.editArchive = async (req, res) => {
    try {
        const quizId = req.params.id;
        const quiz = await Archive.findOneAndUpdate(
            { _id: quizId },
            { status: 'publish' }
        );
        console.log(`quiz `, quiz);
        await Quiz.create(quiz).then(async () => {
            await Archive.findByIdAndDelete({
                _id: quizId,
            });
        });

        res.json({
            msg: 'Quiz moved to publish area ',
        });
    } catch (error) {
        res.json({
            msg: error,
        });
    }
};

exports.getOneArchive = async (req, res) => {
    try {
        const token = req.tokenValue._id;
        const findQuiz = await Quiz.findById(token);
        if (findQuiz.status != 'draft') {
            throw new Error('Not a draft this published before');
        }

        res.json({
            findQuiz,
        });
    } catch (error) {
        res.json({
            msg: error,
        });
    }
};

exports.changeStatus = async (req, res) => {
    try {
        const userId = req.tokenValue._id;
        const id = req.params.id;

        const user = await User.findById(userId);
        if (user.role != 'instructor') {
            throw new Error(
                'You are not allow to change status, For instructors only'
            );
        }
        const { status, questions } = req.body;
        const checkQuiz = await Quiz.findById(id);
        if (checkQuiz.status != 'draft') {
            throw new Error('This quiz published before');
        }

        const quiz = await Quiz.findByIdAndUpdate(id, {
            status,
            questions,
        });
        quiz.createdAt = new Date();
        res.json({
            lll: checkQuiz,
            quiz,
        });
    } catch (error) {
        res.json({
            msg: error,
        });
    }
};
