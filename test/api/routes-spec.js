/**
 * routes-spec
 * Created by dcorns on 7/7/16
 * Copyright © 2016 Dale Corns
 */
'use strict';

var request = require('supertest');
var expect = require('chai').expect;
let express = require('express');
let corngoose = require('corngoose');
let app = express();
var rts, server;
describe('server routing', function(){
  before(function(done){
    server = app.listen(8090, 'localhost', function(){
      console.log('Server listening on localhost, port: 8090');
      done();
    });
  });
  after(function(done){
    server.close();
    done();
  });
  beforeEach(function(done){
    delete require.cache[require.resolve('../../api/routes')];
    rts = require('../../api/routes')(app);
    done();
  });
  describe('it responds to the following get requests', function(){
    it('/status returns ok', function(done){
      request(server)
        .get('/status')
        .expect(200, {status: 'ok'}, done);
    });
  });


});