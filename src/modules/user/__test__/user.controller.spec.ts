import * as userController from '../user.controller';
import bcrypt from 'bcrypt';
import User from '../user.model';
import { mockRequest, mockResponse } from '../../../utils/testUtils';
import { ValidationError } from 'yup';
import jwt from 'jsonwebtoken';
import validationWording from '../../../constants/validationWording';
import keys from '../../../constants/keys';
import InvalidRequestError from '../../../interfaces/InvalidRequestError';
jest.mock('../user.model.ts');
jest.mock('jsonwebtoken');

describe('User Controller', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe('Register', () => {
    test('Given email, password, name in the boey, it can handle creating user', async () => {
      // arrange
      const req = mockRequest();
      const res = mockResponse();
      const email = 'hanif@mail.com';
      const name = 'Muhammad Hanif';
      const password = 'passwordku123456!';
      req.body.email = email;
      req.body.password = password;
      req.body.name = name;

      // act
      await userController.createUser(req, res);

      // assert
      expect(User.create).toBeCalled();
      expect(User.create).toBeCalledWith({
        email,
        name,
        password
      });
      expect(res.json).toBeCalled();
    });

    test('it throws error when password is empty', async () => {
      // arrange
      const req = mockRequest();
      const res = mockResponse();
      const email = 'hanif@mail.com';
      const name = 'Muhammad Hanif';
      req.body.name = name;
      req.body.email = email;

      // act
      try {
        await userController.createUser(req, res);
      } catch (e) {
        expect(e).toBeInstanceOf(ValidationError);
        expect(e.message).toEqual(validationWording.required('password'));
      }

      // assert
      expect(User.create).not.toBeCalled();
    });

    test('it throws error when name is empty', async done => {
      // arrange
      const req = mockRequest();
      const res = mockResponse();
      const email = 'hanif@mail.com';
      req.body.email = email;
      const password = 'passwordku123456!';
      req.body.password = password;
      // act
      try {
        await userController.createUser(req, res);
      } catch (e) {
        expect(e).toBeInstanceOf(ValidationError);
        expect(e.message).toEqual(validationWording.required('name'));
      }
      //  assert
      expect(User.create).not.toBeCalled();
      done();
    });

    test('it throws error when email is empty', async done => {
      // arrange
      const req = mockRequest();
      const res = mockResponse();
      const name = 'Muhammad Hanif';
      req.body.name = name;
      const password = 'passwordku123456!';
      req.body.password = password;
      // act
      try {
        await userController.createUser(req, res);
      } catch (e) {
        expect(e).toBeInstanceOf(ValidationError);
        expect(e.message).toEqual(validationWording.required('email'));
      }
      //  assert
      expect(User.create).not.toBeCalled();
      done();
    });

    test('it throws error when email is invalid', async done => {
      // arrange
      const req = mockRequest();
      const res = mockResponse();
      const name = 'Muhammad Hanif';
      req.body.name = name;
      const password = 'passwordku123456!';
      req.body.password = password;
      const email = 'hanifemailnya suka suka';
      req.body.email = email;
      // act
      try {
        await userController.createUser(req, res);
      } catch (e) {
        expect(e).toBeInstanceOf(ValidationError);
        expect(e.message).toEqual(validationWording.invalid('email'));
      }
      //  assert
      expect(User.create).not.toBeCalled();
      done();
    });
  });

  describe('Login', () => {
    test('Given email and password in the body, it can handle login', async () => {
      // arrange
      const req = mockRequest();
      const res = mockResponse();
      const email = 'hanif@mail.com';
      const password = 'passwordku123456!';
      req.body.email = email;
      req.body.password = password;

      const currentUser = {
        email,
        password,
        name: 'ceritanya nama'
      };

      (jwt.sign as jest.Mock).mockImplementation(() => '131j213jToken');
      (User.findOne as jest.Mock).mockImplementation(() => ({
        select: jest.fn().mockReturnValue({
          ...currentUser,
          password: bcrypt.hashSync(currentUser.password, keys.salt)
        })
      }));

      // act
      await userController.loginUser(req, res);

      // assert
      expect(User.findOne).toBeCalled();
      expect(User.findOne).toBeCalledWith({
        email
      });
      expect(jwt.sign).toBeCalled();
      expect(jwt.sign).toBeCalledWith(
        {
          data: expect.objectContaining({
            name: currentUser.name,
            email: currentUser.email
          })
        },
        keys.secretKey,
        expect.any(Object)
      );
      expect(res.json).toBeCalled();
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            name: currentUser.name,
            email: currentUser.email
          }),
          token: expect.any(String)
        })
      );
    });
    test('Given incorrect password in the body, it throw InvalidRequestError', async () => {
      // arrange
      const req = mockRequest();
      const res = mockResponse();
      const email = 'hanif@mail.com';
      const password = 'passwordku123456!';
      req.body.email = email;
      req.body.password = password;

      const currentUser = {
        email,
        password,
        name: 'ceritanya nama'
      };

      (User.findOne as jest.Mock).mockImplementation(() => ({
        select: jest.fn().mockReturnValue({
          ...currentUser,
          password: bcrypt.hashSync('wrong password', keys.salt)
        })
      }));

      // act
      try {
        await userController.loginUser(req, res);
      } catch (e) {
        expect(e).toBeInstanceOf(InvalidRequestError);
      }
    });

    test('Given invalid body, it throw ValidationError', async () => {
      // arrange
      const req = mockRequest();
      const res = mockResponse();
      const email = 'hanif@mail.com';
      req.body.email = email;

      const currentUser = {
        email,
        name: 'ceritanya nama'
      };

      (User.findOne as jest.Mock).mockImplementation(() => ({
        select: jest.fn().mockReturnValue({
          ...currentUser
        })
      }));

      // act
      try {
        await userController.loginUser(req, res);
      } catch (e) {
        expect(e).toBeInstanceOf(ValidationError);
        expect(e.message).toEqual(validationWording.required('password'));
      }
    });
  });
});
