import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';

chai.use(chaiHttp);

const { expect } = chai;

describe('Home route', () => {
  it('should access the home route', async () => {
    const response = await chai.request(app).get('/');

    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property('message')
      .to.contain("Welcome to barefoot nomads, It's time to travel 😇");
  });
});
