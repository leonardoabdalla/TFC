import { Request, Response, NextFunction } from 'express';
import jwtService from '../services/jwtService';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (authorization === undefined) {
      const error = new Error('Expired or invalid token');
      error.name = 'UnauthorizedError';
      throw error;
    }
    const user = jwtService.validateToken(authorization);
    const { data }: any = user;
    const { role }: any = data;
    res.status(200).json({ role });
  } catch (e) {
    next(e);
  }
};

export default validateToken;
