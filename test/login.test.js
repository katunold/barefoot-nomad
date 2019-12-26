import chai from 'chai';
import sinon from 'sinon';
import db from '../src/models';
import mockData from './helpers/mock-data';
import server from '../src';

const { expect } = chai;

const userModel = db.User;

describe('Login', () => {
  let sandbox;

  beforeEach((done) => {
    sandbox = sinon.createSandbox();
    done();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  const loginTestHelper = (responseData, loginData) => {
    sandbox.stub(userModel, 'findOne').returns(responseData);
    return chai
      .request(server)
      .post('/login')
      .send(loginData);
  };

  it('should login user successfully', async () => {
    const response = await loginTestHelper(
      mockData.userDataResponseOnLogin,
      mockData.loginData,
    );
    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property('success')
      .to.contain('Successfully logged in');
  });

  it('should throw error if user is not found', async () => {
    const response = await loginTestHelper(null, mockData.loginData);
    expect(response).to.have.status(404);
  });

  it('should throw error in-case of invalid user input', async () => {
    const response = await chai
      .request(server)
      .post('/login')
      .send(mockData.faultyLoginData);
    expect(response).to.have.status(422);
  });

  it('should throw error in-case account is not yet verified', async () => {
    const response = await loginTestHelper(
      mockData.userDataResponseOnLoginNotVerified,
      mockData.loginData,
    );
    expect(response).to.have.status(403);
    expect(response.body).to.have.property('errors');
  });

  it('should not login user with a wrong password', async () => {
    const response = await loginTestHelper(
      mockData.validatePasswordFalse,
      mockData.loginData,
    );
    expect(response).to.have.status(400);
    expect(response.body).to.have.property('errors');
  });
});
