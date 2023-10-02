const { loginService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const login = async (req, res) => {
  const { body } = req; 
  const { status, data } = await loginService.login(body);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  login,
};