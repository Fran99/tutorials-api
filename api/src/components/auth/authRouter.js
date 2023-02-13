const express = require('express');
const { createToken } = require('../../jwt');
const { User } = require('../../../models').sequelize.models;
const { compare } = require('bcrypt');
const { AuthenticationError } = require('../../errors/AuthenticationError');
const { authentication } = require('../../middlewares/authentication');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;
  // TODO validate this data

  const user = await User.findOne({
    where: { email },
  });

  if (!user || !await compare(password, user.password)) {
    return next(new AuthenticationError());
  }

  const token = await createToken({
    id: user.id,
    email,
    name: user.name,
    lastname: user.lastname,
  });

  res.json({
    code: 200,
    data: {
      token,
    },
  });
});

router.get('/me', authentication, (req, res) => {
  res.json({
    code: 200,
    data: req.me,
  });
});

module.exports = {
  authRouter: router,
};
