const { Category } = require('../models');
const validate = require('./validations/validateInputValues');

const addCategory = async (categoryData) => {
  const error = validate.validateNewCategory(categoryData);
  if (error) return { status: error.status, data: { message: error.message } };
  
  const newCategory = await Category.create(categoryData);

  return { status: 'CREATED', data: newCategory };
};

const getAllCategories = async () => {
  const data = await Category.findAll();
  return { status: 'SUCCESSFUL', data };
};

module.exports = {
  addCategory,
  getAllCategories,
};