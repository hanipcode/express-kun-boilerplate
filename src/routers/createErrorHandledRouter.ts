import { Router } from 'express';
import { withErrorHandler } from 'express-kun';
import errorHandlerMiddleware from '../middlewares/errorHandlerMiddleware';

export default function createErrorHandledRouter() {
  const router = Router();
  return withErrorHandler(router, errorHandlerMiddleware);
}
