const express = require('express');
const authRouter = express.Router();
const authController = require('./auth.Controller');
const { verfyToken } = require('../../middlewares/jwt');
authRouter.route('/signup').post(authController.register);
authRouter.route('/login').post(authController.login);

authRouter.route('/verify_user').post(verfyToken,authController.verify);
module.exports = authRouter;
