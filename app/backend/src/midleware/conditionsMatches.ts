import teamsService from '../services/teamsService';

const matchesConditions = {
  conditiones: async (homeTeam: number, awayTeam: number) => {
    if (homeTeam === awayTeam) {
      const e = new Error('It is not possible to create a match with two equal teams');
      e.name = 'ValidaEmail';
      throw e;
    }
    const teamHome = await teamsService.getById(homeTeam);
    const teamAway = await teamsService.getById(awayTeam);
    console.log('temHome => ', teamHome, 'teamAway => ', teamAway);
    if (teamHome === null || teamAway === null) {
      const e = new Error('There is no team with such id!');
      e.name = 'nonexistent';
      throw e;
    }
  },
};

export default matchesConditions;
