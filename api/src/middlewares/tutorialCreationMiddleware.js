const { AuthorizationError } = require('../errors/AuthorizationError');
const { verifyToken } = require('../jwt');

/**
 * This middleware checks if the tutorial creation token is still valid.
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports.tutorialCreationMiddleware = async (req, res, next) => {
  try {
    const creationToken = req.headers['authentication-token'];
    if (!await verifyToken(creationToken)) throw new Error();
  } catch (e) {
    return next(new AuthorizationError(e));
  }

  return next();
};
