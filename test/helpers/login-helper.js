import chai from 'chai';
import mockData from './mock-data';
import sinon from 'sinon';
import server from '../../src';
import db from '../../src/models';

const userModel = db.User;
let sandbox;
sandbox = sinon.createSandbox();

const logInHelper = async (loginData) => {
  sandbox.stub(userModel, 'findOne').returns(loginData);
  const response = await chai
    .request(server)
    .post('/login')
    .send(mockData.loginData);
  const { access_token } = response.body;
  sandbox.restore();
  return access_token;
};

export default logInHelper;
