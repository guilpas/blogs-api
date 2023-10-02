const { usersService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const newUser = async (req, res) => {
  const { body } = req; 
  const { status, data } = await usersService.createUser(body);
  return res.status(mapStatusHTTP(status)).json(data);
};

const getAllUsers = async (_req, res) => {
  const { status, data } = await usersService.getAllUsers();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findUserById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await usersService.findUserById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteUser = async (req, res) => {
  const { userId } = req; 
  const { status, data } = await usersService.deleteUser(userId);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  newUser,
  getAllUsers,
  findUserById,
  deleteUser,
};