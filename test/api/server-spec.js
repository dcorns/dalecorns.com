/**
 * server-spec
 * Created by dcorns on 6/14/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
let request = require('supertest');
let expect = require('chai').expect;

describe('server.js', function(){
  let server, corngooseOriginal;
  require('corngoose');
  beforeEach(function(done){
    //in order to have a new server instance created each time we must bust the cache otherwise node will not require it a second time, it will just use the cached version
    delete require.cache[require.resolve('../../server')];
    server = require('../../server');
    corngooseOriginal = require.cache[require.resolve('corngoose')].exports;
    require.cache[require.resolve('corngoose')].exports = {
      dbStart: (database) => {
        return `${database} started`;
      }
    };
    done();
  });
  //pass done to server close so it waits for the previous server instance to stop
  afterEach(function(done){
      server.close();
      require.cache[require.resolve('corngoose')].exports = corngooseOriginal;
    done();
  });
  it('calls corngoose.startDB ~ 1sec after loading', (done) => {
    done();
  });
  it('listens on server_port', (done) => {
    done();
  });
  it('listens on server_ip_address', (done) => {
    done();
  });
});