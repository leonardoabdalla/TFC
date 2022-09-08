import { Request, Response } from 'express';
import matchesServide from '../services/matchesService';

const matchesController = {
  getAll: async (req: Request, res: Response) => {
    const matches = await matchesServide.getAll();
    res.status(200).json(matches);
  },
};

export default matchesController;
