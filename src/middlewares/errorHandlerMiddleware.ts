import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../interfaces/NotFoundError';
import InvalidRequestError from '../interfaces/InvalidRequestError';

export default function errorHandlerMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof NotFoundError) {
    res.status(404).json({
      message: err.message,
      error: true
    });
    return;
  }
  if (err instanceof InvalidRequestError) {
    res.status(400).json({
      message: err.message,
      error: true
    });
    return;
  }
  res.status(500).json({
    message: 'Internal Server Error',
    debugMessage: err.message,
    stack: err.stack,
    error: true
  });
}
