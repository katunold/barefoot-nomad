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

  const postTripHelper = async (
    tripData,
    responseData,
    tripType = 'one-way',
  ) => {
    sandbox.stub(tripModel, 'create').returns(responseData);
    const accessToken = await logInHelper(mockData.userDataResponseOnLogin);
    return chai
      .request(server)
      .post(`/trip/${tripType}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send(tripData);
  };

  it('should accept request of a one way trip for a logged in user', async () => {
    const response = await postTripHelper(
      mockData.oneWayTripRequestData,
      mockData.oneWayTripResponse,
    );
    expect(response).to.have.status(201);
  });

  it('should accept request for a return-trip for a logged in user', async () => {
    const response = await postTripHelper(
      mockData.returnTripRequestData,
      mockData.returnTripResponse,
      'return-trip',
    );
    expect(response).to.have.status(201);
  });

  it('should throw error if return date is before departure date', async () => {
    const response = await postTripHelper(
      mockData.returnTripWrongReturnDate,
      mockData.returnTripResponse,
      'return-trip',
    );
    expect(response).to.have.status(422);
  });

  it('should return a 404 if route is not found', async () => {
    const response = await postTripHelper(
      mockData.returnTripWrongReturnDate,
      mockData.returnTripResponse,
      'return',
    );
    expect(response).to.have.status(404);
  });

  it('should throw an error when invalid data is submitted', async () => {
    const response = await postTripHelper(
      mockData.oneWayFaultyTripRequestData,
      mockData.oneWayTripResponse,
    );
    expect(response).to.have.status(422);
  });

  it('should throw an error when the date submitted is already past', async () => {
    const response = await postTripHelper(
      mockData.oneWayTripRequestDataWithPastDate,
      mockData.oneWayTripResponse,
    );
    expect(response).to.have.status(422);
    expect(response.body)
      .to.have.property('message')
      .to.contain('Departure date can only be in the future not the past');
  });
});
