const { AuthorizationError } = require('../errors/AuthorizationError');

/**
 * This middleware prevents non-admin users to perform write operations.
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports.authorizationMiddleware = (req, res, next) => {
  if (req.method !== 'GET' && !req.me.isAdmin) {
    return next(new AuthorizationError());
  }
  return next();
};
