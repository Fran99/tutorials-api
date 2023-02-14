const { createToken } = require('../../jwt');
const { Tutorial } = require('../../../models').sequelize.models;

module.exports = {
  /**
   * Issue a token to create a tutorial
   * @param req
   * @param res
   * @param next
   */
  async getToken(req, res, next) {
    try {
      const token = await createToken({
        type: 'tutorialCreation',
      }, '5m');

      return res.json({
        code: 200,
        data: {
          token,
        },
      });
    } catch (e) {
      return next(e);
    }
  },

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<void>}
   */
  async create(req, res, next) {
    try {
      const tutorial = await Tutorial.create(req.body);

      res.status(201).json({
        code: 201,
        data: tutorial.parse(),
      });
    } catch (e) {
      next(e);
    }
  },

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async list(req, res, next) {
    try {
      const tutorials = (await Tutorial.findAll()).map((tutorial) => tutorial.parse());

      return res.json({
        code: 200,
        data: tutorials,
      });
    } catch (e) {
      return next(e);
    }
  },

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async show(req, res, next) {
    try {
      const tutorial = await Tutorial.findByPk(req.params.id);
      return res.json({
        code: 200,
        data: tutorial.parse(),
      });
    } catch (e) {
      return next(e);
    }
  },

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  async update(req, res, next) {
    try {
      const result = await Tutorial.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      return res.status(204).end();
    } catch (e) {
      return next(e);
    }
  },

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async del(req, res, next) {
    try {
      const deleted = await Tutorial.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!deleted) return res.status(404).end();
      return res.status(204).end();
    } catch (e) {
      return next(e);
    }
  },
};
