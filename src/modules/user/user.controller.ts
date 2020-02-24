import { Request, Response } from 'express';
import * as yup from 'yup';
import bcrypt from 'bcrypt';
import validationWording from '../../constants/validationWording';
import UserRepository from './user.repository';
import jwt from 'jsonwebtoken';
import NotFoundError from '../../interfaces/NotFoundError';
import InvalidRequestError from '../../interfaces/InvalidRequestError';
import keys from '../../constants/keys';

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  const schema = yup.object().shape({
    email: yup
      .string()
      .email(validationWording.invalid('email'))
      .required(validationWording.required('email')),
    password: yup
      .string()
      .min(8, validationWording.minLength(8))
      .required(validationWording.required('password')),
    name: yup.string().required(validationWording.required('name'))
  });
  const validatedBody = schema.validateSync(body);
  const userRepository = new UserRepository();

  const user = await userRepository.createUser({
    email: validatedBody.email,
    password: validatedBody.password,
    name: validatedBody.name
  });

  res.json({
    message: 'success creating user',
    data: user
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { body } = req;
  const schema = yup.object().shape({
    email: yup
      .string()
      .email(validationWording.invalid('email'))
      .required(validationWording.required('email')),
    password: yup.string().required(validationWording.required('password'))
  });
  const validatedBody = schema.validateSync(body);
  const userRepository = new UserRepository();
  const user = await userRepository.findOneUserWithPassword({
    email: validatedBody.email
  });
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
