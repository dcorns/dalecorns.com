/**
 * host
 * Created by dcorns on 6/27/16
 * Copyright © 2016 Dale Corns
 * Start the mongo database server the www server
 */
'use strict';
var startDb = require('./dbRunner');
var proc = require('child_process');

startDb('mongo', function(err, data){
  if(err){
    throw new Error('It appears that no mongo database is installed');
  }
  console.log('MongoDB running in', data);
  proc.fork('server');
});