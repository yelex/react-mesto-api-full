const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized'); // 401

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  // check if headers have valid token
  if (!token) {
    return (next(new UnauthorizedError('Необходима авторизация')));
  }

  let payload;
  // check if token is ok
  try {
    payload = jwt.verify(token, 'dev-secret');
  } catch (err) {
    return (next(new UnauthorizedError('Необходима авторизация')));
  }

  req.user = payload; // в объект запроса записываем user: _id

  return next();
};
