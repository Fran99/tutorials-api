const express = require('express');
const { User } = require('../../../models').sequelize.models;

const usersRouter = express.Router();

usersRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    res.status(200).json({
      code: 200,
      data: user.parse(),
    });
  } catch (e) {
    res.status(404).end();
  }
});

module.exports = {
  usersRouter,
};
