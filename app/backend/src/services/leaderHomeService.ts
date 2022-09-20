import db from '../database/models';

require('dotenv/config');

const teamHome = `
SELECT
    T.team_name as "name",
    (3 * SUM(home_team_goals > away_team_goals))
      + SUM(home_team_goals = away_team_goals) AS "totalPoints",
COUNT(team_name) AS "totalGames",
    SUM(home_team_goals > away_team_goals) AS "totalVictories",
    SUM(home_team_goals = away_team_goals) AS "totalDraws",
    SUM(home_team_goals < away_team_goals) AS "totalLosses",
    SUM(home_team_goals) AS "goalsFavor",
    SUM(away_team_goals) AS "goalsOwn",
    SUM(home_team_goals) - SUM(away_team_goals) AS "goalsBalance",
    ROUND((((3 * SUM(home_team_goals > away_team_goals) + SUM(home_team_goals = away_team_goals))
    / (COUNT(team_name) * 3)) * 100), 2) AS "efficiency"
  FROM
    TRYBE_FUTEBOL_CLUBE.matches AS M
  JOIN
    TRYBE_FUTEBOL_CLUBE.teams AS T
  ON
    M.home_team = T.id
  WHERE
    M.in_progress = 0
  GROUP BY
    M.home_team
  ORDER BY
    (3 * SUM(home_team_goals > away_team_goals)) + SUM(home_team_goals = away_team_goals) desc,
    SUM(home_team_goals) - SUM(away_team_goals) desc,
    SUM(home_team_goals) desc,
    SUM(away_team_goals) desc;`;

const teamAway = `
SELECT
    T.team_name as "name",
    (3 * SUM(away_team_goals > home_team_goals ))
      + SUM(away_team_goals = home_team_goals ) AS "totalPoints",
COUNT(team_name) AS "totalGames",
    SUM(away_team_goals  > home_team_goals ) AS "totalVictories",
    SUM(away_team_goals  = home_team_goals) AS "totalDraws",
    SUM(away_team_goals  < home_team_goals ) AS "totalLosses",
    SUM(away_team_goals) AS "goalsFavor",
    SUM(home_team_goals ) AS "goalsOwn",
    SUM(away_team_goals) - SUM(home_team_goals) AS "goalsBalance",
    ROUND((((3 * SUM(away_team_goals  > home_team_goals ) + SUM(away_team_goals = home_team_goals))
    / (COUNT(team_name) * 3)) * 100), 2) AS "efficiency"
  FROM
    TRYBE_FUTEBOL_CLUBE.matches AS M
  JOIN
    TRYBE_FUTEBOL_CLUBE.teams AS T
  ON
    M.away_team = T.id
  WHERE
    M.in_progress = 0
  GROUP BY
    M.away_team
  ORDER BY
    (3 * SUM(away_team_goals > home_team_goals)) + SUM(away_team_goals = home_team_goals ) desc,
    SUM(away_team_goals ) - SUM(home_team_goals) desc,
    SUM(away_team_goals ) desc,
    SUM(home_team_goals) desc;
`;

const getAll = `SELECT
result.name,
SUM(result.totalPoints) AS totalPoints,
SUM(result.totalGames) AS totalGames,
SUM(result.totalVictories) AS totalVictories,
SUM(result.totalDraws) AS totalDraws ,
SUM(result.totalLosses) AS totalLosses,
SUM(result.goalsFavor) AS goalsFavor,
SUM(result.goalsOwn) AS goalsOwn,
SUM(result.goalsBalance) AS goalsBalance,
CAST(SUM(result.totalPoints) / (SUM(result.totalGames) * 3) * 100 AS DECIMAL(10, 2)) AS efficiency
FROM ((SELECT
tm.team_name AS name,
SUM(CASE WHEN mat.home_team_goals>mat.away_team_goals THEN 1 ELSE 0 END) * 3 +
  SUM(CASE WHEN mat.home_team_goals=mat.away_team_goals THEN 1 ELSE 0 END) * 1 AS totalPoints,
COUNT(mat.home_team) AS totalGames,
SUM(CASE WHEN mat.home_team_goals>mat.away_team_goals THEN 1 ELSE 0 END) AS totalVictories,
SUM(CASE WHEN mat.home_team_goals=mat.away_team_goals THEN 1 ELSE 0 END) AS totalDraws,
SUM(CASE WHEN mat.home_team_goals<mat.away_team_goals THEN 1 ELSE 0 END) AS totalLosses,
SUM(mat.home_team_goals) AS goalsFavor,
SUM(mat.away_team_goals) AS goalsOwn,
SUM(mat.home_team_goals) - SUM(mat.away_team_goals) AS goalsBalance,
CAST((SUM(CASE WHEN mat.home_team_goals>mat.away_team_goals THEN 1 ELSE 0 END) * 3 +
  SUM(CASE WHEN mat.home_team_goals=mat.away_team_goals THEN 1 ELSE 0 END)) /
    (COUNT(mat.home_team) * 3) * 100 AS DECIMAL(10, 2)) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.matches mat
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams tm
ON mat.home_team = tm.id
WHERE mat.in_progress IS NOT TRUE
GROUP BY mat.home_team)
UNION All
(SELECT 
tm.team_name AS name,
SUM(CASE WHEN mat.away_team_goals>mat.home_team_goals THEN 1 ELSE 0 END) * 3 +
  SUM(CASE WHEN mat.away_team_goals=mat.home_team_goals THEN 1 ELSE 0 END) * 1 AS totalPoints,
COUNT(mat.away_team) AS totalGames,
SUM(CASE WHEN mat.away_team_goals>mat.home_team_goals THEN 1 ELSE 0 END) AS totalVictories,
SUM(CASE WHEN mat.away_team_goals=mat.home_team_goals THEN 1 ELSE 0 END) AS totalDraws,
SUM(CASE WHEN mat.away_team_goals<mat.home_team_goals THEN 1 ELSE 0 END) AS totalLosses,
SUM(mat.away_team_goals) AS goalsFavor,
SUM(mat.home_team_goals) AS goalsOwn,
 SUM(mat.away_team_goals) - SUM(mat.home_team_goals) AS goalsBalance,
CAST((SUM(CASE WHEN mat.away_team_goals>mat.home_team_goals THEN 1 ELSE 0 END) * 3 +
SUM(CASE WHEN mat.away_team_goals=mat.home_team_goals THEN 1 ELSE 0 END)) /
  (COUNT(mat.home_team) * 3) * 100 AS DECIMAL(10, 2)) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.matches mat
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams tm
ON mat.away_team = tm.id
WHERE mat.in_progress IS NOT TRUE
GROUP BY mat.away_team)) AS result
GROUP BY result.name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

const leaderService = {
  homeTeam: async () => {
    const [getAllTeamsHome] = await db.query(teamHome);
    return getAllTeamsHome;
  },

  awayTeam: async () => {
    const [getAllTeamsAway] = await db.query(teamAway);
    return getAllTeamsAway;
  },

  getAll: async () => {
    const [getAllTot] = await db.query(getAll);
    return getAllTot;
  },
};

export default leaderService;
