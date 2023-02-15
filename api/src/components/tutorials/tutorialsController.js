const { Op } = require('sequelize');
const { createToken } = require('../../jwt');
const { Tutorial } = require('../../../models').sequelize.models;

module.exports = {
  /**
   * Issues a token to create a tutorial
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
   * Creates a new tutorial
   * @param req
   * @param res
   * @param next
   * @returns {Promise<void>}
   */
  async create(req, res, next) {
    try {
      const tutorial = await Tutorial.create(req.body);

      return res.status(201).json({
        code: 201,
        data: tutorial.parse(),
      });
    } catch (e) {
      return next(e);
    }
  },

  /**
   * Lists all available tutorials
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async list(req, res, next) {
    try {
      const defaultCondition = [{
        id: {
          [Op.not]: null,
        },
      }];
      const conditions = [];
      ['title', 'description'].forEach((param) => {
        if (req.query[param]) {
          conditions.push({
            [param]: {
              [Op.like]: `%${req.query[param]}%`,
            },
          });
        }
      });

      const tutorials = (await Tutorial.findAll({
        where: {
          [Op.or]: (conditions.length ? conditions : defaultCondition),
        },
        order: [
          ['id', (req.query.order === 'desc' ? 'DESC' : 'ASC')],
        ],
      })).map((tutorial) => tutorial.parse());

      return res.json({
        code: 200,
        data: tutorials,
      });
    } catch (e) {
      return next(e);
    }
  },

  /**
   * Retrieves a single tutorial
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async show(req, res, next) {
    try {
      const tutorial = await Tutorial.findByPk(req.params.id);
      if (!tutorial) return res.status(404).end();
      return res.json({
        code: 200,
        data: tutorial.parse(),
      });
    } catch (e) {
      return next(e);
    }
  },

  /**
   * Updates a tutorial
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
      if (!result[0]) return res.status(404).end();
      return res.status(204).end();
    } catch (e) {
      return next(e);
    }
  },

  /**
   * Deletes all tutorials
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async massDelete(req, res, next) {
    try {
      await Tutorial.destroy({
        truncate: true,
      });
      return res.status(204).end();
    } catch (e) {
      return next(e);
    }
  },

  /**
   * Deletes a tutorial
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
