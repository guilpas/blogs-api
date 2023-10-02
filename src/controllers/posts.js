const { postsService, searchService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const addPost = async (req, res) => {
  const { body, userId } = req; 
  const { status, data } = await postsService.addPost(userId, body);
  return res.status(mapStatusHTTP(status)).json(data);
};

const getAllPosts = async (_req, res) => {
  const { status, data } = await postsService.getAllPosts();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findPostById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await postsService.findPostById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const editPost = async (req, res) => {
  const { body, userId, params: { postId } } = req; 
  const { status, data } = await postsService.editPost(userId, postId, body);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deletePost = async (req, res) => {
  const { userId, params: { postId } } = req; 
  const { status, data } = await postsService.deletePost(userId, postId);
  return res.status(mapStatusHTTP(status)).json(data);
};

const searchPosts = async (req, res) => {
  const { q } = req.query;
  const { status, data } = await searchService.searchPosts(q);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  addPost,
  getAllPosts,
  findPostById,
  editPost,
  deletePost,
  searchPosts,
};