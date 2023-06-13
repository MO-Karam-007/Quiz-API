const express = require('express');
const authRouter = express.Router();
const authController = require('./auth.Controller');
const { verfyToken } = require('../../middlewares/jwt');
// const { upload } = require('../../uploads/uploud.js');
const multer = require('multer');

// authRouter.route('/verify_user').get(authController.verify);

authRouter.route('/signup').post(authController.register);
authRouter.route('/login').post(authController.login);
authRouter.route('/send_email').post(verfyToken, authController.sendEmail);
authRouter.route('/verify').post(verfyToken, authController.verifyEmail);
authRouter.route('/get_students').get(authController.getAllStd);
authRouter
    .route('/complete_sign_up')
    .get(verfyToken, authController.getSignedUpUser)
    .put(verfyToken, authController.completeSignUp);

module.exports = authRouter;
