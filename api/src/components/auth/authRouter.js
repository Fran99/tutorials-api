const express = require('express');
const { createToken } = require('../../jwt');
// const db = require('../../models/index');

const router = express.Router();

router.post('/', (req, res) => {

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
