import chai from 'chai';
import sinon from 'sinon';
import db from '../src/models';
import mockData from './helpers/mock-data';
import server from '../src';
import logInHelper from './helpers/login-helper';
import cloudImages from '../src/config/cloudinary-config';
import ImageUpload from '../src/helpers/image-upload';

const { expect } = chai;

const userModel = db.User;

describe('User Profile', () => {
  let sandbox;

  beforeEach((done) => {
    sandbox = sinon.createSandbox();
    done();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  const getUserProfileHelper = async (responseData, error = false) => {
    const accessToken = await logInHelper(mockData.userDataResponseOnLogin);
    error
      ? sandbox.stub(userModel, 'findOne').throws(['Something went wrong'])
      : sandbox.stub(userModel, 'findOne').returns(responseData);
    return chai
      .request(server)
      .get('/profile')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
  };

  const updateUserProfileHelper = async (
    profileUpdates,
    responseData,
    error = false,
  ) => {
    const accessToken = await logInHelper(mockData.userDataResponseOnLogin);
    error
      ? sandbox.stub(userModel, 'update').throws(['Something went wrong'])
      : sandbox.stub(userModel, 'update').returns(responseData);
    return chai
      .request(server)
      .put('/profile')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send(profileUpdates);
  };

  it('should return the user profile ', async () => {
    const response = await getUserProfileHelper(mockData.userProfile);
    expect(response).to.have.status(200);
  });

  it('should throw an error in-case the unexpected happens', async () => {
    const response = await getUserProfileHelper(mockData.userProfile, true);
    expect(response).to.have.status(500);
  });

  it('should update user profile', async () => {
    const response = await updateUserProfileHelper(
      mockData.profileUpdateData,
      mockData.updateProfileResponse,
    );
    expect(response).to.have.status(200);
  });

  it('should throw an error in case something goes wrong', async () => {
    const response = await updateUserProfileHelper(
      mockData.profileUpdateData,
      mockData.updateProfileResponse,
      true,
    );
    console.log(response.body);
    expect(response).to.have.status(500);
  });

  it('should throw an error in case invalid data is submitted', async () => {
    const response = await updateUserProfileHelper(
      mockData.faultyProfileUpdateData,
      mockData.updateProfileResponse,
    );
    expect(response).to.have.status(422);
  });

  it('should update user data with a profile image', async () => {
    sandbox
      .stub(ImageUpload, 'uploadImages')
      .returns(mockData.cloudinaryProfilePicResponse);
    const response = await updateUserProfileHelper(
      {
        profilePic: '/Users/arnold/Downloads/IMG_20191120_090824.jpg',
      },
      mockData.updateProfileResponse,
    );
    expect(response).to.have.status(200);
  });
});
