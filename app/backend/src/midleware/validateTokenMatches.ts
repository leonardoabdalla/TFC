import { Request, Response, NextFunction } from 'express';
import jwtService from '../services/jwtService';

const validateTokenMatches = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (authorization === undefined) {
      const error = new Error('Expired or invalid token');
      error.name = 'UnauthorizedError';
      throw error;
    }
    jwtService.validateToken(authorization);
    next();
  } catch (e) {
    next(e);
  }
};

export default validateTokenMatches;
