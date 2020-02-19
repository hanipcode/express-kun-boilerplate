import * as userController from './user.controller';
import { Router, Request, Response, NextFunction } from 'express';
import errorHandlerMiddleware from '../../middlewares/errorHandlerMiddleware';

const userRouter = Router();

userRouter.post('/', userController.createUser);
userRouter.post('/login', userController.loginUser);

userRouter.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'duar'
  });
});

export default userRouter;
