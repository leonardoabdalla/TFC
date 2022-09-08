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

    const valueInProgress = Boolean(inProgress);
    const matchFilter = await dbMatches.findAll({
      include: [{
        model: Team, as: 'teamHome', attributes: ['teamName'],
      }, { model: Team, as: 'teamAway', attributes: ['teamName'] }],
      where: { inProgress: valueInProgress },
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
    if (homeTeam === awayTeam) {
      const e = new Error('It is not possible to create a match with two equal teams');
      e.name = 'ValidaEmail';
      throw e;
    }
    return matchCreate;
  },

  updateFinished: async (id: any) => {
    await dbMatches.update({
      inProgress: false,
    }, { where: { id } });
  },
};

export default matchesModel;
