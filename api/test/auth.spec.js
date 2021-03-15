const request = require('supertest')
const app = require('../app')
const expect = require('chai').expect
const faker = require('faker');

const email = faker.internet.email();
let token = '';

describe('POST /signup endpoint', () => {

  it('successfully signs up a new user', done => {
    request(app)
      .post('/api/auth/signup')
      .send({email: email, password: '12345678'})
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it(`won't allow duplicate emails`, done => {
    request(app)
      .post('/api/auth/signup')
      .send({email: email, password: '12345678'})
      .set('Content-Type', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        return done();
      });
  });
});

describe('POST /signin endpoint', () => {
  it ('signs in an existing user and returns a token', done => {
    request(app)
      .post('/api/auth/signin')
      .send({email: email, password: '12345678'})
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.property('accessToken');
        token = res.body.accessToken;
        if (err) return done(err);
        return done();
      });
  });
});

describe('GET /getuser endpoint', () => {
  it ('returns user id and email for a given token', done => {
    request(app)
      .get('/api/auth/getuser')
      .set('x-access-token', token)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('email');
        if (err) return done(err);
        done();
      })
  })
})