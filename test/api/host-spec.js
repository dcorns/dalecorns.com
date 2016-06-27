/**
 * host-spec
 * Created by dcorns on 6/23/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
var proc = require('child_process');
var expect = require('chai').expect;
var sinon = require('sinon');
var host;

console.dir(proc.exec);
describe('host.js', function(){
  beforeEach(function(done){
    //in order to have a new server instance created each time we must bust the cache otherwise node will not require it a second time, it will just use the cached version
    delete require.cache[require.resolve('../../host')];
    host = require('../../host');
    done();
  });
  describe('checkForRunningDb function used with mongo argument', function() {
    it('exists', function () {
      typeof expect(typeof host.checkForRunningDb).to.equal('function');
    });
    it('calls proc.exec with pgrep mongod argument', function(done){
      var procSpy = sinon.spy(proc, 'exec');
      host.checkForRunningDb('mongo');
      expect(procSpy.calledWith('pgrep mongod')).ok;
      expect(procSpy.args[0][0]).equal('pgrep mongod');
      console.dir(procSpy);
      proc.exec.restore();
      done();
    });
    it('returns process ID, and null in err if the database is running', function (done) {
      sinon.stub(proc, 'exec').yields(null, '354');
      host.checkForRunningDb('mongo', function (err, data) {
        expect(data > 0).to.equal(true);
        expect(err).equal(null);
        proc.exec.restore();
        done();
      });
    });

    it('returns an error object and null in data when a database in not running', function(done){
      sinon.stub(proc, 'exec').yields({}, null);
        host.checkForRunningDb('mongo', function(err, data){
          expect(data).equal(null);
          expect(err).ok;
          proc.exec.restore();
          done();
        });
    });
    
  });
  
  describe('startDB', function(){
    it('exists', function(){
      typeof expect(typeof host.startDb).to.equal('function');
    });
    it('starts a mongo DB server the database server', function(done){
      var startSpy = sinon.spy(proc, 'exec');
      host.startDb('mongo');
      expect(startSpy.calledWith('mongod')).ok;
      expect(startSpy.args[0][0]).equal('mongod');
      proc.exec.restore();
      done();
    });
  });

  describe('startHost', function(){
    it('exists', function(){
      typeof expect(typeof host.startHost).to.equal('function');
    });
    it('starts the mongo database if it is not running', function(done){
      var startStub = sinon.stub(host, 'checkForRunningDb').yields({}, null);
      var startDbSpy = sinon.spy(host, 'startDb');
      host.startHost();
      expect(startStub.calledWith('mongo')).ok;
     // expect(startDbSpy.calledWith('mongo')).ok;
      host.checkForRunningDb.restore();
      host.startDb.restore();
      done();
    })

  });
  
});