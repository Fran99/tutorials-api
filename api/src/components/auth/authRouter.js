const express = require('express');
const { authentication } = require('../../middlewares/authentication');
const { signUp, signIn, me } = require('./authController');

const router = express.Router();

/**
 *
 */
router.post('/signup', signUp);

/**
 *
 */
router.post('/', signIn);

/**
 *
 */
router.get('/me', authentication, me);

module.exports = {
  authRouter: router,
};
