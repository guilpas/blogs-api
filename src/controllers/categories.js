const { categoriesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const addCategory = async (req, res) => {
  const { body } = req; 
  const { status, data } = await categoriesService.addCategory(body);
  return res.status(mapStatusHTTP(status)).json(data);
};

const getAllCategories = async (_req, res) => {
  const { status, data } = await categoriesService.getAllCategories();
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  addCategory,
  getAllCategories,
};