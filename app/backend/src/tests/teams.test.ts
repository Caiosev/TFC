import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';

import { app } from '../app';
import Team from '../database/models/Team';

import { Response } from 'superagent';
import { getAllTeamsMock } from './Mocks/Teams';

chai.use(chaiHttp);


const Res = [
  new Team({ id: 1, teamName: 'Team 1'  }),
  new Team({ id: 2, teamName: 'Team 2' })
]

const { expect } = chai;

describe('Team', () => {
  beforeEach(sinon.restore);

  it('should GetAll return as expect', async () => {
    sinon.stub(Model, 'findAll').resolves(Res);

    const result = await chai.request(app).get('/teams');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal(getAllTeamsMock);

  });

  it('should Get return as expect', async () => {
    sinon.stub(Model, 'findByPk').resolves(Res[0]);

    const result = await chai.request(app).get('/teams/1');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal(getAllTeamsMock[0]);
  });
  
});