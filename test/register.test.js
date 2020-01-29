import chai from 'chai';
import sinon from 'sinon';
import sendGrid from '@sendgrid/mail';
import db from '../src/models';
import mockData from './helpers/mock-data';
import server from '../src';
import Verification from '../src/helpers';

const { expect } = chai;

const userModel = db.User;
const notificationPreferencesModel = db.NotificationPreference;

describe('Register', () => {
  let sandbox;

  beforeEach((done) => {
    sandbox = sinon.createSandbox();
    done();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  const accountVerificationHelper = (
    updateResponse,
    valid = [true],
    error = false,
  ) => {
    error
      ? sandbox.stub(userModel, 'update').throws(['Something went wrong'])
      : sandbox.stub(userModel, 'update').returns(updateResponse);

    sandbox.stub(Verification, 'validateCode').returns(valid);
    return chai
      .request(server)
      .get('/verify-email/?code=MjAxOS0xMi0yNlQyMT')
      .send();
  };

  const registerUserTestHelper = (
    registerData,
    responseData = null,
    userExists = null,
  ) => {
    sandbox.stub(userModel, 'findOne').returns(userExists);
    sandbox.stub(userModel, 'create').returns(responseData);
    sandbox.stub(notificationPreferencesModel, 'create').returns({});
    return chai
      .request(server)
      .post('/register')
      .send(registerData);
  };

  // tests to cover user signup

  it('should create a new user account', async () => {
    sandbox.stub(sendGrid, 'send').resolves({});
    const response = await registerUserTestHelper(
      mockData.registerData,
      mockData.registerUserDbResponse,
    );
    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property('message')
      .to.contain(
        'Verification link sent successfully 🤗, kindly check your email',
      );
  });

  it('should throw an error if the user email already exists', async () => {
    const response = await registerUserTestHelper(
      mockData.registerData,
      mockData.registerUserDbResponse,
      true,
    );
    expect(response).to.have.status(400);
    expect(response.body)
      .to.have.property('message')
      .to.contain(
        'User with that email exists, sign up with a different email',
      );
  });

  it('should return error if the user info is invalid', async () => {
    const response = await registerUserTestHelper(
      mockData.registerWithMissingFields,
    );
    expect(response).to.have.status(422);
    expect(response.body).to.contain([]);
  });

  it('should verify user account', async () => {
    sandbox.stub(userModel, 'update').returns(mockData.verifyAccountResponse);
    const token = Verification.generateVerificationCode(mockData.userData);
    const response = await chai
      .request(server)
      .get(`/verify-email/?code=${token}`);
    expect(response).to.have.status(200);
  });

  it('should resend verification email', async () => {
    sandbox.stub(userModel, 'findOne').returns(mockData.userData);
    sandbox.stub(sendGrid, 'send').resolves({});
    const response = await chai
      .request(server)
      .post('/resend')
      .send({ email: 'katunold94@gmail.com' });
    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property('message')
      .to.contain(
        'Verification link sent successfully 🤗, kindly check your email',
      );
  });

  it('should throw an error if invalid data is submitted to resend', async () => {
    const response = await chai
      .request(server)
      .post('/resend')
      .send({ email: 'katunold94' });
    expect(response).to.have.status(422);
    expect(response.body).to.contain([]);
  });

  it('should throw an error if email is not found', async () => {
    sandbox.stub(userModel, 'findOne').returns(null);
    const response = await chai
      .request(server)
      .post('/resend')
      .send({ email: 'katunold94@gmail.com' });
    expect(response).to.have.status(400);
    expect(response.body)
      .to.have.property('message')
      .to.contain(
        'email katunold94@gmail.com not found, kindly sign-up to get started',
      );
  });

  it('should verify account', async () => {
    const response = await accountVerificationHelper(
      mockData.verifyAccountResponse,
    );
    expect(response).to.have.status(200);
  });

  it('should throw an error if user is not found', async () => {
    const response = await accountVerificationHelper(null);
    expect(response).to.have.status(404);
    expect(response.body)
      .to.have.property('message')
      .to.contain(
        'Sorry, user not found. Kindly register to have a new account 🥺',
      );
  });

  it('should throw an error in case of a server error', async () => {
    const response = await accountVerificationHelper(
      mockData.verifyAccountResponse,
      [true],
      true,
    );
    expect(response).to.have.status(500);
  });

  it('should throw an error in case the token expired', async () => {
    const response = await accountVerificationHelper(
      mockData.verifyAccountResponse,
      [false],
    );
    expect(response).to.have.status(400);
  });
});
