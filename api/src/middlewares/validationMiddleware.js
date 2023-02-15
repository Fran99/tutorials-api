/**
 * Validates a component schema against some input data, usually req.body or req.query
 * @param {{validate: Function}} schema
 * @returns {(function(*, *, *): void)|*}
 */
module.exports.validationMiddleware = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) return next(error);
  return next();
};
