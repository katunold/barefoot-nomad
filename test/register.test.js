import chai from 'chai';
import sinon from 'sinon';
import sendGrid from '@sendgrid/mail';
import db from '../src/models';
import mockData from './helpers/mock-data';
import server from '../src';
import Verification from '../src/helpers';

const { expect } = chai;

const userModel = db.User;

describe('User', () => {
  let sandbox;

  beforeEach((done) => {
    sandbox = sinon.createSandbox();
    done();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  // tests to cover user signup

  it('should create a new user account', async () => {
    sandbox.stub(userModel, 'findOne').returns(null);
    sandbox.stub(userModel, 'create').returns(mockData.registerData);
    sandbox.stub(sendGrid, 'send').resolves({});
    const response = await chai
      .request(server)
      .post('/register')
      .send(mockData.registerData);
    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property('message')
      .to.contain(
        'Verification link sent successfully 🤗, kindly check your email',
      );
  });

  it('should throw an error if the user email already exists', async () => {
    sandbox.stub(userModel, 'findOne').returns(true);
    const response = await chai
      .request(server)
      .post('/register')
      .send(mockData.registerData);
    expect(response).to.have.status(400);
    expect(response.body)
      .to.have.property('message')
      .to.contain(
        'User with that email exists, sign up with a different email',
      );
  });

  it('should return error if the user info is invalid', async () => {
    const response = await chai
      .request(server)
      .post('/register')
      .send(mockData.registerWithMissingFields);
    expect(response).to.have.status(422);
    expect(response.body).to.contain([]);
  });

  it('should verify user account', async () => {
    sandbox.stub(userModel, 'update').returns(mockData.verifyAccountResponse);
    const token = Verification.generateVerificationCode(mockData.userData);
    const response = await chai.request(server).get(`/verify-email/?code=${token}`);
    expect(response).to.have.status(200);
  });
});
