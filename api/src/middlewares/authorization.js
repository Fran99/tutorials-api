module.exports.authorization = (req, res, next) => {
  console.log('Authorization middleware');
  return next();
};
