/**
 * host
 * Created by dcorns on 6/27/16
 * Copyright © 2016 Dale Corns
 * Insure that a mongo database server is running and start the www server
 */
'use strict';
var db = require('./dbRunner');
var proc = require('child_process');
var host = {};
host.startHost = function startHost(){
  db.startDb('mongo');
  proc.fork('server');
};
module.exports = host;
host.startHost();