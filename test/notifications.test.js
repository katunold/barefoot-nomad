import chai from 'chai';
import sinon from 'sinon';
import db from '../src/models';
import mockData from './helpers/mock-data';
import server from '../src';
import logInHelper from './helpers/login-helper';

const { expect } = chai;

const notificationsPreferenceModel = db.NotificationPreference;

describe('Notifications Route', () => {
  let sandbox;

  beforeEach((done) => {
    sandbox = sinon.createSandbox();
    done();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  const updateNotificationsHelper = async (updateData) => {
    const accessToken = await logInHelper(mockData.userDataResponseOnLogin);
    sandbox.stub(notificationsPreferenceModel, 'update').returns({});
    return chai
      .request(server)
      .put('/notifications')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send(updateData);
  };

  it('should successfully update notifications', async () => {
    const response = await updateNotificationsHelper({
      isInAppNotification: false,
    });
    expect(response).to.have.status(200);
  });

  it('should throw an error if wrong data is submitted', async () => {
    const response = await updateNotificationsHelper({
      isInAppNotification: 'fal',
    });
    expect(response).to.have.status(422);
  });

  it('should throw an error if invalid input fields are submitted', async () => {
    const response = await updateNotificationsHelper({
      isAppNotification: false,
    });
    expect(response).to.have.status(400);
  });

  it('should return all notifications', async () => {
    const accessToken = await logInHelper(mockData.userDataResponseOnLogin);
    sandbox.stub(db.NotificationPreference, 'findOne').returns({});

    const response = await chai
      .request(server)
      .get('/notifications')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(response).to.have.status(200);
  });
});
