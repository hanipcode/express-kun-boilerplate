import { StringSchema } from 'yup';
import app from '../app';
import supertest, { Response } from 'supertest';
import testConstants from '../constants/testConstants';

export function mockRequest() {
  const req: any = {};
  req.body = {};
  req.params = {};
  return req;
}

export function mockResponse() {
  const res: any = {};
  res.locals = {};
  res.locals.decoded = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

export function loginUser(auth: any) {
  const testRequest = supertest(app);
  return function(done: Function) {
    testRequest
      .post('/users/login')
      .send({
        email: testConstants.user.email,
        password: testConstants.user.password
      })
      .expect(200)
      .end(onResponse);

    function onResponse(_: any, res: Response) {
      auth.token = res.body.token;
      return done();
    }
  };
}
