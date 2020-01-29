import chai from 'chai';
import sinon from 'sinon';
import db from '../src/models';
import mockData from './helpers/mock-data';
import server from '../src';
import logInHelper from './helpers/login-helper';

const { expect } = chai;

const userModel = db.User;

describe('Users route', () => {
  let sandbox;

  beforeEach((done) => {
    sandbox = sinon.createSandbox();
    done();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  const getAllUsersHelper = async (loginData, usersData) => {
    const accessToken = await logInHelper(loginData);
    sandbox.stub(userModel, 'findAndCountAll').returns(usersData);
    return chai
      .request(server)
      .get('/users')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
  };

  const updateUserRoleHelper = async (
    loginData,
    roleUpdate,
    userData,
    updatedData,
  ) => {
    const accessToken = await logInHelper(loginData);
    sandbox.stub(userModel, 'findOne').returns(userData);
    sandbox.stub(userModel, 'update').returns(updatedData);
    return chai
      .request(server)
      .put('/users/tywrueqytutiweqr')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send(roleUpdate);
  };

  it('should fetch all users by only authorised users', async () => {
    const response = await getAllUsersHelper(
      mockData.superAdminDataResponseLogin,
      mockData.allUsers,
    );

    expect(response).to.have.status(200);
  });

  it('should throw unauthorized for all unauthorised users', async () => {
    const response = await getAllUsersHelper(
      mockData.userDataResponseOnLogin,
      mockData.allUsers,
    );
    expect(response).to.have.status(401);
  });

  it('should update the role of a user', async () => {
    const response = await updateUserRoleHelper(
      mockData.superAdminDataResponseLogin,
      mockData.roleUpdate,
      true,
      mockData.updatedData,
    );

    expect(response).to.have.status(200);
  });

  it('should throw an error for any unauthorised user', async () => {
    const response = await updateUserRoleHelper(
      mockData.userDataResponseOnLogin,
      mockData.roleUpdate,
      true,
      mockData.updatedData,
    );

    expect(response).to.have.status(401);
  });

  it('should throw a 404 if the user is not found', async () => {
    const response = await updateUserRoleHelper(
      mockData.superAdminDataResponseLogin,
      mockData.roleUpdate,
      false,
      mockData.updatedData,
    );

    expect(response).to.have.status(404);
  });
});
