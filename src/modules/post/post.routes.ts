import * as postController from './post.controller';
import { Router } from 'express';
import { withMiddleware, withErrorHandler } from 'express-kun';
import errorHandlerMiddleware from '../../middlewares/errorHandlerMiddleware';
import withAuthMiddleware from '../../routers/withAuthMiddleware';

const router = Router();
const errorHandledRouter = withErrorHandler(router, errorHandlerMiddleware);
const protectedRouter = withAuthMiddleware(errorHandledRouter);

protectedRouter.get('/', postController.getAll);
protectedRouter.post('/', postController.create);
protectedRouter.get('/:postId', postController.getPost);
protectedRouter.get('/:postId/comments', postController.getComments);
protectedRouter.post('/:postId/comments', postController.comment);
protectedRouter.post(
  '/:postId/comments/:commentId',
  postController.createSubComment
);
protectedRouter.put(
  '/:postId/comments/:commentId/points',
  postController.upsertPointToComment
);
protectedRouter.put('/:postId/points', postController.upsertPoint);

export default router;
