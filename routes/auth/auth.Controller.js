const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const { generateToken } = require('../../middlewares/jwt');

const nodemailer = require('nodemailer');
exports.register = async (req, res) => {
    try {
        const { first_name, last_name, email, role, bio } = req.body;
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
            bio,
            profileImageUrl: req.file.path,
            ...(role === 'student' && { stCode }),
        });

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

exports.sendEmail = async (req, res) => {
    try {
        const code = Math.floor(Math.random() * 100000);
        const user = await User.findOne({ _id: req.tokenValue._id });
        const output = `
        <html>
<head>
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #2a8fe3;
        }

        h1 {
            color: #333333;
            font-size: 24px;
            margin-bottom: 10px;
        }

        h2 {
            color: #555555;
            font-size: 20px;
            margin-top: 0;
        }

        p {
            color: #777777;
            font-size: 16px;
            margin-bottom: 20px;
        }

        ul {
            list-style-type: none;
            padding-left: 0;
        }

        li {
            margin-bottom: 5px;
            text-align: center;
        }
        .code{
        font-weight: bold;
        font-size: 20px;
        }

        p.signature {
            color: #999999;
            font-size: 14px;
            margin-top: 30px;
        }

        .image-container {
            width: 150px;
            height: 120px;
            background: url('https://i.ibb.co/qkKTBZY/Modern-Mode-logos-black.png') no-repeat center center;
            background-size: cover;
        }

        .image-container img {
            width: 150px;
            height: 120px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="image-container">
    </div>
 
    <h1>Hi, ${user.first_name}</h1>
    <h2>Verify your email address</h2>
    <p>Thanks for starting the new OhmQuiz account creation process.
    We want to make sure it's<br> really you. Please enter the following verification code when prompted.
    If you don’t<br> want to create an account, you can ignore this message.</p>
    <ul>
        <li>Verification code</li>
        <li class="code">${code}</li>
        <li>(This code is valid for 10 minutes)</li>
    </ul>
    <p class="signature">ModernMode Team</p>

</body>
</html>
    `;
        let transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 587,

            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL, // generated ethereal user
                pass: process.env.GMIAL_PASSWORD, // generated ethereal password
            },
        });

        let mailOptions = {
            from: process.env.EMAIL, // sender address
            to: user.email, // list of receivers
            subject: 'Quiz verification Code', // Subject line
            text: 'Hello,', // plain text body
            html: output, // html body
        };
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                res.status(500).send({ msg: 'Error sending email' });
            } else {
                await User.findOneAndUpdate(
                    { _id: req.tokenValue._id },
                    { $set: { verifyCode: code } },
                    { new: true }
                );
                res.send(
                    `Email sended \n from  : ${process.env.EMAIL} \n To User ${user.email}`
                );
            }
        });
    } catch (error) {
        res.json({
            status: 'fail',
            Error: error.message,
        });
    }
};
exports.verifyEmail = async (req, res) => {
    let counter = 0;
    const code = req.body.code * 1;
    const user = await User.findById(req.tokenValue._id).select('+verifyCode');
    const userCode = user.verifyCode;

    if (code != userCode) {
        counter++;

        user.counter = counter;
        await user.save();
    }
    // if (counter == 3) await user.findOneAndDelete({ email: user.email });
    res.send('Ok');
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
