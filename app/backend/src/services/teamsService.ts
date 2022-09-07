import dbTeams from '../database/models/teamsModel';

const teamsService = {
  getAll: async () => {
    const getAllTeams = await dbTeams.findAll();
    return getAllTeams;
  },
  getById: async (id: any) => {
    const getByIdTeam = await dbTeams.findByPk(id);
    return getByIdTeam;
  },
};

export default teamsService;
