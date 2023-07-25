const Quiz = require('../../models/Quiz');
const User = require('../../models/User');
const { generateToken } = require('../../middlewares/jwt');
exports.getLastExam = async (req, res) => {
    try {
        const fiveMin = new Date();

        fiveMin.setMinutes(fiveMin.getMinutes() - 60);
        const lastExam = await Quiz.findOne({
            status: 'publish',
            createdAt: { $gte: fiveMin },
        }).sort({ createdAt: -1 });

        const lastUpdateExam = await Quiz.findOne({
            status: 'publish',
            updatedAt: { $gte: fiveMin },
        }).sort({ updatedAt: -1 });

        if (!lastExam || !lastUpdateExam) {
            throw new Error('There is no recent exams');
        }

        let lastestExam;
        if (lastExam.createdAt > lastUpdateExam.updatedAt) {
            lastestExam = lastExam;
        } else {
            lastestExam = lastUpdateExam;
        }

        if (lastExam) {
            const currentTime = new Date();
            const examCreationTime =
                lastExam.createdAt || lastUpdateExam.updatedAt;

            if (currentTime - examCreationTime > 1800 * 1000) {
                // 5 minutes in milliseconds
                // Remove the exam from the database or take necessary actions
                lastestExam = null;
            }
        }

        res.json({ lastestExam });
    } catch (error) {
        res.json({
            status: 'fail',
            Error: error.message,
        });
    }
};
exports.getById = async (req, res) => {
    try {
        const quizId = req.params.id;
        let quiz = await Quiz.findById(quizId).populate('questions');

        if (!quiz) {
            throw new Error('The quiz not found');
        }

        const token = generateToken(quiz._id);

        console.log(
            quiz.questions.map((ele) => {
                return {
                    question: ele.question.split(' ')[1],
                };
            })
        );

        function shuffleArray(arr) {
            var n = arr.length;
            for (var i = n - 1; i > 0; i--) {
                // Generate a random index between 0 and i (inclusive)
                var j = Math.floor(Math.random() * (i + 1));
                // Swap elements at indices i and j
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            return arr;
        }

        quiz.questions = shuffleArray(quiz.questions);
        console.log(
            quiz.questions.map((ele) => {
                return {
                    question: ele.question.split(' ')[1],
                };
            })
        );
        // console.log(quiz.questions);
        res.json({
            status: 'true',
            quiz,
            token,
        });
    } catch (error) {
        res.json({
            status: 'fail',
            Error: error.message,
        });
    }
};
exports.getUserQuiz = async (req, res) => {
    try {
        const createdBy = req.tokenValue._id;
        const quiz = await Quiz.find({ createdBy }).populate('questions');
        // .populate({
        //     path: 'questions',
        //     model: 'Question',
        // });

        if (quiz.length === 0) {
            return res.send({
                msg: 'No quizzes found for the specified creator',
            });
        }

        res.json({
            quizes: quiz,
        });
    } catch (error) {
        res.json({
            status: 'fail',
            Error: error.message,
        });
    }
};
exports.getQuizViaCategory = async (req, res) => {
    try {
        const _id = req.tokenValue._id;
        const category = req.query.category;
        const quiz = await Quiz.find({
            createdBy: _id,
            category,
            status: 'publish',
        }).populate('createdBy');

        res.json({
            quiz,
        });
    } catch (error) {
        res.json({
            status: 'fail',
            Error: error.message,
        });
    }
};

exports.createQuiz = async (req, res) => {
    try {
        const id = req.tokenValue._id;
        const user = await User.findById(id);
        if (user.role != 'instructor')
            throw new Error('Restricted to teachers only');

        const { description, title, photo, category, time, status, questions } =
            req.body;

        if (!category || !title) {
            throw new Error(
                'You have Enter title and select category between [final,mid_term,quiz]'
            );
        }
        if (!status) {
            throw new Error('select post status ');
        }

        const midTermState = await Quiz.find({
            createdBy: id,
            status: 'draft',
            category: 'mid_term',
        });
        const finalState = await Quiz.find({
            createdBy: id,
            status: 'draft',
            category: 'final',
        });
        const quizState = await Quiz.find({
            createdBy: id,
            status: 'draft',
            category: 'quiz',
        });
        // TO search is there is exams recently uploaded or not
        if (category === 'mid_term') {
            if (midTermState.length != 0) {
                throw new Error('There is one midterm in archive');
            }
        }

        if (category === 'final') {
            if (finalState.length != 0) {
                throw new Error('There is one final in archive');
            }
        }
        if (category === 'quiz') {
            if (quizState.length != 0) {
                throw new Error('There is one quiz in archive');
            }
        }
        const createdBy = id;

        let quiz = await Quiz.create({
            title,
            description,
            photo,
            createdBy,
            category,
            status,
            questions,
        });

        const token = generateToken(quiz._id);
        quiz.token = token;
        res.json({
            quizes: quiz,
            token: quiz.token,
        });
    } catch (error) {
        res.json({
            status: 'fail',
            Error: error.message,
        });
    }
};

exports.getQuiz = async (req, res) => {
    try {
        const quizId = req.params.quizId;

        const questtions = await Quiz.findById(quizId).populate('questions');
        if (questtions.length === 0) {
            throw new Error('No questions found for the specified quiz ID');
        }

        // const formatQuestions = questtions.map((question) => {
        //     return {
        //         _id: question._id,
        //         question: question.question,
        //         options: question.options,
        //         correct_answer: question.correctAnswer,
        //         lecture_no: question.lecture_no,
        //         type: question.type,
        //     };
        // });

        // res.json({
        //     title: questtions[0].quizId['title'],
        //     category: questtions[0].quizId['category'],
        //     description: questtions[0].quizId['description'],
        //     questions: formatQuestions,
        // });
        res.json({
            questtions,
        });
    } catch (error) {
        res.status(401).json({
            msg: error.message,
        });
    }
};
