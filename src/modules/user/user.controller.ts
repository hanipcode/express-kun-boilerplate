import { Request, Response } from 'express';
import * as yup from 'yup';
import bcrypt from 'bcrypt';
import validationWording from '../../constants/validationWording';
import User from './user.model';
import jwt from 'jsonwebtoken';
import NotFoundError from '../../interfaces/NotFoundError';
import InvalidRequestError from '../../interfaces/InvalidRequestError';
import { Document, MongooseDocument } from 'mongoose';
import keys from '../../constants/keys';
import { loginValidation, registerValidation } from './validations';

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  const schema = registerValidation;
  const validatedBody = schema.validateSync(body);

  const user = await User.create(validatedBody);

  res.json({
    message: 'success creating user',
    data: user
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { body } = req;
  const schema = loginValidation;
  const validatedBody = schema.validateSync(body);
  const user = await User.findOne({
    email: validatedBody.email
  }).select('_id email name password');
  if (!user) {
    throw new NotFoundError(validationWording.notFound('user'), 'user');
  }

  if (!bcrypt.compareSync(validatedBody.password, user.password)) {
    throw new InvalidRequestError(
      validationWording.invalid('password'),
      'password'
    );
  }

  delete user.password;
  const token = jwt.sign({ data: user }, keys.secretKey, {
    expiresIn: '1h'
  });

  res.json({
    data: user,
    token,
    message: 'Successfully login'
  });
};
