import jwt from 'jsonwebtoken';
import Users from '../Models/user.js';
import bcrypt from 'bcryptjs';
import asynHandler from 'express-async-handler';
import { isValidObjectId } from 'mongoose';
import verficationToken from '../Models/token.js';

const protectSimpleUser = asynHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.jwt_Secret);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not Authorized');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('No Token');
  }
});

const isAdmin = asynHandler(async (req, res, next) => {
  if (req.user && req.user.role.name === 'adminRole') {
    next();
  } else {
    res.status(401);
    throw new Error('Not Authorized as an admin');
  }
});

const validator = asynHandler(async (req, res, next) => {
  const { token, id } = req.query;
  console.log('======');
  console.log(token);
  //console.log(req.query)
  if (!token || !id) {
    throw new Error('Invalid request');
  }
  if (!isValidObjectId(id)) {
    throw new Error('Invalid User');
  }
  const user = await Users.findById(id);
  if (!user) {
    throw new Error('User Not Found');
  }
  const reset = await verficationToken.findOne({ owner: user._id });
  if (!reset) {
    throw new Error('Reset token not found');
  }
  const isMatch = await bcrypt.compareSync(token, reset.vtoken);
  if (!isMatch) {
    res.status(404);
    throw new Error('Invalid Token');
  }
  req.user = user;
  next();
});

export { protectSimpleUser, validator, isAdmin };
