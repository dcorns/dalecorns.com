/**
 * host
 * Created by dcorns on 6/23/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
let proc = require('child_process');
let dbRunner = {};

dbRunner.startDb = function startDb(dbType){
  switch (dbType){
    case 'mongo':
      this.checkForRunningDb('mongo', function(err, data){
        if(err){
          proc.exec('mongod');
        }
      });
      break;
    default:
      break;
  }
};

dbRunner.checkForRunningDb = function checkForRunningDb(dbType, cb){
  switch (dbType){
    case 'mongo':
      //Spawns a shell then executes the command within that shell, buffering any generated output.
      proc.exec('pgrep mongod', function(err, stdout){
         if(stdout){
           cb(null, stdout);
         }
         else{
           cb(err, null);
         }
      });
      break;
    default:
      break;
  }
};

module.exports = dbRunner;