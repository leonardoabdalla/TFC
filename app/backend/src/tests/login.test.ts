import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import db from '../database/models/usersModel';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota Login', () => {
    it('Login realizado com sucesso', async () => {
        
        const userBody: Object = {
            email: 'admin@admin.com',
            password: 'secret_admin',
        }
        
        const tokenUser: Object = {
            hash: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
        }

        const userMock: any = {
            username: 'Admin',
            role: 'admin',
            email: 'admin@admin.com',
            password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
            // senha: secret_admin,
        }

        sinon.stub(db, 'findOne').resolves(userMock)

        const response = await chai.request(app).post('/login').send(userBody)

        chai.expect(response.status).to.be.eq(200);
        chai.expect(Object.keys(response.body)[0]).to.be.eq('token');

        sinon.restore();
    });

    it('Ao realizar rota login sem o email irá retornar stautus 400 e mensagem: "All fields must be filled"', async () => {
        
        const userMock: any = {
            username: 'Admin',
            role: 'admin',
            password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
            // senha: secret_admin,
        }

        const response = await chai.request(app).post('/login').send(userMock)

        chai.expect(response.status).to.be.eq(400); // não sendo array e objetos utilizar eq
        chai.expect(response.body).to.be.deep.equal({ message: 'All fields must be filled'}); // deep para objetos/ arrays
    });

    it('Ao realizar rota login sem a senha irá retornar stautus 400 e mensagem: "All fields must be filled"', async () => {
        
        const userMock: any = {
            username: 'Admin',
            role: 'admin',
            email: 'admin@admin.com',
        }

        const response = await chai.request(app).post('/login').send(userMock)

        chai.expect(response.status).to.be.eq(400); // não sendo array e objetos utilizar eq
        chai.expect(response.body).to.be.deep.equal({ message: 'All fields must be filled'}); // deep para objetos/ arrays
    });

    it('Ao realizar rota login com o email incorreto irá retornar stautus 401 e mensagem: "Incorrect email or password"', async () => {
        
        const userBody: any = {
            email: 'admin234@admin.com',
            password: 'secret_admin'
        }


        sinon.stub(db, 'findOne').resolves(undefined)

        const response = await chai.request(app).post('/login').send(userBody)

        chai.expect(response.status).to.be.eq(401); // não sendo array e objetos utilizar eq
        chai.expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password'}); // deep para objetos/ arrays
        
        sinon.restore();
    });

    it('Ao realizar rota login com a senha incorreta irá retornar stautus 401 e mensagem: "Incorrect email or password"', async () => {
        
        const userBody: any = {
            email: 'admin@admin.com',
            password: 'secret_admin*#'
        }


        sinon.stub(db, 'findOne').resolves(undefined)

        const response = await chai.request(app).post('/login').send(userBody)

        chai.expect(response.status).to.be.eq(401); // não sendo array e objetos utilizar eq
        chai.expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password'}); // deep para objetos/ arrays
        
        sinon.restore();
    })

});
