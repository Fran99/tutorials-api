module.exports.authentication = (req, res, next) => {
  console.log('Auth middleware');
  return next();
};
