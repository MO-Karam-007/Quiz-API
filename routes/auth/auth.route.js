const express = require('express');
const authRouter = express.Router();
const authController = require('./auth.Controller');
const { verfyToken } = require('../../middlewares/jwt');
// const { upload } = require('../../uploads/uploud.js');
const multer = require('multer');

// authRouter.route('/verify_user').get(authController.verify);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save images in the "uploads" folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Set a unique filename for the uploaded image
    },
});
const upload = multer({ storage: storage });

authRouter.route('/signup').post(authController.register);
authRouter.route('/login').post(authController.login);
authRouter.route('/send_email').post(verfyToken, authController.sendEmail);
authRouter.route('/verify').post(verfyToken, authController.verifyEmail);
authRouter.route('/get_students').get(authController.getAllStd);
authRouter
    .route('/complete_sign_up')
    .get(verfyToken, authController.getSignedUpUser);

authRouter.put(
    '/complete_sign_up',
    upload.single('profileImage'),

    verfyToken,
    authController.completeSignUp
);

module.exports = authRouter;
