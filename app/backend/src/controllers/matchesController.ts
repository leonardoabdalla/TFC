import { Request, Response } from 'express';
import matchesServide from '../services/matchesService';

const matchesController = {
  getAll: async (req: Request, res: Response) => {
    const { query } = req;
    const matches = await matchesServide.getAll(query);
    res.status(200).json(matches);
  },

  getAdd: async (req:Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const getAdd = await matchesServide.getAdd(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
    res.status(201).json(getAdd);
  },
};

export default matchesController;
