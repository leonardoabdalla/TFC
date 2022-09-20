import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import db from '../database/models/matchModel';
import * as jwt from 'jsonwebtoken';
import dbTeams from '../database/models/teamsModel';


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

  });

  it('Testando o POST do matches', async () => {

    const userBody: any = {
      email: 'admin@admin.com',
      password: 'secret_admin'
  }


    const matchBody: any = {
      "homeTeam": 16, 
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2
    };

    const matchReturn: any = {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 8,
      "awayTeamGoals": 2,
      "inProgress": true,
    }

    const teams: any = [
      {
        id:1,
        team_name: 'Avaí/Kindermann',
      },
      {
        id:2,
        team_name: 'Bahia',
      }
    ];


    sinon.stub(jwt, 'verify').returns('validação do jwt' as any);


    sinon.stub(db, 'create').resolves(matchReturn);

    const retornoId = sinon.stub(dbTeams, 'findByPk');
        retornoId.onCall(0).resolves(teams[0]);
        retornoId.onCall(1).resolves(teams[1]);

    const response = await chai.request(app).post('/matches').send(matchBody).set({ Authorization: 'token'});

    chai.expect(response.status).to.be.eq(201);
    chai.expect(response.body).to.be.deep.equal(matchReturn);
    
    sinon.restore();

  });

  it('testando a rota /matches/id/finish', async () => {

    beforeEach(() => {
      sinon.stub(db, 'update').resolves();
    })
    afterEach(() => {
      sinon.restore();
    })

    it('deve retornar status 200', async () => {
      const chaiHttpResponse: Response = await chai.request(app).patch('/matches/1/finish');
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('deve retornar messagem de sucesso, Finished ', async () => {
      const chaiHttpResponse: Response = await chai.request(app).patch('/matches/1/finish');

      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Finished');

      sinon.restore();
    });
  });

  //  describe('testando a rota /matches/id', async () => {
     
  //    const partida: any = {
  //      "id": 41,
  //      "homeTeam": 16,
  //      "homeTeamGoals": 2,
  //      "awayTeam": 9,
  //      "awayTeamGoals": 0,
  //      "inProgress": true,
  //      "teamHome": {
  //        "teamName": "São Paulo"
  //       },
  //       "teamAway": {
  //         "teamName": "Internacional"
  //       }
  //     };
    
  //     sinon.stub(db, 'findByPk').resolves(partida);
  //     sinon.stub(db, 'update').resolves();
  
  //     it('deve retornar status 200', async () => {
  //       sinon.stub(db, 'findByPk').resolves(partida);
  //       sinon.stub(db, 'update').resolves();
  //       const chaiHttpResponse: Response = await chai.request(app).patch('/matches/45');
  //       expect(chaiHttpResponse.status).to.be.eql(200);
  //       sinon.restore();
  //     });
      
  //     it('deve retornar messagem de sucesso', async () => {
  //       const chaiHttpResponse: Response = await chai.request(app).patch('/matches/45');
        
  //       expect(chaiHttpResponse.body).to.have.property('message');
  //       expect(chaiHttpResponse.body.message).to.be.equal('alteração realizada');
        
  //       sinon.restore();
  //     });
  // });

});
