/**
 * host-spec
 * Created by dcorns on 6/23/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
var proc = require('child_process');
var expect = require('chai').expect;
var sino = require('sinon');
var dbRunner;

describe('dbRunner.js', function(){
  beforeEach(function(done){
    //in order to have a new server instance created each time we must bust the cache otherwise node will not require it a second time, it will just use the cached version
    delete require.cache[require.resolve('../../dbRunner')];
    dbRunner = require('../../dbRunner');
    done();
  });
  describe('checkForRunningDb function used with mongo argument', function() {
    it('exists', function () {
      typeof expect(typeof dbRunner.checkForRunningDb).to.equal('function');
    });
    it('calls proc.exec with pgrep mongod argument', function(done){
      var procSpy = sino.spy(proc, 'exec');
      dbRunner.checkForRunningDb('mongo');
      expect(procSpy.calledWith('pgrep mongod')).ok;
      expect(procSpy.args[0][0]).equal('pgrep mongod');
      proc.exec.restore();
      done();
    });
    it('returns process ID, and null in err if the database is running', function (done) {
      sino.stub(proc, 'exec').yields(null, '354');
      dbRunner.checkForRunningDb('mongo', function (err, data) {
        expect(data > 0).to.equal(true);
        expect(err).equal(null);
        proc.exec.restore();
        done();
      });
    });

    it('returns an error object and null in data when a database in not running', function(done){
      sino.stub(proc, 'exec').yields({}, null);
        dbRunner.checkForRunningDb('mongo', function(err, data){
          expect(data).equal(null);
          expect(err).ok;
          proc.exec.restore();
          done();
        });
    });
    
  });
  
  describe('startDB', function(){
    it('exists', function(){
      typeof expect(typeof dbRunner.startDb).to.equal('function');
    });
    it('it does nothing if checkForRunningDb calls back with null as the first argument', function(done){
      var startSpy = sino.spy(proc, 'exec');
      //var dbRSpy = sino.spy(dbRunner, 'checkForRunningDb');
      var dbStub = sino.stub(dbRunner, 'checkForRunningDb').yields(null);
      dbRunner.startDb('mongo');
      expect(dbStub.calledWith('mongo')).ok;
      expect(startSpy.called).not.ok;
     // expect(startSpy.calledWith('mongod')).ok;
     // expect(startSpy.args[0][0]).equal('mongod');
      proc.exec.restore();
      dbRunner.checkForRunningDb.restore();
      done();
    });
    it('it starts the database if checkForRunningDb calls back with an object as the first argument', function(done){
      var startSpy = sino.spy(proc, 'exec');
      var dbStub = sino.stub(dbRunner, 'checkForRunningDb').yields({});
      dbRunner.startDb('mongo');
      expect(dbStub.calledWith('mongo')).ok;
      expect(startSpy.calledWith('mongod')).ok;
      expect(startSpy.args[0][0]).equal('mongod');
      proc.exec.restore();
      dbRunner.checkForRunningDb.restore();
      done();
    });


  });
  
});