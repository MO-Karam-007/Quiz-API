// const Quiz = require('../../models/Quiz');
// const Score = require('../../models/Score');
// const User = require('../../models/User');

// exports.editArchive = async (req, res) => {
//     try {
//         const quizId = req.params.id;
//         const quiz = await Archive.findOneAndUpdate(
//             { _id: quizId },
//             { status: 'publish' }
//         );
//         console.log(`quiz `, quiz);
//         await Quiz.create(quiz).then(async () => {
//             await Archive.findByIdAndDelete({
//                 _id: quizId,
//             });
//         });

//         res.json({
//             msg: 'Quiz moved to publish area ',
//         });
//     } catch (error) {
//         res.json({
//             msg: error,
//         });
//     }
// };

// exports.getArchive = async (req, res) => {
//     try {
//         const archives = await Quiz.find({ status: 'draft' });

//         res.json({
//             archives,
//         });
//     } catch (error) {
//         res.json({
//             msg: error,
//         });
//     }
// };
