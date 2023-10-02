const jwt = require('jsonwebtoken');
const { User } = require('../models');

const login = async (params) => {
  const { email, password } = params;
  const user = await User.findOne({ where: { email } });
  
  if (!user || password !== user.password) {
 return { 
    status: 'BAD_REQUEST', data: { message: 'Invalid fields' } }; 
}

  const token = jwt.sign({
    email: user.email, 
    id: user.id,
  }, process.env.JWT_SECRET, {
    expiresIn: '72h',
    algorithm: 'HS256',
  });

  return { status: 'SUCCESSFUL', data: { token } };
};

module.exports = {
  login,
};