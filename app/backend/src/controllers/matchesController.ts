import { Request, Response } from 'express';
import matchesServide from '../services/matchesService';

const matchesController = {
  getAll: async (req: Request, res: Response) => {
    const { query } = req;
    const matches = await matchesServide.getAll(query);
    res.status(200).json(matches);
  },

  getAdd: async (req:Request, res: Response) => {
    console.log('cheguei aqui');
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const getAdd = await matchesServide.getAdd(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
    res.status(201).json(getAdd);
  },

  updateFinished: async (req: Request, res: Response) => {
    const { id } = req.params;
    await matchesServide.updateFinished(id);
    res.status(200).json({ message: 'Finished' });
  },

  updateGoals: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await matchesServide.updateGoals(id, homeTeamGoals, awayTeamGoals);
    res.status(200).json({ message: 'alteração realizada' });
  },
};

export default matchesController;
