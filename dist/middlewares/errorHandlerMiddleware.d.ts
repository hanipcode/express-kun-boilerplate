import { NextFunction, Request, Response } from 'express';
export default function errorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction): void;
