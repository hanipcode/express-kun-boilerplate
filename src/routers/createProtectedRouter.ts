import { withJWTAuthMiddleware } from 'express-kun';
import { Router } from 'express';
import keys from '../constants/keys';

export default function createProtectedRouter() {
  const router = Router();
  return withJWTAuthMiddleware(router, keys.secretKey);
}
