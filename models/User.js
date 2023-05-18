const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,

        required: true,
    },
    last_name: {
        type: String,

        required: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
        // validate: {
        //     validator: function (value) {
        //         const reqExp = /^[^s@]+@[^s@]+\.[^s@]+$/;
        //         return reqExp.test(value);
        //     },
        //     message: 'not valid email',
        // },
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
    stCode: {
        type: Number,
        required: true,
        unique: true,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
