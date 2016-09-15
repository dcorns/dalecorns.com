/**
 * server
 * Created by dcorns on 6/7/16
 * Copyright © 2016 Dale Corns
 */
/// <reference path="all.d.ts" />
'use strict';
// declare function require(name: string);
// declare var process: any;
// declare var __dirname: string;
// declare var module: any;
import * as express from "express";
let corngoose = require ("corngoose");
let app = express();
let server_port = process.env.HTTP_PORT || 8080;
let server;
//Serve static assets from public
const webRoot = process.argv[2] || '/public';
console.log('__dirname:', __dirname);
console.log('webRoot:', webRoot);
app.use(express.static(__dirname + webRoot));

app.get('/', function (req, res) {
  res.setHeader('Content-Security-Policy', "script-src 'self';" +
    "style-src 'self'");
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.sendFile('index.html');
  res.end();
});

require('./api/routes')(app);

//if db server had to be started by host, this gives it some time before trying to connect
//setTimeout(function(){corngoose.startDB('drc');}, 1000);


server = app.listen(server_port, '127.0.0.1', function(){
  let host = server.address().address;
  let port = server.address().port;
  console.log('Server listening on ' + host + ', port: ' + port);
});

//Add this line for testing with superTest
module.exports = server;