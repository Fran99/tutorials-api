const { ValidationError } = require('joi');
const { AuthenticationError } = require('../errors/AuthenticationError');
const { AuthorizationError } = require('../errors/AuthorizationError');

/**
 * Handles custom errors like authentication, authorization and db.
 * @param {Error} err
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const customErrors = (err, req, res, next) => {
  if (err instanceof AuthenticationError
      || err instanceof AuthorizationError) return res.status(err.code).end();

  if (err instanceof ValidationError
      || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      code: 400,
      message: err.message,
    });
  }

  return next();
};

module.exports = {
  customErrors,
};
