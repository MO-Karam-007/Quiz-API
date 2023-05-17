const nodemailer = require('nodemailer');

function verify(name, email) {
    const code = Math.floor(Math.random() * 100000);
    const output = `
            <h1>MK</h1>
            <p>Hi, ${name}</p>
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
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
    });
    return code;
}

module.exports = {
    verify,
};
