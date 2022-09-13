import { Request, Response } from 'express';
import leaderService from '../services/leaderHomeService';

const leaderController = {
  homeTeam: async (req: Request, res: Response) => {
    const rows: any = await leaderService.homeTeam();
    res.status(200).json(rows);
  },

  awayTeam: async (req: Request, res: Response) => {
    const rows: any = await leaderService.awayTeam();
    res.status(200).json(rows);
  },
};

export default leaderController;
