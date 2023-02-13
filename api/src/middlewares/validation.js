/**
 * Validates a component schema against some input data, usually req.body
 * @param {{validate: Function}} schema
 * @returns {(function(*, *, *): void)|*}
 */
module.exports.validation = (schema) => (req, res, next) => {
  const { error, data } = schema.validate(req.body);
  console.log(data);
  if (error) return next(error);
  return next();
};
