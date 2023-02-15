const jwt = require('jsonwebtoken');

const secret = 'thesecretkey'; // Only for development purposes.

/**
 * Creates a basic JWT for different purposes
 * @param data
 * @param expiresIn
 * @returns {Promise<unknown>}
 */
const createToken = (data = {}, expiresIn = '2h') => new Promise((resolve, reject) => {
  jwt.sign(data, secret, { expiresIn }, (err, token) => {
    if (err) reject(err);
    resolve(token);
  });
});

/**
 * Verifies a JWT
 * @param token
 * @returns {Promise<unknown>}
 */
const verifyToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, secret, (err, decoded) => {
    if (err) reject(err);
    resolve(decoded);
  });
});

module.exports = {
  createToken,
  verifyToken,
};
