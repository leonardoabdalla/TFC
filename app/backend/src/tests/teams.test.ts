import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import db from '../database/models/teamsModel';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota getAll de teams', () => {
    it('getAll de teams realizado com sucesso', async () => {
        const teamsMock: any = [
            {
              team_name: 'Avaí/Kindermann',
            },
            {
              team_name: 'Bahia',
            },
            {
              team_name: 'Botafogo',
            },
            {
              team_name: 'Corinthians',
            },
            {
              team_name: 'Cruzeiro',
            },
          ];

        sinon.stub(db, 'findAll').resolves(teamsMock);

        const response = await chai.request(app).get('/teams');
        
        chai.expect(response.status).to.be.eq(200);
        chai.expect(response.body).to.be.deep.equal(teamsMock);

        sinon.restore();

    });

});
