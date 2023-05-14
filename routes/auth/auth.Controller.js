const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../../middlewares/jwt');
const nodemailer = require('nodemailer');

exports.register = async (req, res) => {
    try {
        const { first_name, last_name, email, role } = req.body;
        let password = req.body.password;
        if (!(email || password || role || first_name || last_name))
            throw new Error('all data requird ');

        let user = await User.findOne({ email });
        if (user) throw new Error('Email already exists');

        if (user.password < 8) throw new Error('8 characters for password');
        password = await bcrypt.hash(password, 10);
        console.log(password);

        user = await User.create({
            email,
            role,
            password,
            first_name,
            last_name,
        });

        const token = generateToken(
            user._id,
            user.role,
            user.email,
            user.password
        );
        user['token'] = token;
        res.json({
            msg: 'Signed up',
            user,
            token: user['token'],
        });
    } catch (error) {
        res.json({
            status: 'fail',
            Error: error.message,
        });
    }
};

exports.verify = async (req, res) => {
    const data = req.user;
    console.log(data);
    res.send('O');
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) throw new Error('All data required ');

        const user = await User.findOne({ email });

        if (!user) throw new Error('This email does not exist');

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) throw new Error('Wrong password');

        const token = generateToken(
            user._id,
            user.role,
            user.email,
            user.password
        );
        user['token'] = token;

        res.json({
            data: 'User logged in',
            user,
            token: user['token'],
        });
    } catch (error) {
        res.json({
            status: 'fail',
            Error: error.message,
        });
    }
};
