import chai from 'chai';
import sinon from 'sinon';
import db from '../src/models';
import mockData from './helpers/mock-data';
import server from '../src';
import logInHelper from './helpers/login-helper';

const { expect } = chai;

const tripModel = db.Trip;

describe('Trip route', () => {
  let sandbox;

  beforeEach((done) => {
    sandbox = sinon.createSandbox();
    done();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  const postOneWayTripHelper = async (tripData, responseData) => {
    sandbox.stub(tripModel, 'create').returns(responseData);
    const accessToken = await logInHelper();
    return chai
      .request(server)
      .post('/trip/one-way')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send(tripData);
  };

  it('should accept request of a one way trip for a logged in user', async () => {
    const response = await postOneWayTripHelper(
      mockData.oneWayTripRequestData,
      mockData.oneWayTripResponse,
    );
    expect(response).to.have.status(201);
  });

  it('should throw an error when invalid data is submitted', async () => {
    const response = await postOneWayTripHelper(
      mockData.oneWayFaultyTripRequestData,
      mockData.oneWayTripResponse,
    );
    expect(response).to.have.status(422);
  });

  it('should throw an error when the date submitted is already past', async () => {
    const response = await postOneWayTripHelper(
      mockData.oneWayTripRequestDataWithPastDate,
      mockData.oneWayTripResponse,
    );
    expect(response).to.have.status(422);
    expect(response.body)
      .to.have.property('message')
      .to.contain('Departure date can only be in the future not the past');
  });
});
