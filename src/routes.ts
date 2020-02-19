import { Router, Application } from 'express';
import userRouter from './modules/user/user.routes';
import postRouter from './modules/post/post.routes';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/posts', postRouter);

export default function useApiRouter(app: Application) {
  app.use('/api/v1', apiRouter);
}
