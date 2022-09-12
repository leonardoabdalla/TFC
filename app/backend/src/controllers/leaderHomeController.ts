// import { Request, Response } from 'express';
import leaderHomeService from '../services/leaderHomeService';

// const leaderHomeController = {
  getAllClassification: async (req: Request, res: Response) => {
    const matches = await leaderHomeService.getAllMatches();
    const leaderMatches = await leaderHomeService.getAllLeaders(matches);
    res.status(200).end();
  },

// };

// export default leaderHomeController;
