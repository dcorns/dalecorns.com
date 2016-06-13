/**
 * server
 * Created by dcorns on 6/7/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
let express = require('express');
let firebase = require('firebase');
let app = express();
let server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
let server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var privateKey = process.env.FIREBASE_KEY + process.env.FIREBASE_KEY2 + process.env.FIREBASE_KEY3 + process.env.FIREBASE_KEY4;
firebase.initializeApp({
  serviceAccount:{
    projectID: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey
  },
  databaseURL: process.env.FIREBASE_DB
});


app.get('/', function (req, res) {
  res.send('<h1>Hello!</h1>');
});

let server = app.listen(server_port, server_ip_address, function(){
  let host = server.address().address;
  let port = server.address().port;
  console.log('Server listening on ' + host + ', port: ' + port);
});