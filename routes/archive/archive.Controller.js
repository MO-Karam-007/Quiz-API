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
        const getAllDrafts = await Quiz.find({ status: 'draft' });
        console.log(`getAllDrafts`, getAllDrafts);
        const filter = getAllDrafts.filter((ele) => {
            return ele._id == token;
        });
        console.log(`filter`, filter);

        res.json({
            filter,
        });
    } catch (error) {
        res.json({
            msg: error,
        });
    }
};
