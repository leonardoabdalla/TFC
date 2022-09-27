import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import { Response } from 'superagent';
import Team from '../database/models/teamsModel';

chai.use(chaiHttp);

const { expect } = chai;

const leaderboardMock: any = {
  name: "any-name",
  totalPoints: 4,
  totalGames: 3,
  totalVictories: 1,
  totalDraws: 1,
  totalLosses: 0,
  goalsFavor: 4,
  goalsOwn: 1,
  goalsBalance: 2,
  efficiency: 100
}

describe('Leaderboard', () => {
  describe('List home and away teams', () => {
    it(`. get home, should return status 200`, async () => {

      const response = await chai.request(app)
        .get('/leaderboard/home')

      expect(response.status).to.equal(200);
    }) 

    it(`. get away, should return status 200`, async () => {

      const response = await chai.request(app)
        .get('/leaderboard/away')

      expect(response.status).to.equal(200);
    }) 

    it(`should return home teams`, async () => {
      sinon.stub(LeaderboardService.prototype, 'listHomeTeam').resolves([leaderboardMock]);
      const response = await chai.request(app)
        .get('/leaderboard/home')

      expect(response.body).to.be.deep.equal([leaderboardMock]);
    }) 


  });
});