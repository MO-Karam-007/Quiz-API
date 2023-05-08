const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        unique: true,
        required: true,
    },
    last_name: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        message: 'Password must be at least 8 characters long',
    },
    role: {
        type: String,
        required: true,
        enum: ['instructor', 'student'],
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
