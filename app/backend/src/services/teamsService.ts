import dbTeams from '../database/models/teamsModel';

const teamsService = {
  getAll: async () => {
    const getAllTeams = await dbTeams.findAll();
    return getAllTeams;
  },
};

export default teamsService;
