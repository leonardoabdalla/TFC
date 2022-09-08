import Team from '../database/models/teamsModel';
import dbMatches from '../database/models/matchModel';

const matchesModel = {
  getAll: async (query: any) => {
    const { inProgress } = query;
    if (query.inProgress?.length === undefined) {
      const matches = await dbMatches.findAll({
        include: [{
          model: Team, as: 'teamHome', attributes: ['teamName'],
        }, { model: Team, as: 'teamAway', attributes: ['teamName'] }],
      });
      return matches;
    }

    const matchFilter = await dbMatches.findAll({
      include: [{
        model: Team, as: 'teamHome', attributes: ['teamName'],
      }, { model: Team, as: 'teamAway', attributes: ['teamName'] }],
      where: { inProgress },
    });
    return matchFilter;
  },

  getAdd: async (homeTeam: any, awayTeam: any, homeTeamGoals: any, awayTeamGoals: any) => {
    const matchCreate = await dbMatches.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return matchCreate;
  },
};

export default matchesModel;
