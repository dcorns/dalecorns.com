/**
 * host
 * Created by dcorns on 6/27/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
var db = require('./dbRunner');
//var server = require('./server');
var proc = require('child_process');

db.checkForRunningDb('mongo', function(err, data){
  if(err){
    db.startDb('mongo');
  }
  console.log('database running');
  proc.fork('server');
});