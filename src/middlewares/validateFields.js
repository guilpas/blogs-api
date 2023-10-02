const checkRequiredFields = require('../utils/checkRequiredFields');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const validateLoginFields = (req, res, next) => {
  const { body } = req;
  const requiredFields = ['email', 'password'];

  const error = checkRequiredFields(body, requiredFields);
  if (error) {
    return res.status(mapStatusHTTP('BAD_REQUEST')).json({ message: error });
  }

  return next();
};

const validateNewUserFields = (req, res, next) => {
  const { body } = req;
  const requiredFields = ['displayName', 'email', 'password'];

  const error = checkRequiredFields(body, requiredFields);
  if (error) {
    return res.status(mapStatusHTTP('BAD_REQUEST')).json({ message: error });
  }

  return next();
};

const validateNewPostFields = (req, res, next) => {
  const { body } = req;
  const requiredFields = ['title', 'content', 'categoryIds'];

  const error = checkRequiredFields(body, requiredFields);
  if (error) {
    return res.status(mapStatusHTTP('BAD_REQUEST')).json({ message: error });
  }

  return next();
};

const validateEditPostFields = (req, res, next) => {
  const { body } = req;
  const requiredFields = ['title', 'content'];

  const error = checkRequiredFields(body, requiredFields);
  if (error) {
    return res.status(mapStatusHTTP('BAD_REQUEST')).json({ message: error });
  }

  return next();
};

module.exports = {
  validateLoginFields,
  validateNewUserFields,
  validateNewPostFields,
  validateEditPostFields,
};