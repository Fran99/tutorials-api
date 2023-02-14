const Joi = require('joi');

module.exports.tutorialsSchema = Joi.object({
  username: Joi.string().required(),
});
