/**
 * route-err-spec
 * Created by dcorns on 2/17/17
 * Copyright © 2017 Dale Corns
 */
'use strict';
const request = require('supertest');
const express = require('express');
let routes, app = express();
describe('routes.ts - error routing', () => {
  require('corngoose');
  let corngooseOriginal;
  describe('it provides an error object if the route is valid but error occurs', () => {
    beforeEach((done) => {
      //Mock corngoose module
      corngooseOriginal = require.cache[require.resolve('corngoose')].exports;
      require.cache[require.resolve('corngoose')].exports = {
        dbDocFind: (query, selection, cb) => {
          cb(new Error('Error getting document'), null);
        },
        getCollection: (collection, cb) => {
          cb(new Error('Error getting collection'), null);
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
    it('/current', (done) => {
      request(app)
        .get('/current')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(500, done);
    });
    it('/current?typeIndex=0', (done) => {
      request(app)
        .get('/current?typeIndex=0')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(500, done);
    });
    it('/currentCategoryMenu', (done) => {
      request(app)
        .get('/currentCategoryMenu')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(500, done);
    })
  });
});
