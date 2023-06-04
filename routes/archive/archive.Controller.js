const Quiz = require('../../models/Quiz');

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
