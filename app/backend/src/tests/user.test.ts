import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore

import chaiHttp = require('chai-http');
import { Model } from 'sequelize';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('User', () => {
    beforeEach(sinon.restore);

    let chaiHttpRes: Response;
    it('should return Invalid email or password', async () => {
        sinon.stub(Model, 'findOne').resolves({token: 'token'} as any);
        chaiHttpRes = await chai.request(app).post('/login').send({email: 'admin@gmail.com', password: '123'});
        expect(chaiHttpRes.status).to.be.equal(401);
        expect(chaiHttpRes.body.message).to.be.equal('Invalid email or password');
    });
    it('should returnAll fields must be filled', async () => {
        sinon.stub(Model, 'findOne').resolves({token: 'token'} as any);
        chaiHttpRes = await chai.request(app).post('/login').send({ email: '', password: '123456787678765O'});
        expect(chaiHttpRes.body.message).to.be.equal('All fields must be filled');
    });
});