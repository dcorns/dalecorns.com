/**
 * server
 * Created by dcorns on 6/7/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
let express = require('express');
let corngoose = require('corngoose');
let app = express();
let server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
let server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
let server;
//Serve static assets from public
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.setHeader('Content-Security-Policy', "script-src 'self';" +
    "style-src 'self'");
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.sendFile('index.html');
  res.end();
});

try{
  corngoose.startDB('drc');
}
catch(e){
  console.log('Data base not found');
//throw new Error('Running database required, database failed to start');
}


server = app.listen(server_port, server_ip_address, function(){
  let host = server.address().address;
  let port = server.address().port;
  console.log('Server listening on ' + host + ', port: ' + port);
});


//Add this line for testing with superTest
module.exports = server;