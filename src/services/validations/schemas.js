const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  image: Joi.string(),
});

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const newPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number().integer().min(1)),
});

const editPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

module.exports = {
  userSchema,
  categorySchema,
  newPostSchema,
  editPostSchema,
};