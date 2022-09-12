// import dbMatches from '../database/models/matchModel';

// const leaderHomeService = {
  getAllMatches: async () => {
    const matches = await dbMatches.findAll({
      where: { inProgress: false },
      order: [
        []
      ],
    });
    return matches;
  },
// };

// export default leaderHomeService;
