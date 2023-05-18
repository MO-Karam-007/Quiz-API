const User = require('../../models/User');

const bcrypt = require('bcryptjs');
const { generateToken } = require('../../middlewares/jwt');
const { verify } = require('../../middlewares/verificationCode');

exports.register = async (req, res) => {
    try {
        const { first_name, last_name, email, role } = req.body;
        let password = req.body.password;
        var stCode = Math.floor(Math.random() * 10000);
        // const code = Math.floor(Math.random() * 100000);
        if (!(email || password || role || first_name || last_name))
            throw new Error('all data requird ');

        let user = await User.findOne({ email });
        if (user) throw new Error('Email already exists');

        if (password.length < 8) throw new Error('8 characters for password');

        hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            role,
            email,
            password: hashedPassword,
            first_name,
            last_name,
            ...(role === 'student' && { stCode }),
        });
        // verify(first_name, email);

        const token = generateToken(
            user._id,
            user.role,
            user.email,
            first_name
        );
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

exports.verify = async (req, res) => {
    try {
        const email = req.user.email;
        const code = Math.floor(Math.random() * 100000);
        const output = `
            <h1>MK</h1>
            <p>Hi, ${req.user.name}</p>
            <p>Please use the following code to verify your login: ${code}</p>
            <ul>  
            <li>Thanks for your time,</li>
            <li>The MK Security...</li>
            </ul>
            
    `;

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

        // setup email data with unicode symbols
        let mailOptions = {
            from: process.env.EMAIL, // sender address
            to: email, // list of receivers
            subject: 'Quiz verification Code', // Subject line
            text: 'Hello,', // plain text body
            html: output, // html body
        };

        // send mail with defined transport object
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
            }
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
