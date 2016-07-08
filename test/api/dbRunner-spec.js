/**
 * host-spec
 * Created by dcorns on 6/23/16
 * Copyright © 2016 Dale Corns
 * 
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
  it('returns the process id if mongo is already running', function(done){
    var procStub = sino.stub(proc, 'exec').withArgs('pgrep mongod').yields(null, 456);
    dbRunner('mongo', function(err, data){
      expect(data).equal(456);
      done();
    });
    proc.exec.restore();
  });

  it('starts the mongo database and returns process id and message if database is not already running', function(done){
    var procStub = sino.stub(proc, 'exec');
    var mongoCheck = procStub.withArgs('pgrep mongod').yields({}, null);
    var mongoStart = procStub.withArgs('mongod').returns({pid: 4539});
    
    dbRunner('mongo', function(err, data){
      expect(err).equal(null);
      expect(procStub.calledWith('mongod'));
      expect(data).equal(4539 + ' (started by host)');
      done();
    });
  });
  
});