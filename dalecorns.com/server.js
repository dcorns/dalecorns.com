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
const express = require("express");
let corngoose = require("corngoose");
let app = express();
let server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
let server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
let server;
let path = require('path');
//Serve static assets from public
const webRoot = process.argv[2] || '/public';
app.use(express.static(path.join(__dirname, webRoot)));
app.get('/', function (req, res) {
    console.log('get request');
    res.setHeader('Content-Security-Policy', "script-src 'self';" +
        "style-src 'self'");
    res.status(200);
    res.header('Content-Type', 'text/html');
    res.sendFile('index.html');
    res.end();
});
require('./api/routes')(app);
//if db server had to be started by host, this gives it some time before trying to connect
setTimeout(function () { corngoose.startDB('drc'); }, 1000);
server = app.listen(server_port, server_ip_address, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Server listening on ' + host + ', port: ' + port);
});
//Add this line for testing with superTest
module.exports = server;
//# sourceMappingURL=server.js.map