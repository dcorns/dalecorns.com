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
var express = require("express");
var corngoose = require("corngoose");
var app = express();
var server_port = process.env.HTTP_PORT || 8080;
var server;
//Serve static assets from public
var webRoot = process.argv[2] || '/public';
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
server = app.listen(server_port, '127.0.0.1', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening on ' + host + ', port: ' + port);
});
//Add this line for testing with superTest
module.exports = server;
//# sourceMappingURL=server.js.map