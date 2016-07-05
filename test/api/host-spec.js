/**
 * host-spec
 * Created by dcorns on 6/28/16
 * Copyright © 2016 Dale Corns
 */
'use strict';

var proc = require('child_process');
var expect = require('chai').expect;
var sinon = require('sinon');
var db = require('../../dbRunner');
var host, dbRunner;

  describe('host.js', function(){
    beforeEach(function(done){
      delete require.cache[require.resolve('../../host')];
      host = require('../../host');
      done();
    });

    it('should call startDb with mongo', function(done){
      var dbStartSpy = sinon.spy(db, 'startDb');
      host.startHost();
      expect(dbStartSpy.calledWith('mongo')).ok;
      db.startDb.restore();
      done();
    });

    it('should call server.js in a child process', function(done){
      var procSpy = sinon.spy(proc, 'fork');
      host.startHost();
      expect(procSpy.called).equal(true);
      proc.fork.restore();
      done();
    });

  });
