const jwt = require('jsonwebtoken');

handleUnauthorized = function (req, next) {
  req.isAuth = false;
  return next();
};

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return handleUnauthorized(req, next);
  }

  const token = authHeader.split(' ')[1];

  if (!token || token === '') {
    return handleUnauthorized(req, next);
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return handleUnauthorized(req, next);
  }

  if (!decodedToken) {
    return handleUnauthorized(req, next);
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
}
