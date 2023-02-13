const jwt = require('jsonwebtoken');

// TODO set the secret key
const secret = 'thesecret';
const createToken = (data = {}, expiresIn = '2h') => new Promise((resolve, reject) => {
  jwt.sign(data, secret, { expiresIn }, (err, token) => {
    if (err) reject(err);
    resolve(token);
  });
});

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
