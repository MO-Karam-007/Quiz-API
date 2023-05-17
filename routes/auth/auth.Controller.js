const User = require('../../models/User');

const bcrypt = require('bcryptjs');
const { generateToken } = require('../../middlewares/jwt');
const { verify } = require('../../middlewares/verificationCode');

exports.register = async (req, res) => {
    try {
        const { first_name, last_name, email, role } = req.body;
        let password = req.body.password;
        var stCode = Math.floor(Math.random() * 10000);
        if (!(email || password || role || first_name || last_name))
            throw new Error('all data requird ');

        let user = await User.findOne({ email });
        if (user) throw new Error('Email already exists');

        if (password.length < 8) throw new Error('8 characters for password');

        password = await bcrypt.hash(password, 10);
        console.log(`1`);
        user = await User.create({
            role,
            email,
            password,
            first_name,
            last_name,
            ...(role === 'student' && { stCode }),
        });
        console.log(`2`);
        verify(first_name, email);
        let code = verify(first_name, email);
        console.log(`2`);
        const token = generateToken(user._id, user.role, user.email, code);
        user['token'] = token;
        console.log(`4`);
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
    try {
        const email = req.user.email;
        const submittedCode = req.body.code;
        if (req.user.code * 1 != submittedCode * 1)
            await User.delete({ email });
        res.json({
            msg: 'Account Verified',
        });
    } catch (error) {
        res.json({
            msg: error.error,
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

        const token = generateToken(user._id, user.role, user.email);
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
