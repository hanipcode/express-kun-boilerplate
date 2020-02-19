import User from '../user.model';
import supertest from 'supertest';
import app from '../../../app';
import testConstants from '../../../constants/testConstants';

describe('User Route', () => {
  describe('Register', () => {
    test('Register user correctly', async done => {
      const response = await supertest(app)
        .post('/api/v1/users')
        .send(testConstants.user)
        .expect(200);
      expect(response.body).toEqual({
        data: expect.objectContaining({
          email: testConstants.user.email,
          name: testConstants.user.name
        }),
        message: expect.any(String)
      });
      done();
    });
  });

  describe('Login', () => {
    test('Login on correct password and email', async done => {
      const response = await supertest(app)
        .post('/api/v1/users/login')
        .send({
          email: testConstants.user.email,
          password: testConstants.user.password
        })
        .expect(200);
      expect(response.body).toEqual({
        data: expect.objectContaining({
          email: testConstants.user.email,
          name: testConstants.user.name
        }),
        message: expect.any(String),
        token: expect.any(String)
      });

      done();
    });
  });
});
