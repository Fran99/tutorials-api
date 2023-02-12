const express = require('express');
const { createToken } = require('../../jwt');
// const db = require('../../models/index');

const router = express.Router();

router.post('/', (req, res) => {
  const { email, password } = req.body;

  const token = createToken({
    name: 'Francisco',
  });

  console.log('token');

  res.json({
    code: 200,
    data: {
      token: 'Token',
    },
  });
});

module.exports = {
  authRouter: router,
};
