/**
 * server
 * Created by dcorns on 6/7/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
let express = require('express');
let firebase = require('firebase');
let corngoose = require('corngoose');
//for using local data base
//var mongoClient = require('mongodb').MongoClient;
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

//for using local data base
// let mongoUri, procE =process.env, dbName = 'drc';
// if(procE.OPENSHIFT_MONGODB_DB_PASSWORD){
//   mongoUri = 'mongodb://' + procE.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
//     procE.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//     procE.OPENSHIFT_MONGODB_DB_HOST + ':' +
//     procE.OPENSHIFT_MONGODB_DB_PORT + '/' + dbName;
// }
// mongoUri = 'mongodb://' + procE.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
//   procE.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//   procE.OPENSHIFT_MONGODB_DB_URL + '/' + dbName;
// console.dir(mongoUri);
// mongoClient.connect(mongoUri, function(err, db){
//   if(err) {
//     console.dir(err);
//   }
//   console.dir(db);
//  });

//To use firebase
// const privateKey = process.env.FIREBASE_KEY1 + process.env.FIREBASE_KEY2 + process.env.FIREBASE_KEY3 + process.env.FIREBASE_KEY4;
// let appDb = firebase.initializeApp({
//   serviceAccount:{
//     projectID: process.env.FIREBASE_PROJECT_ID,
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//     privateKey: privateKey
//   },
//   databaseURL: process.env.FIREBASE_DB
// });

app.get('/', function (req, res) {
  res.send('<h1>Hello!</h1>');
});

let server = app.listen(server_port, server_ip_address, function(){
  let host = server.address().address;
  let port = server.address().port;
  console.log('Server listening on ' + host + ', port: ' + port);
});