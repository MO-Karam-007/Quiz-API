const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../../middlewares/jwt');

exports.register = async (req, res) => {
    try {
        const { username, email, role } = req.body;
        let password = req.body.password;
        if (!(username || email || password || role))
            throw new Error('all data requird ');

        let user = await User.findOne({ email });
        if (user) throw new Error('Email already exists');

        user = await User.findOne({ username });
        if (user) throw new Error('Username already exists');

        password = await bcrypt.hash(password, 10);
        console.log(password);

        user = await User.create({
            username,
            email,
            role,
            password,
        });

        const token = generateToken(user._id, user.role);
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

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) throw new Error('All data required ');

        const user = await User.findOne({ email });

        if (!user) throw new Error('This email does not exist');

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) throw new Error('Wrong password');

        const token = generateToken(user._id, user.role);
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
