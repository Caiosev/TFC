import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';

import { app } from '../app';
import Match from '../database/models/Matches';

import { Response } from 'superagent';

chai.use(chaiHttp);


const Res = [
  new Match({ id: 1, homeTeamId: 1, awayTeamId: 2, homeTeamGoals: 1, awayTeamGoals: 0, inProgress: false }),
]

const { expect } = chai;

describe('Match', () => {
  beforeEach(sinon.restore);

  it('should GetAll return as expect', async () => {
    sinon.stub(Model, 'findAll').resolves(Res);

    const result = await chai.request(app).get('/matches');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal([{ id: 1, homeTeamId: 1, awayTeamId: 2, homeTeamGoals: 1, awayTeamGoals: 0, inProgress: false }]);

  });

  it('should Get return as expect', async () => {
    sinon.stub(Model, 'findByPk').resolves(Res[0]);

    const result = await chai.request(app).get('/matches/1');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal([{ id: 1, homeTeamId: 1, awayTeamId: 2, homeTeamGoals: 1, awayTeamGoals: 0, inProgress: false }]);
  });
  
});