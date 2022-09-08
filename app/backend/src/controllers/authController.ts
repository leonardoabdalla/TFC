import { Request, Response } from 'express';
import authService from '../services/authService';

const authController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = authService.validateBody(req.body);

    const token = await authService.login(email, password);

    res.status(200).json({ token });
  },

};

export default authController;
