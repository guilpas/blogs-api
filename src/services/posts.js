const { BlogPost, User, PostCategory, Category, sequelize } = require('../models');
const validate = require('./validations/validateInputValues');

const addPost = async (userId, postData) => {
  const error = await validate.validateNewPost(postData);
  if (error) return { status: error.status, data: { message: error.message } };
  const { title, content, categoryIds } = postData;
  try {
    const data = await sequelize.transaction(async (t) => {
      const post = await BlogPost.create({ title, content, userId }, { transaction: t });
      const promises = categoryIds.map(async (categoryId) => PostCategory.create({
        categoryId, postId: post.id }, { transaction: t }));
      await Promise.all(promises);
      return post;
    });
    return { status: 'CREATED', data };
  } catch (e) {
    return { status: 'ERROR', data: { message: e.original.code } };
  }  
};

const getAllPosts = async () => {
  const data = await BlogPost.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  return { status: 'SUCCESSFUL', data };
};

const findPostById = async (id) => {
  const data = await BlogPost.findByPk(id, {
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  if (!data) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  return { status: 'SUCCESSFUL', data };
};

const authorizedChange = async (id, postId) => {
  const p = await BlogPost.findByPk(postId);
  if (!p) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  if (p.userId !== id) return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } }; 
};

const editPost = async (userId, postId, postData) => {
  const error = await validate.validateEditPost(postData);
  if (error) return { status: error.status, data: { message: error.message } };
  const authError = await authorizedChange(userId, postId);
  if (authError) return { status: authError.status, data: authError.data };
  await BlogPost.update({ ...postData }, { where: { id: postId } });
  return findPostById(postId);
};
const deletePost = async (userId, postId) => {
  const authError = await authorizedChange(userId, postId);
  if (authError) return { status: authError.status, data: authError.data };
  await BlogPost.destroy({ where: { id: postId } });
  return { status: 'NO_CONTENT' };
};
module.exports = { addPost, getAllPosts, findPostById, editPost, deletePost };