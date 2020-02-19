import { withJWTAuthMiddleware } from 'express-kun';
import { Router } from 'express';
import keys from '../constants/keys';

export default function withAuthMiddleware(router: Router) {
  return withJWTAuthMiddleware(router, keys.secretKey);
}
