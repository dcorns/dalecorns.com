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

  describe.skip('host.js', function(){
    beforeEach(function(done){
      delete require.cache[require.resolve('../../host')];
      host = require('../../host');
      done();
    });

    it('should call startDb if checkForRunningDB callback has error object', function(done){
      var dbStartSpy = sinon.spy(db, 'startDb');
      var dbStub = sinon.stub(db, 'checkForRunningDb').yields({}, null);
      host.startHost();
      expect(dbStub.called).equal(true);
      expect(dbStartSpy.calledWith('mongo')).ok;
      db.checkForRunningDb.restore();
      db.startDb.restore();
      done();
    });

    it('should not call startDb if checkForRunningDB callback does not have error object', sinon.test(function(done){
      var dbStartSpy = sinon.spy(db, 'startDb');
      var dbStub = sinon.stub(db, 'checkForRunningDb').yields(null);
      host.startHost();
      expect(dbStub.called).equal(true);
      expect(dbStartSpy.called).equal(false);
      db.checkForRunningDb.restore();
      db.startDb.restore();
      done();
    }));

    it('should call server.js in a child process', function(done){
      var procSpy = sinon.spy(proc, 'fork');
      host.startHost();
      expect(procSpy.called).equal(true);
      proc.fork.restore();
      done();
    });

  });
