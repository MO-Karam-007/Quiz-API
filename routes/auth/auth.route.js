const express = require('express');
const authRouter = express.Router();
const authController = require('./auth.Controller');
const { verfyToken } = require('../../middlewares/jwt');

// authRouter.route('/verify_user').get(authController.verify);

authRouter.route('/signup').post(authController.register);
authRouter.route('/login').post(authController.login);
authRouter.route('/mailer').post(verfyToken, authController.emailVerify);

module.exports = authRouter;
