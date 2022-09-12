import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import db from '../database/models/matchModel';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota getAll de matches', () => {
    it('getAll de matches realizado com sucesso', async () => {
        const matchesMock: any = [
          {
            "id": 1,
            "homeTeam": 16,
            "homeTeamGoals": 1,
            "awayTeam": 8,
            "awayTeamGoals": 1,
            "inProgress": false,
            "teamHome": {
              "teamName": "São Paulo"
            },
            "teamAway": {
              "teamName": "Grêmio"
            }
          },
          {
            "id": 2,
            "homeTeam": 9,
            "homeTeamGoals": 1,
            "awayTeam": 14,
            "awayTeamGoals": 1,
            "inProgress": false,
            "teamHome": {
              "teamName": "Internacional"
            },
            "teamAway": {
              "teamName": "Santos"
            }
          },
          {
            "id": 3,
            "homeTeam": 4,
            "homeTeamGoals": 3,
            "awayTeam": 11,
            "awayTeamGoals": 0,
            "inProgress": false,
            "teamHome": {
              "teamName": "Corinthians"
            },
            "teamAway": {
              "teamName": "Napoli-SC"
            }
          }
        ];

        sinon.stub(db, 'findAll').resolves(matchesMock);

        const response = await chai.request(app).get('/matches');

        chai.expect(response.status).to.be.eq(200);
        chai.expect(response.body).to.be.deep.equal(matchesMock);
        
        sinon.restore();

    });

    it('inProgress=true de matches realizado com sucesso', async () => {
      const matchesMock: any = [
        {
          "id": 41,
          "homeTeam": 16,
          "homeTeamGoals": 2,
          "awayTeam": 9,
          "awayTeamGoals": 0,
          "inProgress": true,
          "teamHome": {
            "teamName": "São Paulo"
          },
          "teamAway": {
            "teamName": "Internacional"
          }
        },
        {
          "id": 42,
          "homeTeam": 6,
          "homeTeamGoals": 1,
          "awayTeam": 1,
          "awayTeamGoals": 0,
          "inProgress": true,
          "teamHome": {
            "teamName": "Ferroviária"
          },
          "teamAway": {
            "teamName": "Avaí/Kindermann"
          }
        }
      ];

      sinon.stub(db, 'findAll').resolves(matchesMock);

      const response = await chai.request(app).get('/matches?inProgress=true');

      chai.expect(response.status).to.be.eq(200);
      chai.expect(response.body).to.be.deep.equal(matchesMock);
      
      sinon.restore();

  });

  it('inProgress=false de matches realizado com sucesso', async () => {
    const matchesMock: any = [
      {
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": false,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Internacional"
        }
      },
      {
        "id": 42,
        "homeTeam": 6,
        "homeTeamGoals": 1,
        "awayTeam": 1,
        "awayTeamGoals": 0,
        "inProgress": false,
        "teamHome": {
          "teamName": "Ferroviária"
        },
        "teamAway": {
          "teamName": "Avaí/Kindermann"
        }
      }
    ];

    sinon.stub(db, 'findAll').resolves(matchesMock);

    const response = await chai.request(app).get('/matches?inProgress=false');

    chai.expect(response.status).to.be.eq(200);
    chai.expect(response.body).to.be.deep.equal(matchesMock);
    
    sinon.restore();

})
});
