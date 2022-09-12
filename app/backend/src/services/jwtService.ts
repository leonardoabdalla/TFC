import * as jwt from 'jsonwebtoken';

import 'dotenv';

const jwtValidation = process.env.JWT_SECRET as string;

const jwtService = {
  createToken: (data: object) => {
    const token = jwt.sign({ data }, jwtValidation);
    return token;
  },

  validateToken: (token: string) => {
    try {
      const data = jwt.verify(token, jwtValidation);
      return data;
    } catch (err) {
      const error = new Error('Token must be a valid token');
      error.name = 'UnauthorizedError';
      throw error;
    }
  },
};
//
export default jwtService;
