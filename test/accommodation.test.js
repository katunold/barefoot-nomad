import chai from 'chai';
import sinon from 'sinon';
import db from '../src/models';
import mockData from './helpers/mock-data';
import server from '../src';
import logInHelper from './helpers/login-helper';

const { expect } = chai;

const accommodationModel = db.AccommodationFacility;

describe('Accommodation Route', () => {
  let sandbox;

  beforeEach((done) => {
    sandbox = sinon.createSandbox();
    done();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  const postAccommodationHelper = async (
    accommodationData,
    responseData,
    userLogin,
  ) => {
    sandbox.stub(accommodationModel, 'create').returns(responseData);
    const accessToken = await logInHelper(userLogin);
    return chai
      .request(server)
      .post('/accommodation/create')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send(accommodationData);
  };

  it('should add new accommodation facility', async () => {
    const response = await postAccommodationHelper(
      mockData.createAccommodationFacility,
      mockData.createAccommodationFacilityResponse,
      mockData.supplierDataResponseOnLogin,
    );
    expect(response).to.have.status(201);
  });

  it("should return unauthorised if user's role is not supplier", async () => {
    const response = await postAccommodationHelper(
      mockData.createAccommodationFacility,
      mockData.createAccommodationFacilityResponse,
      mockData.userDataResponseOnLogin,
    );
    expect(response).to.have.status(401);
  });

  it('should throw an error if invalid data is submitted', async () => {
    const response = await postAccommodationHelper(
      mockData.createAccommodationFacilityFaulty,
      mockData.createAccommodationFacilityResponse,
      mockData.userDataResponseOnLogin,
    );
    expect(response).to.have.status(422);
  });
});
