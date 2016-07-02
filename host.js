/**
 * host
 * Created by dcorns on 6/27/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
var db = require('./dbRunner');
var proc = require('child_process');
var host = {};
host.startHost = function startHost(){
  db.checkForRunningDb('mongo', function(err, data){
    if(err){
      db.startDb('mongo');
    }
  });
  proc.fork('server');
};
module.exports = host;
host.startHost();