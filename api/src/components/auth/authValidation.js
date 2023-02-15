const Joi = require('joi');

const signUpSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(128)
    .pattern(/^[a-z ,.'-]+$/i)
    .required()
    .messages({
      'string.pattern.base': 'Your name does not appear to be valid',
    }),
  lastname: Joi.string()
    .min(2)
    .max(128)
    .pattern(/^[a-z ,.'-]+$/i)
    .required()
    .messages({
      'string.pattern.base': 'Your lastname does not appear to be valid',
    }),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
  isAdmin: Joi.boolean(),
});

const signInSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
});

module.exports = {
  signUpSchema,
  signInSchema,
};
