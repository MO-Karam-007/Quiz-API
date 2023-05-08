const express = require('express');
const authRouter = express.Router();
const authController = require('./auth.Controller');

authRouter.route('/signup').post(authController.register);
authRouter.route('/login').post(authController.login);

module.exports = authRouter;
