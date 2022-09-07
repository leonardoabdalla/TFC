import { Request, Response } from 'express';
import teamsService from '../services/teamsService';

const teamsController = {
  getAll: async (req: Request, res: Response) => {
    const rows: any = await teamsService.getAll();
    res.status(200).json(rows);
  },
  getById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await teamsService.getById(id);
    res.status(200).json(team);
  },
};

export default teamsController;
