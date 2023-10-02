const { userSchema, categorySchema, newPostSchema, editPostSchema } = require('./schemas');
const { Category } = require('../../models');

const validateNewUser = (keysObjectToValidate) => {
  const { error } = userSchema.validate(keysObjectToValidate);
  if (error) return { status: 'BAD_REQUEST', message: error.message };
};

const validateNewCategory = (keysObjectToValidate) => {
  const { error } = categorySchema.validate(keysObjectToValidate);
  if (error) return { status: 'BAD_REQUEST', message: error.message };
};

const validateNewPost = async (postData) => {
  const { error } = newPostSchema.validate(postData);
  if (error) return { status: 'BAD_REQUEST', message: error.message };
  const { categoryIds } = postData;
  const promises = categoryIds
    .map(async (categoryId) => Category.findOne({ where: { id: categoryId } }));
  const results = await Promise.all(promises);
  const notFoundCategoryId = results.some((result) => !result);
  if (notFoundCategoryId) {
    return { 
      status: 'BAD_REQUEST', 
      message: 'one or more "categoryIds" not found', 
    }; 
  }
};

const validateEditPost = async (postData) => {
  const { error } = editPostSchema.validate(postData);
  if (error) return { status: 'BAD_REQUEST', message: error.message };
};

module.exports = {
  validateNewUser,
  validateNewCategory,
  validateNewPost,
  validateEditPost,
};