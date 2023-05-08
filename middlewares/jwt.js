const jwt = require('jsonwebtoken');

exports.generateToken = (_id, role) => {
    return jwt.sign(
        {
            _id,
            role,
        },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
    );
};

exports.verfyToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) throw new Error('No Tokens,');
    if (token.split(' ')[0] != 'Bearer') throw new Error('Invalid Token,');
    token = token.split(' ')[1];
    try {
        const decode = jwt.verify(token, process.env.JWT_KEY);

        req.user = decode;
        next();
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
};

exports.verfyQuizToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) throw new Error('No Tokens,');
    if (token.split(' ')[0] != 'Bearer') throw new Error('Invalid Token,');
    token = token.split(' ')[1];
    try {
        const decode = jwt.verify(token, process.env.JWT_KEY);

        req.quiz = decode;
        next();
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
};
