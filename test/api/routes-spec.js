/**
 * routes-spec
 * Test server routes and endpoints in development
 * Make sure the server is running on localhost:3000 or tests will fail
 * Created by dcorns on 7/7/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
const request = require('supertest');
const express = require('express');
let routes, app = express();
describe('routes.ts - no error routing', () => {
  require('corngoose');
  let corngooseOriginal;
  describe('it responds to the following get requests with json data', () => {
    beforeEach((done) => {
      corngooseOriginal = require.cache[require.resolve('corngoose')].exports;
      require.cache[require.resolve('corngoose')].exports = {
          dbDocFind: (query, selection, cb) => {
            cb(null, {'activities': 'returned'});
          },
        getCollection: (collection, cb) => {
            cb(null, {'collection': 'returned'});
        }
        };
      delete require.cache[require.resolve('../../api/routes')];
      routes = require('../../api/routes')(app);
      done();
    });
    afterEach((done) => {
      require.cache[require.resolve('corngoose')].exports = corngooseOriginal;
      done();
    });
    it('/status returns ok', (done) => {
      request(app)
        .get('/status')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, {status: 'ok'},  done);
    });
    it('/ loads index.html', (done) => {
      request(app)
        .get('/')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect('Content-Security-Policy', "script-src 'self';style-src 'self'")
        .expect(200, done);
    });
    it('/current?typeIndex=0', (done) => {
      request(app)
        .get('/current?typeIndex=0')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, {'activities': 'returned'}, done);
    });
    it('sends default data when no typeIndex is provided', (done) => {
      request(app)
        .get('/current')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
    });
    it('/currentCategoryMenu', (done) => {
      request(app)
        .get('/currentCategoryMenu')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, {'collection': 'returned'}, done);
    });
  });
  describe('it accepts valid query strings', () => {
    describe('it accepts typeIndex=0-4', () => {
      it('typeIndex=0', (done) => {
        request(app)
          .get('/current?typeIndex=0')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, {'activities': 'returned'}, done);
      });
      it('typeIndex=1', (done) => {
        request(app)
          .get('/current?typeIndex=1')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, {'activities': 'returned'}, done);
      });
      it('typeIndex=2', (done) => {
        request(app)
          .get('/current?typeIndex=2')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, {'activities': 'returned'}, done);
      });
      it('typeIndex=3', (done) => {
        request(app)
          .get('/current?typeIndex=1')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, {'activities': 'returned'}, done);
      });
      it('typeIndex=4', (done) => {
        request(app)
          .get('/current?typeIndex=1')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, {'activities': 'returned'}, done);
      });
    });
    describe('it rejects invalid type indexes', () => {
      it('reject typeIndex > 4', (done) => {
        request(app)
          .get('/current?typeIndex=5')
          .expect(400, done);
      });
      it('reject typeIndex < 0', (done) => {
        request(app)
          .get('/current?typeIndex=-1')
          .expect(400, done);
      });
      it('reject typeIndex NaN', (done) => {
        request(app)
          .get('/current?typeIndex=A')
          .expect(400, done);
      });
    });
  });
  it('Returns 404 status invalid route requests', (done) => {
    request(app)
      .get('/notValid')
      .expect(404, done);
  });
});