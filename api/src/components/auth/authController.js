const { compare } = require('bcryptjs');
const { AuthenticationError } = require('../../errors/AuthenticationError');
const { createToken } = require('../../jwt');
const { User } = require('../../../models').sequelize.models;

module.exports = {

  /**
   * Controller to process the user signup
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Promise<void>}
   */
  async signUp(req, res, next) {
    try {
      const user = await User.create({
        ...req.body,
      });

      res.status(201).json({
        code: 201,
        data: user.parse(),
      });
    } catch (e) {
      next(e);
    }
  },

  /**
   * Controller to process the user signin
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async signIn(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user || !await compare(password, user.password)) {
      return next(new AuthenticationError());
    }

    const token = await createToken({ id: user.id });

    return res.json({
      code: 200,
      data: {
        token,
      },
    });
  },

  /**
   *
   * @param req
   * @param res
   */
  me(req, res) {
    res.json({
      code: 200,
      data: req.me,
    });
  },
};
