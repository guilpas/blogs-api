const jwt = require('jsonwebtoken');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers; // Bearer token
  try {
    if (!authorization) {
 res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token not found' }); 
}
    const token = authorization.split(' ')[1]; // token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // email, id
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error(err);
    res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Expired or invalid token' });
  }
};

module.exports = authMiddleware;