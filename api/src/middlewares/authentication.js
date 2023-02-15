const { AuthenticationError } = require('../errors/AuthenticationError');
const jwt = require('../jwt');
const { User } = require('../../models').sequelize.models;

/**
 * Authentication middleware
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
module.exports.authenticationMiddleware = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization?.split(' ')[1];
    const token = await jwt.verifyToken(bearer);
    if (!token) return next(new AuthenticationError());

    // Let's grab the user from the DB
    const user = await User.findByPk(token.id);
    if (!user) return next(new AuthenticationError());

    req.me = user.parse();
    return next();
  } catch (e) {
    return next(new AuthenticationError(e));
  }
};
