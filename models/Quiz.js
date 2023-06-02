const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            requied: true,
        },
        category: {
            type: String,
            enum: ['quiz', 'final', 'mid_term'],
        },
        description: {
            type: String,
            requied: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            requied: true,
        },
        photo: {
            type: String,
            default: 'no-photo.jpg',
        },
        status: {
            type: String,
            enum: ['draft', 'publish'],
        },
        time: {
            type: Date,
            requied: true,
            default: () => new Date(Date.now() + 20 * 60 * 60),
        },
    },
    { timestamps: true }
);

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
