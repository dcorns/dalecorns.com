/**
 * host
 * Created by dcorns on 6/23/16
 * Copyright © 2016 Dale Corns
 * Checks for instance of database on OS and if not found starts it. Only supports mongo
 * Allowing for unhandled exception if the database server is not installed on the OS
 */
'use strict';
let proc = require('child_process');
let dbRunner = {};

dbRunner.startDb = function startDb(dbType, cb){
  var dbProc;
  switch (dbType){
    case 'mongo':
        checkForRunningDb('mongo', function(err, data){
          if(err){
            dbProc = proc.exec('mongod');
            cb(null, dbProc.pid + ' (started by host)');
          }
          else{
            cb(null, data);
          }
        });
      break;
    default:
      break;
  }
};

function checkForRunningDb(dbType, cb){
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
}

module.exports = dbRunner.startDb;