/**
 * host
 * Created by dcorns on 6/23/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
let proc = require('child_process');
let host = {};

host.startDb = function startDb(dbType){
  switch (dbType){
    case 'mongo':
      proc.exec('mongod');
      break;
    default:
      break;
  }
};

host.checkForRunningDb = function checkForRunningDb(dbType, cb){
  switch (dbType){
    case 'mongo':
      //Spawns a shell then executes the command within that shell, buffering any generated output.
      proc.exec('pgrep mongod', function(err, stdout, stderr){
        console.log(err, stdout, stderr);
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

module.exports = host;