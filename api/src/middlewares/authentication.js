const { AuthenticationError } = require('../errors/AuthenticationError');
const jwt = require('../jwt');

/**
 * Authentication middleware
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
module.exports.authentication = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization?.split(' ')[1];
    const token = await jwt.verifyToken(bearer);
    if (!token) return next(new AuthenticationError());
    const { iat, exp, ...me } = token;
    req.me = me;
    return next();
  } catch (e) {
    return next(new AuthenticationError(e));
  }
};
