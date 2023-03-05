import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import TeamsModel from '../database/models/Team';

import { Response } from 'superagent';
import { after, before } from 'node:test';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team Model', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(TeamsModel, "findAll")
      .resolves(getAllTeamsMock as TeamsModel[]);
  });

  after(()=>{
    (TeamsModel.findAll as sinon.SinonStub).restore();
  })

  it('should GetAll return as expect', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams');
    expect(chaiHttpResponse.body).to.be.eq(getAllTeamsMock);
    expect(chaiHttpResponse.status).to.be.eq(200);
  });
});
