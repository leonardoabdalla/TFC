import Team from '../database/models/teamsModel';
import dbMatches from '../database/models/matchModel';
import matchesConditions from '../midleware/conditionsMatches';

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
    const valueInProgress = (inProgress === 'true');
    const matchFilter = await dbMatches.findAll({
      include: [{
        model: Team, as: 'teamHome', attributes: ['teamName'],
      }, { model: Team, as: 'teamAway', attributes: ['teamName'] }],
      where: { inProgress: valueInProgress },
    });
    return matchFilter;
  },

  getAdd: async (homeTeam: any, awayTeam: any, homeTeamGoals: any, awayTeamGoals: any) => {
    matchesConditions.conditiones(homeTeam, awayTeam);
    const matchCreate = await dbMatches.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return matchCreate;
  },

  updateFinished: async (id: any) => {
    await dbMatches.update({
      inProgress: false,
    }, { where: { id } });
  },
};

export default matchesModel;
