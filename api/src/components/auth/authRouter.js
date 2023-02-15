const express = require('express');
const { authenticationMiddleware } = require('../../middlewares/authenticationMiddleware');
const { signUp, signIn, me } = require('./authController');
const { validationMiddleware } = require('../../middlewares/validationMiddleware');
const { signUpSchema, signInSchema } = require('./authValidation');

const router = express.Router();

/**
 * Handles the creation of a new user in the platform
 */
router.post('/signup', validationMiddleware(signUpSchema), signUp);

/**
 * Handles the login using the email and password provided in the signup.
 */
router.post('/', validationMiddleware(signInSchema), signIn);

/**
 * Shows basic information about the authenticated user.
 */
router.get('/me', authenticationMiddleware, me);

module.exports = {
  authRouter: router,
};
