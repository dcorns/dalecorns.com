/**
 * host-spec
 * Created by dcorns on 6/23/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
var proc = require('child_process');
var expect = require('chai').expect;
var host;

describe('host.js', function(){

  beforeEach(function(){
    //in order to have a new server instance created each time we must bust the cache otherwise node will not require it a second time, it will just use the cached version
    delete require.cache[require.resolve('../../server')];
    host = require('../../host');
  });
  describe('checkForRunningDb function', function(){
    it('exists', function(){
      typeof expect(typeof host.checkForRunningDb).to.equal('function');
    });
    it('returns process ID if the database is running', function(done){
      this.timeout(5000); //extend the done timeout from 2000 to 1000
      proc.exec('mongod');
      //note the proc.exec callback does us no good because it does not run until after the process terminates. So we need to use a timeout in order to wait for the database to load
      setTimeout(function(){
        host.checkForRunningDb('mongo', function(err, data){
          expect(data > 0).to.equal(true);
          proc.exec('mongod --shutdown', function(){
            done();
          });
        });
      }, 2000);

    });

    it('returns an error object if the database is not running', function(done) {
      this.timeout(5000); //extend the done timeout from 2000 to 1000
      proc.exec('mongod --shutdown', function () {
        host.checkForRunningDb('mongo', function (err, data) {
          expect(err).not.equal(null);
          done();
        });
      });
    });

  });

  describe('startDB', function(){
    it('exists', function(){
      typeof expect(typeof host.startDb).to.equal('function');
    });
    it('starts the database server', function(done){
      proc.exec('mongod --shutdown', function(){
        host.startDb('mongo');
        setTimeout(function(){
          proc.exec('pgrep mongod', function(err, stdout, stderr){
            expect(stdout > 0).to.equal(true);
            proc.exec('mongod --shutdown');
            done();
          });
        }, 1000);
      });
    });
  });

  describe('startHost', function(){
    it('exists', function(){
      typeof expect(typeof host.startHost).to.equal('function');
    });
    it('starts the database server if it is not already running', function(done){
      this.timeout = 5000;
      proc.exec('mongod --shutdown', function(){
        host.startDb('mongo');
        setTimeout(function(){
          // proc.exec('pgrep mongod', function(){
          //   expect(stdout > 0).to.equal(true);
          //   proc.exec('mongod --shutdown');
          //   done();
          // });
          done();
        }, 1000);
      });
    });

  });
  
  it('starts the web application', function(done){
    done();
  });
  
});