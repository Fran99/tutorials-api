const { ValidationError } = require('sequelize');
const { AuthenticationError } = require('../errors/AuthenticationError');
const { AuthorizationError } = require('../errors/AuthorizationError');

/**
 *
 * @param {Error} err
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const customErrors = (err, req, res, next) => {
  if (err instanceof AuthenticationError) return res.status(err.code).end();

  if (err instanceof AuthorizationError) return res.status(err.code).end();

  if (err instanceof ValidationError) {
    return res.status(400).json({
      code: 400,
      message: err.errors[0].message,
    });
  }

  return next();
};

module.exports = {
  customErrors,
};
