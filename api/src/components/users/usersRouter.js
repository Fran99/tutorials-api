const express = require('express');
const { User } = require('../../../models').sequelize.models;

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = (await User.create({
      ...req.body,
    }, User.attributes())).toJSON();
    const {
      password, createdAt, updatedAt, ...userToSend
    } = user;
    res.status(201).json({
      code: 201,
      data: userToSend,
    });
  } catch (e) {
    return next(e);
  }
});

usersRouter.get('/:id', async (req, res) => {
  try {
    const {
      id, name, lastname, email,
    } = await db.models.User.findByPk(req.params.id);

    res.status(200).json({
      code: 200,
      data: {
        id, name, lastname, email,
      },
    });
  } catch (e) {
    res.status(404).end();
  }
});

module.exports = {
  usersRouter,
};
