import * as userController from './user.controller';
import { Router, Request, Response, NextFunction } from 'express';
import errorHandlerMiddleware from '../../middlewares/errorHandlerMiddleware';
import { withErrorHandler } from 'express-kun';

const userRouter = Router();

const errorHandledRoute = withErrorHandler(userRouter, errorHandlerMiddleware);

errorHandledRoute.post('/', userController.createUser);
errorHandledRoute.post('/login', userController.loginUser);

export default errorHandledRoute;
