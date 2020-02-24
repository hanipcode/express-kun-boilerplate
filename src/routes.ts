import { Router, Application } from 'express';
import userRouter from './modules/user/user.routes';
import sampleRouter from './modules/sample/sample.routes';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/samples', sampleRouter);

export default function useApiRouter(app: Application) {
  app.use('/api/v1', apiRouter);
}
