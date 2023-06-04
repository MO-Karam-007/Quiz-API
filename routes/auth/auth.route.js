const express = require('express');
const authRouter = express.Router();
const authController = require('./auth.Controller');
const { verfyToken } = require('../../middlewares/jwt');
const { upload } = require('../../static/multer');
// authRouter.route('/verify_user').get(authController.verify);

authRouter
    .route('/signup')
    .post(upload.single('image'), authController.register);
authRouter.route('/login').post(authController.login);
authRouter.route('/send_email').post(verfyToken, authController.sendEmail);
authRouter.route('/verify').post(verfyToken, authController.verifyEmail);

module.exports = authRouter;
