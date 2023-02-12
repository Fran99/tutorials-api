const jwt = require('jsonwebtoken');

const createToken = (data = {}) => {
  console.log(1);
  return jwt.sign(data, 'thesecret');
};

const validateToken = 1;

module.exports = {
  createToken,
  validateToken,
};
