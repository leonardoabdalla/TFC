import { Request, Response } from 'express';
import leaderService from '../services/leaderHomeService';

const leaderController = {
  homeTeam: async (req: Request, res: Response) => {
    const rows = await leaderService.homeTeam();
    res.status(200).json(rows);
  },

  awayTeam: async (req: Request, res: Response) => {
    const rows = await leaderService.awayTeam();
    res.status(200).json(rows);
  },

  getAll: async (req: Request, res: Response) => {
    const rows = await leaderService.getAll();
    res.status(200).json(rows);
  },
};

export default leaderController;
