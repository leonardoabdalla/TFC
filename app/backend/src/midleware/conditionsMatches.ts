import teamsService from '../services/teamsService';

const matchesConditions = {
  conditiones: async (homeTeam: any, awayTeam: any) => {
    const teamHome = await teamsService.getById(homeTeam);
    const teamAway = await teamsService.getById(awayTeam);
    if (teamHome === null || teamAway === null) {
      const e = new Error('There is no team with such id!');
      e.name = 'nonexistent';
      throw e;
    }
    if (homeTeam === awayTeam) {
      const e = new Error('It is not possible to create a match with two equal teams');
      e.name = 'ValidaEmail';
      throw e;
    }
  },
};

export default matchesConditions;
