const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const { generateToken } = require('../../middlewares/jwt');

const nodemailer = require('nodemailer');
exports.register = async (req, res) => {
    try {
        const { first_name, last_name, email, role } = req.body;
        let password = req.body.password;

        var stCode = Math.floor(Math.random() * 10000);
        // const code = Math.floor(Math.random() * 100000);

        if (!email || !password || !role || !first_name || !last_name) {
            throw new Error('all data requird');
        }
        let user = await User.findOne({ email });

        if (user) throw new Error('Email already exists');

        if (password.length < 8) throw new Error('8 characters for password');

        user = await User.create({
            role,
            email,
            password,
            first_name,
            last_name,
            ...(role === 'student' && { stCode }),
        });
        console.log(`lol`);
        const token = generateToken(user._id);
        user['token'] = token;

        res.json({
            msg: 'Signed up',
            user: user,
            token: user['token'],
        });
    } catch (error) {
        res.json({
            status: 'fail',
            Error: error.message,
        });
    }
};

exports.emailVerify = async (req, res) => {
    try {
        const code = Math.floor(Math.random() * 100000);
        const user = await User.findOne({ _id: req.tokenValue._id });
        const output = `
            <h1>MK</h1>
            <p>Hi, ${user.first_name}</p>
            <p>Please use the following code to verify your login: ${code}</p>
            <ul>  
            <li>Thanks for your time,</li>
            <li>The MK Security...</li>
            </ul>
            
    `;
        // function sendEmailBack() {
        //     return req.user.email;
        // }

        // create reusable transporter object using the default SMTP transport

        let transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 587,

            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL, // generated ethereal user
                pass: process.env.GMIAL_PASSWORD, // generated ethereal password
            },
            // tls: {
            //     rejectUnauthorized: false,
            // },
        });
        // console.log(req.user.email);
        // const e_mail = req.user.email;
        // console.log(e_mail);

        // setup email data with unicode symbols

        // send mail with defined transport object

        let mailOptions = {
            from: process.env.EMAIL, // sender address
            to: user.email, // list of receivers
            subject: 'Quiz verification Code', // Subject line
            text: 'Hello,', // plain text body
            html: output, // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).send({ msg: 'Error sending email' });
            } else {
                console.log('Message sent: %s', info.messageId);
                console.log(
                    'Preview URL: %s',
                    nodemailer.getTestMessageUrl(info)
                );
                res.send('Email sended');
            }
        });

        // res.send('Email sended');
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

        const user = await User.findOne({ email }).select('+password');

        if (!user) throw new Error('This email does not exist');

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) throw new Error('Wrong password');

        const token = generateToken(user._id);
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
