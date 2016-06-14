/**
 * server
 * Created by dcorns on 6/7/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
//comment to force push
let express = require('express');
let firebase = require('firebase');
let corngoose = require('corngoose');
let app = express();
let server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
let server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
corngoose.startDB('drc');
setTimeout(function(){
  corngoose.getCollection('users', function(err, data){
    if(err) console.dir(err);
    console.dir(data);
  });
  corngoose.showDbPath();
}, 1000);



app.get('/', function (req, res) {
  res.send('<h1>Hello!</h1>');
});

let server = app.listen(server_port, server_ip_address, function(){
  let host = server.address().address;
  let port = server.address().port;
  console.log('Server listening on ' + host + ', port: ' + port);
});