const pool = require('../lib/utils/pool');
const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const orders = require('../lib/controllers/orders');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then(res => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10
        });
      });
  });

  // it('gets all of the orders', () => {
  //   return request(app)
  //     .get('/api/vi/orders/')
  //     .then(res => {
  //       expect(res.body).toEqual(expect.any(String));
  //     });
  // });

  it('gets the id of a specific message', () => {
    return request(app)
      .get('/api/vi/orders/:id')
      .then(res => {
        expect(res.body).toEqual(expect.any(String));
      });
  });
});
