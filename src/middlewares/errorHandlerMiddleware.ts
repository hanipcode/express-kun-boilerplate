import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../interfaces/NotFoundError';
import InvalidRequestError from '../interfaces/InvalidRequestError';
import { ValidationError } from 'yup';
import validationWording from '../constants/validationWording';
import TrackPackageError from '../interfaces/TrackPackageError';
import AccessError from '../interfaces/AccessError';
import ExtensionError from '../interfaces/ExtensionError';

export default function errorHandlerMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!err) {
    next();
    return;
  }
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
  if (err instanceof ValidationError) {
    res.status(400).json({
      message: err.message,
      error: true
    });
    return;
  }

  if (err instanceof ExtensionError) {
    res.status(400).json({
      message: err.message,
      error: true
    });
    return;
  }

  if (err instanceof AccessError) {
    res.status(401).json({
      message: err.message,
      error: true
    });
    return;
  }
  if (err instanceof TrackPackageError) {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
      error: true
    });
    return;
  }
  if (/E11000/gi.test(err.message)) {
    const firstBracket = err.message.split('{')[1];
    const fieldName = firstBracket.split(':')[0];
    const value = firstBracket.split(':')[1].replace(/[\s}]/gi, '');
    res.status(400).json({
      message: validationWording.duplicate(fieldName, value),
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
