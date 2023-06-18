const jwt = require('jsonwebtoken');
const { Unauthorized } = require('http-errors');

const { Admin } = require('../models');
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Unauthorized('Not authorized');
    }
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized');
    }

    jwt.verify(token, SECRET_KEY);
    const admin = await Admin.findOne({ token });
    if (!admin) {
      throw new Unauthorized('Not authorized');
    }
    
    const TokenExpired = isTokenExpired(token);

    if (TokenExpired) {
      throw new Unauthorized('Token is expired');
    }
    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = 'Not authorized (invalid access token)';
    }
    next(error);
  }
};

const isTokenExpired = token =>
  Date.now() >=
  JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).exp * 1000;

module.exports = authenticate;
