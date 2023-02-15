const Joi = require('joi');

const tutorialSchema = Joi.object({
  title: Joi.string()
    .min(8)
    .max(255)
    .required(),
  videoURL: Joi.string()
    .max(512)
    .uri(),
  description: Joi.string(),
  publishedStatus: Joi.string()
    .valid('draft', 'pending', 'published')
    .required(),
});

module.exports = {
  tutorialSchema,
};
