import { NextFunction } from 'express';
import {Logger} from './index.js';
const logger = new Logger();

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  logger.info('Auth');
  next();
};
