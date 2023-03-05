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
    it('should return missing credentials when req is missing credentials', async () => {
        sinon.stub(Model, 'findOne').resolves({token: 'token'} as any);
        chaiHttpRes = await chai.request(app).post('/login').send({username: 'admin', password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'});
        expect(chaiHttpRes.status).to.be.equal(400);
        expect(chaiHttpRes.body.message).to.be.equal('All fields must be filled');
    });
    it('should return invalid credentials if user not registrated', async () => {
        sinon.stub(Model, 'findOne').resolves({token: 'token'} as any);
        chaiHttpRes = await chai.request(app).post('/login').send({ email: 'admin@gmail.com', password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'});
        expect(chaiHttpRes.body.message).to.be.equal('Invalid email or password');
    });
});