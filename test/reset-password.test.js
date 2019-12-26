import chai from 'chai';
import sinon from 'sinon';
import sendGrid from '@sendgrid/mail';
import db from '../src/models';
import mockData from './helpers/mock-data';
import server from '../src';
import Verification from '../src/helpers';

const { expect } = chai;

const userModel = db.User;

describe('Password Reset', () => {
  let sandbox;

  beforeEach((done) => {
    sandbox = sinon.createSandbox();
    done();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  const passwordResetHelper = (findOneResponse, dataEntry) => {
    sandbox.stub(userModel, 'findOne').returns(findOneResponse);
    sandbox.stub(sendGrid, 'send').resolves({});
    return chai
      .request(server)
      .post('/reset-password')
      .send(dataEntry);
  };

  const newPasswordHelper = (
    dataEntry,
    updateResponse = true,
    valid = [true],
  ) => {
    sandbox.stub(userModel, 'update').returns(updateResponse);
    sandbox.stub(Verification, 'validateCode').returns(valid);
    return chai
      .request(server)
      .put('/new-password/?code=MjAxOS0xMi0yNlQyMT')
      .send(dataEntry);
  };

  // Password reset route
  it('should send email containing password reset link', async () => {
    const response = await passwordResetHelper(
      mockData.userDataResponseOnLogin,
      mockData.resetPasswordData,
    );
    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property('message')
      .to.contain('link sent successfully 🤗, kindly check your email');
  });

  it('should throw an error if account is not verified', async () => {
    const response = await passwordResetHelper(
      mockData.userData,
      mockData.resetPasswordData,
    );
    expect(response).to.have.status(403);
    expect(response.body).to.have.property('errors');
  });

  it('should throw an error if user does not exist', async () => {
    const response = await passwordResetHelper(
      null,
      mockData.resetPasswordData,
    );
    expect(response).to.have.status(404);
    expect(response.body).to.have.property('errors');
  });

  it('should throw data if invalid email is submitted', async () => {
    const response = await passwordResetHelper(null, mockData.faultyLoginData);
    expect(response).to.have.status(422);
    expect(response.body).to.have.property('error');
  });

  //  new password route
  it('should update the current password', async () => {
    const response = await newPasswordHelper({ password: '1qaz2wsx' });
    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property('message')
      .to.contain(
        'Password Successfully updated 🎊, You can login with you new password',
      );
  });

  it('should throw an error if token is expired', async () => {
    const response = await newPasswordHelper(
      { password: '1qaz2wsx' },
      true,
      false,
    );
    expect(response).to.have.status(400);
    expect(response.body)
      .to.have.property('message')
      .to.contain('Token expired 😕');
  });

  it('should throw an error if user is not found', async () => {
    const response = await newPasswordHelper({ password: '1qaz2wsx' }, false);
    expect(response).to.have.status(404);
    expect(response.body)
      .to.have.property('message')
      .to.contain('User not found 🥺, Kindly sign-up and login');
  });

  it('should throw an error if invalid data is submitted', async () => {
    const response = await newPasswordHelper({ password: '' });
    expect(response).to.have.status(422);
    expect(response.body).to.have.property('error');
  });
});
