import Team from '../database/models/teamsModel';
import dbMatches from '../database/models/matchModel';

const matchesModel = {
  getAll: async () => {
    const matches = await dbMatches.findAll({
      include: [{
        model: Team, as: 'teamHome', attributes: ['teamName'],
      }, { model: Team, as: 'teamAway', attributes: ['teamName'] }],
    });
    return matches;
  },
};

export default matchesModel;
