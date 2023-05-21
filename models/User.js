const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true,

        required: true,
    },
    last_name: {
        type: String,

        required: true,
    },

    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],

        // {
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
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false,
    },
    passwordConfirm: {
        type: String,
        vallidate: {
            validator: function (el) {
                return el === this.password;
            },
        },
        message: 'Passwords are not the same!',
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
    photo: String,
});
// userSchema.pre('init', async function () {
//     var stCode = Math.floor(Math.random() * 10000);
//     const stCodeExist = await User.exists({ stCode });
//     if (stCodeExist) {
//         this.stCode =
//             stCode * Math.floor(Math.random() * 10) +
//             Math.floor(Math.random() * 5);
//     } else {
//         this.stCode = stCode;
//     }
// });
userSchema.pre('save', async function (next) {
    // if PASSWORD modified this method will work
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);

    this.passwordConfirm = undefined;
    next();
});
userSchema.virtual('fullName').get(function () {
    this.first_name + ' ' + this.last_name;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
