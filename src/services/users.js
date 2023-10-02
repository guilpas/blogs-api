const { User, BlogPost } = require('../models');
const loginService = require('./login');
const validate = require('./validations/validateInputValues');

const createUser = async (userData) => {
  const error = validate.validateNewUser(userData);
  if (error) return { status: error.status, data: { message: error.message } };
  const { email } = userData;
  const user = await User.findOne({ where: { email } });
  if (user) return { status: 'CONFLICT', data: { message: 'User already registered' } };
  
  const newUser = await User.create(userData);
  const { data } = await loginService.login(newUser);

  return { status: 'CREATED', data };
};

const getAllUsers = async () => {
  const data = await User.findAll({
    include: { model: BlogPost },
    attributes: { exclude: ['password'] },
  });
  return { status: 'SUCCESSFUL', data };
};

const findUserById = async (id) => {
  const data = await User
  .findByPk(id, { include: { model: BlogPost }, attributes: { exclude: ['password'] } });
  if (!data) return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };

  return { status: 'SUCCESSFUL', data };
};

const deleteUser = async (userId) => {
  await User.destroy({ where: { id: userId } });
  return { status: 'NO_CONTENT' };
};

module.exports = {
  createUser,
  getAllUsers,
  findUserById,
  deleteUser,
};