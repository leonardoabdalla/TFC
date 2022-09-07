import { Request, Response } from 'express';
import teamService from '../services/teamsService';

const teamsController = {
  getAll: async (req: Request, res: Response) => {
    const rows: any = await teamService.getAll();
    res.status(rows);
  },
};

export default teamsController;
