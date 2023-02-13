const { AuthenticationError } = require('../errors/AuthenticationError');
const jwt = require('../jwt');
const { User } = require('../../models').sequelize.models;

module.exports.authentication = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization?.split(' ')[1];
    const token = await jwt.verifyToken(bearer);
    if (!token) return next(new AuthenticationError());
    const { iat, exp, ...me } = token;
    req.me = me;
  } catch (e) {
    next(new AuthenticationError(e));
  }
  // req.user = await User.find;
  return next();
};
